
import * as path from 'path';
import * as fs from 'fs';
import {NpmProject} from '@woodpecker/core';

import {AdapterInfo} from './AdapterInfo';


export class AdapterLoader {

	// TODO: Añadir metodo para importar modulo

	// TODO: Añadir metodo para resolver un modulo (devuelve el path)

	// TODO: Añadir metodo para buscar metodos segun una expresion regular (devuelve los paths)

	public getAll(): AdapterInfo[] {

		return undefined;

	}

	public resolveModulesPaths(): Promise<string[]> {

		return Promise.all(this.prepareModulesPaths().map(p => {
			return this.existsDir(p).then(exists => exists && p);
		})).then(paths => paths.filter(p => p));

	}

	private existsDir(path: string): Promise<boolean> {

		return new Promise((resolve, reject) => {
			fs.stat(path, (err, stats) => {
				if(err || !stats.isDirectory()) {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});

	}

	private prepareModulesPaths(): string[] {

		let paths = [].concat(process.mainModule.paths);

		paths.push(this.prepareGlobalModulesPath());

		return paths;
	}

	private prepareGlobalModulesPath(): string {

		let bin = process.execPath || process.title;

		return path.resolve(path.join(path.dirname(bin), '..', 'lib', NpmProject.NODE_MODULES_DIR_NAME));
	}

}
