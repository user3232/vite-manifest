
# vite-manifest

Maps vite app entry points to all dependencies (direct and undirect).

## install

```sh
$ npm i --save-dev @user3232/vite-manifest@git+https://github.com/user3232/vite-manifest.git#semver:latest
$ npm i --save-dev user3232/vite-manifest#semver:latest
```

## use


Following commmand will read manifest, recursively resolve dependencies
and write result to file.

```sh
$ npx vite-manifest dist/.vite/manifest.json --output flat-manifest.json
```


## Vite manifest

As of vite@5 https://vitejs.dev, files all bundled using Rollup and 
information about correspondence between entry file
and compiled items is exposed in `dist/.vite/manifest.json`
file. This file is described at 
https://vitejs.dev/guide/backend-integration.html page.


