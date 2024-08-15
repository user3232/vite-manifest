import { ViteManifestFlat, ViteManifestFlatEntry } from './resolve-vite-manifest.js'


/**
 * Transforms resolved vite manifest to textual 
 * information containing html imports by script
 * and link tags. Easy to copy-paste.
 */
export function viteFlatManifestTags(
    flatManifest: ViteManifestFlat,
): string {
    let string = ''
    for (const [key, entry] of Object.entries(flatManifest)) {
        string += `"${key}":\n`
        string +=  viteFlatManifestEntryToTags(entry, 4)
    }
    return string
}


/**
 * Transforms resolved vite manifest entry to
 * set of html import tags (stylesheets, script modules, 
 * script modules preloads).
 */
export function viteFlatManifestEntryToTags(
    flatManifestEntry: ViteManifestFlatEntry,
    indent?: number
): string {
    indent ??= 0
    const indentString = ' '.repeat(indent)

    let string = indentString + '<!-- styles -->\n'
    for (const css of flatManifestEntry.csses) {
        string += indentString + `<link rel="stylesheet" href="${css}" />\n`
    }

    string += indentString + '<!-- entry -->\n'
    string += indentString + `<script type="module" src="${flatManifestEntry.entry}"></script>\n`

    string += indentString + '<!-- optional preloads -->\n'
    for (const preload of flatManifestEntry.preloads) {
        string += indentString + `<link rel="modulepreload" href="${preload}"/>\n`
    }

    return string
}