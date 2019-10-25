# npm-i

Install npm modules and dependencies to arbitrary places from code.

``` js
const i = require('npm-i')

// Installs two modules into the `foo` dir
i(['request', 'lodash'], { path: `path/to/foo` }, err => {
  if (err) throw err
  console.log('Installed modules in foo!')
})

// Installs the dependencies in `bar/package.json`
i({ path: `path/to/bar` }, err => {
  if (err) throw err
  console.log('Installed dependencies!')
})
```

## install
```
$ npm i npm-i
```

## usage
### `i([name], [options], [cb])`
All parameters are *optional*.

`name` is a `String` or `Array` of module names to be installed.

`options` is an `Object` storing settings:
- `path`: a `String` to the destination folder
- `save`: a `Boolean` indicating to save to `package.json` as a dependency
- `saveDev`: a `Boolean` indicating to save to `package.json` as a developer dependency
