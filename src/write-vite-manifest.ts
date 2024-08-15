import fs from 'node:fs/promises'
import { resolveViteManifest, ViteManifest, ViteManifestFlat } from './resolve-vite-manifest.js'
import { viteFlatManifestTags } from './vite-manifest-tags.js'

/**
 * Reads vite `manifest.json` from file, flats it, and
 * writes result to file, returns {@link ViteManifestFlat}.
 */
export async function writeFlatViteManifest({
    sourcePath: sourcePath, 
    targetPath: targetPath,
}: {
    /**
     * Path to vite `manifest.json`.
     */
    sourcePath: string,
    /**
     * Path where to write flattened manifest, e.g. `manifest.flat.json`.
     * If `undefined` flattened manifest will not be written.
     */
    targetPath?: string,
    }
): Promise<ViteManifestFlat> {
    const manifestText = await fs.readFile(sourcePath, {encoding: 'utf8'})

    const manifest = JSON.parse(manifestText) as ViteManifest
    const flatManifest = resolveViteManifest(manifest)
    const flatManifestJson = JSON.stringify(flatManifest, undefined, 4)

    if(targetPath) {
        await fs.writeFile(
            targetPath, 
            flatManifestJson, 
            {encoding: 'utf8'}
        )
    }

    return flatManifest
}



/**
 * Reads vite flatted manifest from file, tags it, and
 * writes result to file. Returns result in string.
 */
export async function writeTaggedViteManifest({
    sourcePath: sourcePath, 
    targetPath: targetPath,
}: {
    /**
     * Path to flattened vite manifest, e.g. `manifest.flat.json`.
     */
    sourcePath: string,
    /**
     * Path where wirite tagged manifest, e.g. `manifest.tag.text`.
     * If `undefined` tagged manifest will not be written.
     */
    targetPath?: string,
    }
): Promise<string> {
    const manifestText = await fs.readFile(sourcePath, {encoding: 'utf8'})
    const flatManifest = JSON.parse(manifestText) as ViteManifestFlat

    const flatManifestTags = viteFlatManifestTags(flatManifest)
    if(targetPath) {
        await fs.writeFile(
            targetPath, 
            flatManifestTags, 
            {encoding: 'utf8'}
        )
    }

    return flatManifestTags
}



