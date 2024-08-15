import { depth } from 'treeverse';
/**
 * Resolves Vite manifest entry interdependencies.
 */
export function resolveViteManifestEntry(manifest, entryPath) {
    const manifestEntry = manifest[entryPath];
    if (!manifestEntry) {
        throw '';
    }
    const csses = [];
    depth({
        tree: manifestEntry,
        visit: (node) => {
            csses.push(...(node.css ?? []));
            return node;
        },
        getChildren: (node) => {
            const imports = node.imports?.map((key) => {
                const entry = manifest[key];
                if (!entry) {
                    throw '';
                }
                return entry;
            }) ?? [];
            const dynamicImports = node.dynamicImports?.map((key) => {
                const entry = manifest[key];
                if (!entry) {
                    throw '';
                }
                return entry;
            }) ?? [];
            return [...imports, ...dynamicImports];
        },
    });
    return {
        preloads: [...new Set(manifestEntry.imports?.map((importEntry) => {
                const fileName = manifest[importEntry]?.file;
                if (!fileName) {
                    throw '';
                }
                return fileName;
            }) ?? [])],
        entry: manifestEntry.file,
        csses: [...new Set(csses)]
    };
}
/**
 * Resolves vite manifest entries interdependencies.
 */
export function resolveViteManifest(manifest) {
    const flatManifest = {};
    for (const [key, { isEntry }] of Object.entries(manifest)) {
        if (isEntry) {
            flatManifest[key] = resolveViteManifestEntry(manifest, key);
        }
    }
    return flatManifest;
}
//# sourceMappingURL=resolve-vite-manifest.js.map