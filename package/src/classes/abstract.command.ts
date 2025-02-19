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

import {
	ApplicationCommandType,
	ApplicationIntegrationType,
	InteractionContextType,
	type RESTPostAPIApplicationCommandsJSONBody,
	type Snowflake
} from 'discord-api-types/v10';
import type { CommandOptions } from '../types';

/**
 * Represents an abstract class of a command.
 *
 * This is intended to be extended with other things including the function to execute the command, i.e. `code(...)`, `exec(...)`, etc.
 */
export abstract class Command<Options extends CommandOptions> {
	/**
	 * Data to upload the command, like the name, the description and the localized names and descriptions
	 */
	data: Options['data'];
	/**
	 * Options to upload commands, this must be a fix and is only available for chat commands.
	 *
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
	 */
	options?: Options['options'];
	/**
	 * Type of command, defaults to `1`
	 *
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
	 */
	type: Options['type'];
	/**
	 * Indicates whether the command is age-restricted, defaults to `false`
	 */
	nsfw?: Options['nsfw'];
	/**
	 * Sets whether the command is to be uploaded only to one or several guilds by its id
	 */
	guilds?: Snowflake[];
	/**
	 * Installation context(s) where the command is available, only for globally-scoped commands. Defaults to `GUILD_INSTALL ([0])`
	 */
	integration_types?: Options['integration_types'];
	/**
	 * Interaction context(s) where the command can be used, only for globally-scoped commands. By default, all interaction context types included for new commands `[0,1,2]`.
	 */
	contexts?: Options['contexts'];
	constructor(options: Options) {
		this.type = options.type || ApplicationCommandType.ChatInput;
		this.data = options.data;
		this.options = options.options;
		this.nsfw = options.nsfw;
		this.guilds = options.guilds;
		this.integration_types = options.integration_types;
		this.contexts = options.contexts;
	}

	/**
	 * Convert the class so that it is suitable for uploading to the api.
	 *
	 * Preferably, do not modify this function
	 * @returns JSON to be uploaded to the api
	 */
	public toJSON(): RESTPostAPIApplicationCommandsJSONBody {
		return {
			...this.data,
			options: this.options ?? [],
			type: this.type || 1,
			nsfw: this.nsfw ?? false,
			integration_types: this.integration_types ?? [
				ApplicationIntegrationType.GuildInstall
			],
			contexts: this.contexts ?? [
				InteractionContextType.BotDM,
				InteractionContextType.Guild,
				InteractionContextType.PrivateChannel
			]
		};
	}

	//-------------------------//
	//------ TYPE GUARDS ------//
	//-------------------------//

	/**
	 * Checks if it is a text-based command that shows up when a user types `/`.
	 */
	public isChatInput(): this is Command<
		Omit<Options, 'type'> & { type: ApplicationCommandType.ChatInput }
	> {
		return this.type === ApplicationCommandType.ChatInput;
	}

	/**
	 * Checks if it is a UI-based command that shows up when you right click or tap on a message.
	 */
	public isMessage(): this is Command<
		Omit<Options, 'type'> & { type: ApplicationCommandType.Message }
	> {
		return this.type === ApplicationCommandType.Message;
	}

	/**
	 * Checks if it is a UI-based command that represents the primary way to invoke an app's Activity.
	 */
	public isPrimaryEntryPoint(): this is Command<
		Omit<Options, 'type'> & { type: ApplicationCommandType.PrimaryEntryPoint }
	> {
		return this.type === ApplicationCommandType.PrimaryEntryPoint;
	}

	/**
	 * Checks if it is a UI-based command that shows up when you right click or tap on a user.
	 */
	public isUser(): this is Command<
		Omit<Options, 'type'> & { type: ApplicationCommandType.User }
	> {
		return this.type === ApplicationCommandType.User;
	}
}
