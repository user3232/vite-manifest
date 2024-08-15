import { ViteManifestFlat } from './resolve-vite-manifest.js';
/**
 * Reads vite `manifest.json` from file, flats it, and
 * writes result to file, returns {@link ViteManifestFlat}.
 */
export declare function writeFlatViteManifest({ sourcePath: sourcePath, targetPath: targetPath, }: {
    /**
     * Path to vite `manifest.json`.
     */
    sourcePath: string;
    /**
     * Path where to write flattened manifest, e.g. `manifest.flat.json`.
     * If `undefined` flattened manifest will not be written.
     */
    targetPath?: string;
}): Promise<ViteManifestFlat>;
/**
 * Reads vite flatted manifest from file, tags it, and
 * writes result to file. Returns result in string.
 */
export declare function writeTaggedViteManifest({ sourcePath: sourcePath, targetPath: targetPath, }: {
    /**
     * Path to flattened vite manifest, e.g. `manifest.flat.json`.
     */
    sourcePath: string;
    /**
     * Path where wirite tagged manifest, e.g. `manifest.tag.text`.
     * If `undefined` tagged manifest will not be written.
     */
    targetPath?: string;
}): Promise<string>;
