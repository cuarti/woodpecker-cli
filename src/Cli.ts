
import * as path from 'path';
import * as fs from 'fs';
import {NpmPackage} from '@woodpecker/core';

import {AdapterLoader} from './AdapterLoader';
import {NpmProject} from '@woodpecker/core/src/util/NpmProject';


// TODO: Update options list and exists to query (with or without argument)
// TODO: Add option to resolve adapter
export = class Cli {

	private npmPackage: NpmPackage;
	private loader: AdapterLoader;

	public constructor() {
		this.npmPackage = new NpmProject(path.dirname(__dirname)).getPackage();
		this.loader = new AdapterLoader();
	}

	public start(adapter: string, command: string, parameters: string[]): void {
		console.log('start', adapter, command, parameters);
	}

	public exists(adapter: string): void {
		console.log('exists', adapter);
	}

	public list(): void {
		console.log('list');
	}

	public paths(): void {
		this.loader.resolveModulesPaths().then(paths => {
			paths.forEach(p => console.log(p));
		});
	}

	public help(): void {
		fs.readFile(path.join(__dirname, 'help.txt'), 'utf8', (err, file) => console.log(file));
	}

	public version(): void {
		console.log(this.npmPackage.version());
	}

	public static run(): void {

		let cli = new Cli();
		let [command, ...parameters] = process.argv.splice(2);

		switch(command) {
			case '-e':
			case '--exists':
				cli.exists(parameters[0]);
				break;
			case '-l':
			case '--list':
				cli.list();
				break;
			case '-p':
			case '--paths':
				cli.paths();
				break;
			case '-h':
			case '--help':
				cli.help();
				break;
			case '-v':
			case '--version':
				cli.version();
				break;
			default:

				if(command.startsWith('-')) {
					console.error(`Invalid option: ${command}`);
					process.exit(1);
				}

				cli.start(command, parameters[0], parameters.splice(1));

		}

	}

}
