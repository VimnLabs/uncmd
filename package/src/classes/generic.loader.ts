//.,,,,,...........,,,,,..,,,,,....,,,,,.............,,,,....,,,,,.........,,,,,..//
//.,S@@@+.........,S@@@?..+@@@@:...*@@@#:...........?@@@*....+@@@#+........;%%%*..//
//..;@@@@:........%@@@#,..+@@@@;...*@@@@S,.........+@@@%.....+@@@@@?,......+%%%?..//
//...*@@@S,......+@@@@;...+@@@@:...*@@@@@S,.......;@@@S,.....+@@@@@@S:.....+%%%?..//
//...,S@@@*.....:@@@@?....+@@@@:...*@@@@@@%,.....:@@@#,......+@@@@@@@#;....+%%%?..//
//....:@@@@;...,S@@@#,....+@@@@:...*@@@#@@@?....,#@@@:..+,...+@@@%;#@@@*...+S%%?..//
//.....*@@@#,..*@@@@:.....+@@@@:...*@@@?+@@@?..,S@@@;..+#,...+@@@%.:S@@@%,.,*%%?..//
//......%@@@?..;@@@*......+@@@@:...*@@@?.?@@@*.?@@@*..;@#,...+@@@%..,?@@@S:..;%?..//
//......,#@@@+..*@S.......+@@@@:...*@@@?..?@@@%@@@?..:#@#,...+@@@%....+@@@@+..:*..//
//.......+@@@#,.,%:.......+@@@@:...*@@@?...%@@@@@%,.,S@@#,...+@@@%.....;#@@@*..,..//
//........?@@@%...........+@@@@;...*@@@?...,%###S,..,@@@#,...+@@@%......,%@@@%,...//
//........,S###+..........+####:...*@@@?............,###S,...+###?........*@@@S:..//
//.........,,,,,..........,,,,,....,,,,,.............,,,,....,,,,,.........,,,,,..//

/*
- Guarda un registro para ver los cambios y no resubir los que estan igual
*/

import { existsSync, lstatSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Snowflake } from 'discord-api-types/globals';
import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v10/interactions';
import { Routes } from 'discord-api-types/v10';
import { Log } from '../log';
import type { CommandOptions } from '../types';
import type { Command } from './abstract.command';
import { Dictionary } from './dictionary';

/** Options for the loader */
export interface LoaderOptions {
	/** Set the absolute path for your commands, for example: `src/commands`. */
	path: string;
	/** File extensions to load */
	extensions: string[];
	/** The necessary bot information for the commands to be uploaded */
	bot: {
		token: string;
		id: string;
	};
}

export const v10 = 'https://discord.com/api/v10';

const filter = /^(ig\.|ignore\.)/;

export class Loader<C extends Command<CommandOptions>> {
	/** Dictionary to store commands */
	public readonly cache: Dictionary<string, C>;
	/** File extensions to load */
	public readonly extensions: RegExp;
	/** The necessary bot information for the commands to be uploaded */
	public readonly bot: {
		token: string;
		id: string;
	};

	/** Create a new instance to load the commands. */
	constructor(
		/** Options for the loader */
		public options: LoaderOptions
	) {
		this.cache = new Dictionary();
		this.extensions = new RegExp(`(${options.extensions.join('|')})$`, 'i');
		this.bot = options.bot;
	}

	/**
	 * This is the base function, you should not use this function.
	 */
	private _load(
		path: string,
		// biome-ignore lint/suspicious/noExplicitAny:
		registerCallback: (command: C, dict: typeof this.cache) => any
	) {
		const root = join(process.cwd(), path);
		if (!existsSync(root)) mkdirSync(root);
		for (const route of readdirSync(root)) {
			if (filter.test(route)) continue;
			const module = join(root, route);

			if (lstatSync(module).isDirectory()) {
				this._load(join(path, route), registerCallback);
				continue;
			}
			if (!this.extensions.test(module)) continue;
			delete require.cache[require(module)];
			const loaded: C = require(module)?.default;
			if (!loaded.data) continue;
			this.cache.set(loaded.data.name, loaded);
			registerCallback(loaded, this.cache);
		}
	}

	/**
	 * It loads and register absolutely all commands in the specified folder, it is recursive, i.e. it enters into folders
	 */
	public load(
		// biome-ignore lint/suspicious/noExplicitAny:
		registerCallback: (command: C, dict: typeof this.cache) => any,
		// biome-ignore lint/suspicious/noExplicitAny:
		endCallback: (dict: typeof this.cache) => any
	) {
		try {
			this._load(this.options.path, registerCallback);

			endCallback(this.cache);
		} catch (error) {
			Log.panic((error as Error).name, (error as Error).message);
			throw error;
		}
	}

	public upload(
		callback: (
			global?: RESTPostAPIApplicationCommandsJSONBody[],
			guild?: Record<Snowflake, RESTPostAPIApplicationCommandsJSONBody[]>
		) => unknown
	) {
		const commands = Array.from(this.cache.values());
		const globalCommands = commands
			.filter((c) => (c.guilds || []).length === 0)
			.map((c) => c.toJSON());
		const guildCommands: Record<
			Snowflake,
			RESTPostAPIApplicationCommandsJSONBody[]
		> = {};
		for (const { command, guilds } of Array.from(
			commands
				.filter((c) => Array.isArray(c.guilds) && c.guilds.length > 0)
				.map((c) => ({ command: c.toJSON(), guilds: c.guilds }))
		)) {
			for (const guild of guilds!) {
				const gCommands = guildCommands[guild] ?? [];
				gCommands.push(command);
				guildCommands[guild] = gCommands;
			}
		}

		if (globalCommands.length) {
			fetch(`${v10}${Routes.applicationCommands(this.bot.id)}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${this.bot.token}`
				},
				body: JSON.stringify(globalCommands)
			}).catch((error: Error) => {
				Log.panic(error.name, error.message);
				throw error;
			});
		}

		if (Object.keys(guildCommands)[0])
			for (const [id, commands] of Object.entries(guildCommands)) {
				fetch(`${v10}${Routes.applicationGuildCommands(this.bot.id, id)}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bot ${this.bot.token}`
					},
					body: JSON.stringify(commands)
				}).catch((error: Error) => {
					Log.panic(error.name, error.message);
					throw error;
				});
			}

		callback(globalCommands, guildCommands);
	}
}
