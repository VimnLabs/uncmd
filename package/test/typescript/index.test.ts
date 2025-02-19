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

// import { Command, type CommandOptions, Loader } from '../../src/';

// export class MyCommand<
// 	Options extends CommandOptions & { code: () => unknown }
// > extends Command<Options> {
// 	code: () => unknown;
// 	constructor(options: Options) {
// 		super(options);
// 		this.code = options.code;
// 	}
// }

// const loader = new Loader({
// 	extensions: ['ts'],
// 	path: './commands',
// 	bot: {
// 		// biome-ignore lint/complexity/useLiteralKeys:
// 		id: process.env['BOT_ID']!,
// 		// biome-ignore lint/complexity/useLiteralKeys:
// 		token: process.env['BOT_TOKEN']!
// 	}
// });

// loader.load(
// 	(c) => {
// 		console.log('I read the command: ', c.data.name);
// 	},
// 	(dict) => {
// 		console.log('Finish recording all commands! Count: ', dict.size);
// 	}
// );

// loader.upload((global, guild) => {
// 	console.log('Global command count: ', global?.length);
// 	for (const [id, commands] of Object.entries(guild!)) {
// 		console.log(`"${id}"'s command count: `, commands.length);
// 	}
// });

// const regex = /<:([A-Za-z0-9_]+):(\d+)>/g;
// const replacement = `<img src="/ruta/a/$2.png" alt=":$1:" />`;

// const input = '<:MeruTheSuccubusConfusedShrug:1266565213214474251>';
// const output = input.replace(
// 	/<:([A-Za-z0-9_]+):(\d+)>/g,
// 	(_, name: string, id: string) =>
// 		`<img src="https://cdn.discordapp.com/emojis/${id}.${name.startsWith('a_') ? 'gif' : 'webp'}" alt=":${name}:" />`
// );

// const input = '<t:1593026947:>';
// const months = [
// 	'January',
// 	'February',
// 	'March',
// 	'April',
// 	'May',
// 	'June',
// 	'July',
// 	'August',
// 	'September',
// 	'October',
// 	'November',
// 	'December'
// ];
// const days = [
// 	'Sunday',
// 	'Monday',
// 	'Tuesday',
// 	'Wednesday',
// 	'Thursday',
// 	'Friday',
// 	'Saturday'
// ];
// const output = input.replaceAll(
// 	/<t:([0-9]+)(:[A-Za-z]|:)?>/g,
// 	(
// 		_,
// 		timestamp: string,
// 		style: ':t' | ':T' | ':d' | ':D' | ':f' | ':F' | ':R' | string
// 	) => {
// 		const date = new Date(Number(timestamp) * 1000);
// 		switch (style) {
// 			case ':t':
// 				return `${date.getHours()}:${date.getMinutes()}`;
// 			case ':T':
// 				return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// 			case ':d':
// 				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// 			case ':D':
// 				return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
// 			case ':F':
// 				return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
// 			case ':R': {
// 				const now = new Date();

// 				const diff = date.valueOf() - now.valueOf();

// 				const unities = {
// 					year: 1000 * 60 * 60 * 24 * 365,
// 					month: 1000 * 60 * 60 * 24 * 30,
// 					day: 1000 * 60 * 60 * 24,
// 					hour: 1000 * 60 * 60,
// 					minute: 1000 * 60,
// 					second: 1000
// 				};

// 				let units: Intl.RelativeTimeFormatUnit;
// 				let value: number;
// 				const diffAbs = Math.abs(diff);

// 				if (diffAbs >= unities.year) {
// 					units = 'year';
// 					value = diff / unities.year;
// 				} else if (diffAbs >= unities.month) {
// 					units = 'month';
// 					value = diff / unities.month;
// 				} else if (diffAbs >= unities.day) {
// 					units = 'day';
// 					value = diff / unities.day;
// 				} else if (diffAbs >= unities.hour) {
// 					units = 'hour';
// 					value = diff / unities.hour;
// 				} else if (diffAbs >= unities.minute) {
// 					units = 'minute';
// 					value = diff / unities.minute;
// 				} else {
// 					units = 'second';
// 					value = diff / unities.second;
// 				}

// 				const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
// 				return rtf.format(Math.round(value), units);
// 			}
// 			default:
// 				return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
// 		}
// 	}
// );
// console.log(output);
