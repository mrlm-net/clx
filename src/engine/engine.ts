import yargs from "yargs";

import { hideBin } from "yargs/helpers";

import { Command } from "./command";
import { EngineSettings } from "./settings";



export class Engine {
    private _args: yargs.Argv = yargs(
        hideBin(process.argv)
    );

    private _commands: Command[] = [];

    private _settings: EngineSettings = {};

    constructor() {
        console.log('Engine created', this._settings);



        console.log(this._args.argv);
    }

    private _loadSettings() {
        
    }
}

export default Engine;