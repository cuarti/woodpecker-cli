
import {AdapterLoader} from '../src/AdapterLoader';


let loader = new AdapterLoader();

loader.resolveModulesPaths().then(paths => console.log(paths));
// console.log(moduleLoader.resolveGlobalModulesPath());


// NVM_PATH
// NODE_PATH
// APPDATA
