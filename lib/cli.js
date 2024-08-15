#!/usr/bin/env -S npx tsx
import fs from 'node:fs/promises';
import { resolveViteManifest } from './resolve-vite-manifest.js';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { viteFlatManifestTags } from './vite-manifest-tags.js';
const commandOptions = [
    {
        name: 'src',
        defaultOption: true,
        type: String,
        typeLabel: '{underline file}',
        description: 'Path to vite manifest file, e.g. \
`dist/.vite/manifest.json`',
    },
    {
        name: 'output',
        alias: 'o',
        type: String,
        typeLabel: '{underline file}',
        description: 'Path to flatted vite manifest file, e.g. \
`dist/.vite/manifest.flat.json`',
    },
    {
        name: 'tags',
        alias: 't',
        type: String,
        typeLabel: '{underline file}',
        description: 'Path to flatted vite manifest file with html \
tags, e.g. `dist/.vite/manifest.tags.json`',
    },
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Display this usage guide.',
    },
];
const commandUsage = [
    {
        header: 'Flats Vite manifest',
        content: 'Generates {bold flatted} Vite manifest \
and saves to file (if provided), \
also displays mapping to html tags.',
    },
    {
        header: 'Synopsis',
        content: [
            '$ flat-vite-manifest [{bold --output} {underline file}] \
[{bold --tags} {underline file}] [{bold --src}] {underline file}',
            '$ flat-vite-manifest {bold --help}'
        ]
    },
    {
        header: 'Options',
        optionList: commandOptions,
    },
    {
        header: 'Examples',
        content: [
            {
                desc: '1. Display. ',
                example: '$ flat-vite-manifest dist/.vite/manifest.json'
            },
            {
                desc: '2. Save files. ',
                example: '$ flat-vite-manifest --output \
flat.json --tags tags.json dist/.vite/manifest.json'
            },
            {
                desc: '3. Getting help. ',
                example: '$ flat-vite-manifest --help'
            },
        ]
    },
];
async function flatViteManifest() {
    try {
        const args = commandLineArgs(commandOptions);
        if (args.help) {
            console.log(commandLineUsage(commandUsage));
            return;
        }
        if (!args.src || args.src === '') {
            throw new Error('Path to vite manifest file must be provided.');
        }
        console.log(`Reading Vite manifest from: ${args.src} `);
        const manifestText = await fs.readFile(args.src, { encoding: 'utf8' });
        console.log(`Flatting manifest ...`);
        const manifest = JSON.parse(manifestText);
        const flatManifest = resolveViteManifest(manifest);
        const flatManifestJson = JSON.stringify(flatManifest, undefined, 4);
        if (!args.output || args.output === '') {
            console.log(`Flat manifest:`);
            console.log(flatManifestJson);
            console.log();
        }
        else {
            console.log(`Writing flat manifest to: ${args.output}`);
            await fs.writeFile(args.output, flatManifestJson, { encoding: 'utf8' });
        }
        if (!args.tags || args.tags === '') {
            console.log(`Flat manifest tags:`);
            const flatManifestTags = viteFlatManifestTags(flatManifest);
            console.log(flatManifestTags);
            console.log();
        }
        else {
            console.log(`Writing flat manifest tags to: ${args.tags}`);
            const flatManifestTags = viteFlatManifestTags(flatManifest);
            await fs.writeFile(args.tags, flatManifestTags, { encoding: 'utf8' });
        }
        console.log(`Done!`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`${err.name}: ${err.message}`);
        }
        else {
            console.log(`Unknown Error!`);
            console.error(err);
        }
    }
}
// run program
flatViteManifest();
//# sourceMappingURL=cli.js.map