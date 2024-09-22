import { EngineSettings } from "./settings";

export interface CLI {
    constructor(settings: EngineSettings): void; // TBD
    registerCommand(): void; // TBD
    registerCommands(): void; // TBD
}