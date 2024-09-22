import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';

export function resolveFilePath(meta: any): string {
    return dirname(
        fileURLToPath(meta.url)
    );
}

export function resolveCWDPath(): string {
    return resolve(".");   
}

export function resolveFileFromCWDPath(path: string): {} {
    const fullPath = resolve(resolveCWDPath(), path);
    const extension = fullPath.split('.').pop();

    console.log('Resolving file from CWD', path, fullPath);   
    
    if (existsSync(fullPath)) {
        console.log('File exists', fullPath);
        return (extension?.toLowerCase() === "JSON") 
            ? readFileSync(fullPath, 'utf8')
            : JSON.parse(readFileSync(fullPath, 'utf8'));
    }
    
    return {};
}