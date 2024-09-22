import yargs, { alias } from "yargs";

import pkg from "./../../package.json";

import { hideBin } from "yargs/helpers";

import { Command } from "./command";
import { EngineSettings } from "./settings";
//import { CLI } from "./cli";

import { 
    EngineSettings as DefaultSettings, 
    GlobalOptions
} from "./defaults";
import { resolveFileFromCWDPath } from "./filesystem";

export class Engine {

    private _args: yargs.Argv = yargs(
        hideBin(process.argv)
    );

    private _commands: Command[] = [];

    private _config: EngineSettings = {};

    private _logger: any;

    private _settings: EngineSettings = {};

    constructor(settings?: EngineSettings) {
        this._setup(settings);
        //console.log('Engine created', this._settings, this._args.argv);
        this._loadCommands();
        
    }

    public getPKGName(): string {
        return pkg.name;
    }

    public getArgument(key: string): any {
        return (this._args.argv as any)[key];
    }

    public getArguments(): any{
        return (this._args.argv as any)["_"];
    }

    public getScript(): any {
        return (this._args.argv as any)["$0"];
    }

    public getScriptName(): any {
        return this._settings.scriptName || (
            this.getPKGName().split("/")[1] || this.getPKGName().split("/")[0]
        ) || this.getScript();
    }

    public getOption(key: string): any  {
        return (this._args.argv as any)[key];
    }

    public getOptions(): any {
        return this._args.argv;
    }

    public getSetting(key: string): EngineSettings {
        return (this._settings as any)[key] as EngineSettings;
    }

    public getSettings(): EngineSettings {
        return this._settings;
    }

    private _setup(settings?: EngineSettings): void {
        // Initialize logger
        this._initLogger();
        // Initialize engine
        this._initializeEngine();
        // Load global options
        this._args.options(GlobalOptions);
        // Load default, instance settings and flags options
        this._settings = {
            ...DefaultSettings, 
            ...settings, 
            ...this._loadOptionsToSettings()
        }
        // Load config file
        this._loadConfigFile();
        // Merge config file with default, instance setting, config file and flags options
        this._settings = {
            ...DefaultSettings, 
            ...settings,
            ...this._config,
            ...this._loadOptionsToSettings()
        }

        // TESTING purposes only
        this._args
            .scriptName(this.getScriptName())
            .usage("Usage:\n\n  $0 <command> [options...]")
            .version("version", "Show version number", pkg.version || "0.1.0")
            .help("help", "Show help", false)
            .completion("completion", "Generate bash completion script");


        this._args.parse()
    }

    private _initLogger(): void {
        console.log('Initializing logger', this._settings);
    }

    private _loadConfigFile(): void {
        console.log('Loading config file', this._settings);
        this._config = resolveFileFromCWDPath("clx.config.json");
        console.log('Config file loaded', this._config);
    }

    private _loadOptionsToSettings(): EngineSettings {
        // Get copy of arguments
        const copy = {...this._args.argv} as any;
        // Delete script name and arguments
        (copy["_"]) ? delete copy["_"]: null;
        (copy["$0"]) ? delete copy["$0"]: null ;
        // Return fresh and cleaned copy of options as settings
        return copy;
    }

    private _initializeEngine() {
        // Turn off yargs default behavior
        this._args.help(false);
        this._args.version(false);
    }

    private _loadCommands(): void {}
}

export default Engine;