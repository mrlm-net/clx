import yargs from "yargs";

export interface Option extends yargs.Options {}

export interface GlobalOptions {
    [key: string]: Option;
}

export interface EngineSettings {
    module?: string[];
    options?: GlobalOptions;
    scriptName?: string;
    verbose?: boolean;
}