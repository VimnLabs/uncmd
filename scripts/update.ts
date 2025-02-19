import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

try {
	const { join } = require('node:path');
	const dir = join(process.cwd(), 'dist');
	for (const file of readdirSync(dir)) {
		readFile(join(dir, file)).then(async (c) =>
			writeFileSync(
				join(dir, file),
				`${'//.,,,,,...........,,,,,..,,,,,....,,,,,.............,,,,....,,,,,.........,,,,,..//\n//.,S@@@+.........,S@@@?..+@@@@:...*@@@#:...........?@@@*....+@@@#+........;%%%*..//\n//..;@@@@:........%@@@#,..+@@@@;...*@@@@S,.........+@@@%.....+@@@@@?,......+%%%?..//\n//...*@@@S,......+@@@@;...+@@@@:...*@@@@@S,.......;@@@S,.....+@@@@@@S:.....+%%%?..//\n//...,S@@@*.....:@@@@?....+@@@@:...*@@@@@@%,.....:@@@#,......+@@@@@@@#;....+%%%?..//\n//....:@@@@;...,S@@@#,....+@@@@:...*@@@#@@@?....,#@@@:..+,...+@@@%;#@@@*...+S%%?..//\n//.....*@@@#,..*@@@@:.....+@@@@:...*@@@?+@@@?..,S@@@;..+#,...+@@@%.:S@@@%,.,*%%?..//\n//......%@@@?..;@@@*......+@@@@:...*@@@?.?@@@*.?@@@*..;@#,...+@@@%..,?@@@S:..;%?..//\n//......,#@@@+..*@S.......+@@@@:...*@@@?..?@@@%@@@?..:#@#,...+@@@%....+@@@@+..:*..//\n//.......+@@@#,.,%:.......+@@@@:...*@@@?...%@@@@@%,.,S@@#,...+@@@%.....;#@@@*..,..//\n//........?@@@%...........+@@@@;...*@@@?...,%###S,..,@@@#,...+@@@%......,%@@@%,...//\n//........,S###+..........+####:...*@@@?............,###S,...+###?........*@@@S:..//\n//.........,,,,,..........,,,,,....,,,,,.............,,,,....,,,,,.........,,,,,..//'}\n\n${c.toString()}`
			)
		);
	}

	const packagejson_dir = join(process.cwd(), 'package.json');
	const packagejson = JSON.parse(readFileSync(packagejson_dir).toString());

	const version = (packagejson.version as string).split('.').map(Number);

	console.log(process.env['KIND']);

	// biome-ignore lint/complexity/useLiteralKeys:
	switch (process.env['KIND'] ?? 'FIX') {
		case 'FIX':
			version.splice(2, 1, ++version[2]);
			break;
		case 'MINOR':
			version.splice(1, 1, ++version[1]);
			break;
		case 'MAJOR':
			version.splice(0, 1, ++version[0]);
			break;
	}

	packagejson.version = version.join('.');
	writeFileSync(packagejson_dir, JSON.stringify(packagejson, null, 1));
} catch (e) {}
