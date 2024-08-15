import { ViteManifestFlat, ViteManifestFlatEntry } from './resolve-vite-manifest.js';
/**
 * Transforms resolved vite manifest to textual
 * information containing html imports by script
 * and link tags. Easy to copy-paste.
 */
export declare function viteFlatManifestTags(flatManifest: ViteManifestFlat): string;
/**
 * Transforms resolved vite manifest entry to
 * set of html import tags (stylesheets, script modules,
 * script modules preloads).
 */
export declare function viteFlatManifestEntryToTags(flatManifestEntry: ViteManifestFlatEntry, indent?: number): string;
