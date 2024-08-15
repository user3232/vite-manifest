
# flatten-vite-manifest

Maps vite app entry points to all dependencies (direct and undirect).


Following commmand will read manifest, recursively resolve dependencies
and write result to file.

```sh
$ flatten-vite-manifest dist/.vite/manifest.json --output flat-manifest.json
```


## Vite manifest

As of vite@5 https://vitejs.dev, files all bundled using Rollup and 
information about correspondence between entry file
and compiled items is exposed in `dist/.vite/manifest.json`
file. This file is described at 
https://vitejs.dev/guide/backend-integration.html page.




## Development - Git Tagging

https://devconnected.com/how-to-create-git-tags/

```sh
# anonimous tag for HEAD
$ git tag v1.0.1

# anotiated tag
$ git tag v1.0.2 -am "Release 1.0.2"

# list tags
$ git tag
v1.0.1
v1.0.2

# list tags with messages
$ git tag -n
v1.0.1
v1.0.2    Release 1.0.2

# push tags
$ git push --tags

# annotiated tag for ref:
# last commit
$ git tag v.1.0.2-head HEAD -am "tag to actual 15.08.2024"
# commit before HEAD
$ git tag v.1.0.2-head HEAD~1 -am "tag to befor changes on 15.08.2024"
```
