import {depth} from 'treeverse'


/**
 * Set of all JS files deployed by Vite project having
 * interdependencies informations.
 */
export type ViteManifest = {
    [key in string]: ViteManifestEntry
}

/**
 * JS file entry in Vite manifest file.
 */
export type ViteManifestEntry = {
    /**
     * Is this entry an entry point statically imported?
     */
    isEntry?: 'true'
    /**
     * Is this entry an entry point dynamically imported?
     */
    isDynamicEntry?: 'true'
    /**
     * Entry file path.
     */
    file: string,
    /**
     * Name of entry
     */
    name: string,
    /**
     * Path to source file of entry if entry corresponds directly
     * with some source file.
     */
    src?: string,
    /**
     * JS file paths that will be imported by this entry.
     */
    imports?: string[],
    /**
     * JS files paths that may be imported dynamically by this entry.
     */
    dynamicImports?: string[],
    /**
     * List of css files names that entry depends on.
     * CSS files don't have entries in {@link ViteManifest}.
     */
    css?: string[],
}

/**
 * Vite manifest JS entry all dependencies.
 */
export type ViteManifestFlatEntry = {
    preloads: string[],
    entry: string,
    csses: string[],
}

/**
 * Vite manifest JS entries all dependencies.
 */
export type ViteManifestFlat = {
    [key in string]: ViteManifestFlatEntry
}


/**
 * Resolves Vite manifest entry interdependencies.
 */
export function resolveViteManifestEntry(
    manifest: ViteManifest,
    entryPath: string,
): ViteManifestFlatEntry {

    const manifestEntry = manifest[entryPath]
    if(!manifestEntry) {
        throw ''
    }

    const csses: string[] = []

    depth({
        tree: manifestEntry,
        visit: (node) => {
            csses.push(...(node.css ?? []))
            return node
        },
        getChildren: (node) => {
            const imports = node.imports?.map((key) => {
                const entry = manifest[key]
                if(!entry) {
                    throw ''
                }
                return entry
            }) ?? []
            const dynamicImports = node.dynamicImports?.map((key) => {
                const entry = manifest[key]
                if(!entry) {
                    throw ''
                }
                return entry
            }) ?? []

            return [...imports, ...dynamicImports]
        },
        
    })

    return {
        preloads: [...new Set(manifestEntry.imports?.map((importEntry) => {
            const fileName = manifest[importEntry]?.file
            if(!fileName) {
                throw ''
            }
            return fileName
        }) ?? [])],
        entry: manifestEntry.file,
        csses: [...new Set(csses)]
    }
}


/**
 * Resolves vite manifest entries interdependencies.
 */
export function resolveViteManifest(
    manifest: ViteManifest
): ViteManifestFlat {
    const flatManifest: ViteManifestFlat = {}
    for (const [key, {isEntry}] of Object.entries(manifest)) {
        if(isEntry) {
            flatManifest[key] = resolveViteManifestEntry(manifest, key)
        }
    }
    return flatManifest
}

