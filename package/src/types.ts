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

import type {
	APIApplicationCommand,
	ApplicationCommandType,
	Snowflake
} from 'discord-api-types/v10';

/**
 * Data to upload the command
 */
export interface CommandData
	extends Pick<
		APIApplicationCommand,
		'name' | 'description' | 'name_localizations' | 'description_localizations'
	> {}

/**
 * Represents the options for creating a command
 */
export interface CommandOptions {
	/**
	 * Data to upload the command
	 */
	data: CommandData;
	/**
	 * Options to upload commands, this must be a fix and is only available for chat commands.
	 *
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
	 */
	options?: Pick<APIApplicationCommand, 'options'>['options'];
	/**
	 * Type of command, defaults to `1`
	 *
	 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
	 */
	type?: ApplicationCommandType;
	/**
	 * Indicates whether the command is age-restricted, defaults to `false`
	 */
	nsfw?: Pick<APIApplicationCommand, 'nsfw'>['nsfw'];
	/**
	 * Sets whether the command is to be uploaded only to one or several guilds by its id
	 */
	guilds?: Snowflake[];
	/**
	 * Installation context(s) where the command is available, only for globally-scoped commands. Defaults to `GUILD_INSTALL ([0])`
	 */
	integration_types?: Pick<
		APIApplicationCommand,
		'integration_types'
	>['integration_types'];
	/**
	 * Interaction context(s) where the command can be used, only for globally-scoped commands. By default, all interaction context types included for new commands `[0,1,2]`.
	 */
	contexts?: Pick<APIApplicationCommand, 'contexts'>['contexts'];
}
