/**
 * Set of all JS files deployed by Vite project having
 * interdependencies informations.
 */
export type ViteManifest = {
    [key in string]: ViteManifestEntry;
};
/**
 * JS file entry in Vite manifest file.
 */
export type ViteManifestEntry = {
    /**
     * Is this entry an entry point statically imported?
     */
    isEntry?: 'true';
    /**
     * Is this entry an entry point dynamically imported?
     */
    isDynamicEntry?: 'true';
    /**
     * Entry file path.
     */
    file: string;
    /**
     * Name of entry
     */
    name: string;
    /**
     * Path to source file of entry if entry corresponds directly
     * with some source file.
     */
    src?: string;
    /**
     * JS file paths that will be imported by this entry.
     */
    imports?: string[];
    /**
     * JS files paths that may be imported dynamically by this entry.
     */
    dynamicImports?: string[];
    /**
     * List of css files names that entry depends on.
     * CSS files don't have entries in {@link ViteManifest}.
     */
    css?: string[];
};
/**
 * Vite manifest JS entry all dependencies.
 */
export type ViteManifestFlatEntry = {
    preloads: string[];
    entry: string;
    csses: string[];
};
/**
 * Vite manifest JS entries all dependencies.
 */
export type ViteManifestFlat = {
    [key in string]: ViteManifestFlatEntry;
};
/**
 * Resolves Vite manifest entry interdependencies.
 */
export declare function resolveViteManifestEntry(manifest: ViteManifest, entryPath: string): ViteManifestFlatEntry;
/**
 * Resolves vite manifest entries interdependencies.
 */
export declare function resolveViteManifest(manifest: ViteManifest): ViteManifestFlat;
