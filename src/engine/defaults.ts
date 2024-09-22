import { EngineSettings as Settings, GlobalOptions as Options } from './settings';

export const GlobalOptions: Options = {
    module: {
        alias: 'm',
        default: [],
        description: 'Command modules to be loaded.',
        type: 'array'
    },
    verbose: {
        alias: 'v',
        default: false,
        description: 'Display verbose logging messages.',
        type: 'boolean',
        nargs: 0
    }
}

export const EngineSettings: Settings = {
    module: [],
    verbose: false,
}