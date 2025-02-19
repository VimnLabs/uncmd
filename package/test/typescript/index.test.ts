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

import { Command, type CommandOptions, Loader } from '../../src/';

export interface MyOptions extends CommandOptions {
	code: () => unknown;
}

export class MyCommand<Options extends MyOptions> extends Command<Options> {
	code: () => unknown;
	constructor(options: Options) {
		super(options);
		this.code = options.code;
	}
}

const loader = new Loader({
	extensions: ['ts'],
	path: './commands',
	bot: {
		// biome-ignore lint/complexity/useLiteralKeys:
		id: process.env['BOT_ID']!,
		// biome-ignore lint/complexity/useLiteralKeys:
		token: process.env['BOT_TOKEN']!
	}
});

loader.load(
	(c) => {
		console.log('I read the command: ', c.data.name);
	},
	(dict) => {
		console.log('Finish recording all commands! Count: ', dict.size);
	}
);

loader.upload((global, guild) => {
	console.log('Global command count: ', global?.length);
	for (const [id, commands] of Object.entries(guild!)) {
		console.log(`"${id}"'s command count: `, commands.length);
	}
});
