[![LICENSE][license]][license-url]
[![GITHUB-VERSION][github-version]][github-version-url]
[![NPM-VERSION][npm-version]][npm-version-url]
![GITHUB-LAST-COMMIT][github-last-commit]
![NPM-LAST-UPDATE][npm-last-update]
![GITHUB-REPO-SIZE][github-repo-size]
![NPM-UNPACKED-SIZE][npm-unpacked-size]
![JSDELIVR-DOWNLOAD][jsdelivr-download]
![NPM-DOWNLOAD][npm-download]
![TOP-LANGUAGE][top-language]

[license]: https://img.shields.io/npm/l/%40nuka9510%2Fsimple-custom-element
[license-url]: https://github.com/nuka9510/simple-custom-element/blob/main/LICENSE

[github-version]: https://img.shields.io/github/package-json/v/nuka9510/simple-custom-element?logo=github
[github-version-url]: https://github.com/nuka9510/simple-custom-element

[npm-version]: https://img.shields.io/npm/v/%40nuka9510%2Fsimple-custom-element?logo=npm
[npm-version-url]: https://www.npmjs.com/package/@nuka9510/simple-custom-element

[github-last-commit]: https://img.shields.io/github/last-commit/nuka9510/simple-custom-element?logo=github

[npm-last-update]: https://img.shields.io/npm/last-update/%40nuka9510%2Fsimple-custom-element?logo=npm

[github-repo-size]: https://img.shields.io/github/repo-size/nuka9510/simple-custom-element?logo=github

[npm-unpacked-size]: https://img.shields.io/npm/unpacked-size/%40nuka9510%2Fsimple-custom-element?logo=npm

[jsdelivr-download]: https://img.shields.io/jsdelivr/npm/hm/%40nuka9510/simple-custom-element?logo=jsdelivr

[npm-download]: https://img.shields.io/npm/dm/%40nuka9510%2Fsimple-custom-element?logo=npm

[top-language]: https://img.shields.io/github/languages/top/nuka9510/simple-custom-element

## Install

```shell
npm i @nuka9510/simple-custom-element
```

```html
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/js/index.min.js"> </script>
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/js/plugin/index.min.js"> </script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@latest/dist/js/index.min.js"> </script>
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@latest/dist/js/plugin/index.min.js"> </script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@<specific-version>/dist/js/index.min.js"> </script>
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@<specific-version>/dist/js/plugin/index.min.js"> </script>
```

```html
<script type="importmap">
  {
    "imports": {
      "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/esm/index.min.mjs",
      "@nuka9510/simple-custom-element/plugin": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/esm/plugin/index.min.mjs"
    }
  }
</script>
```

```html
<script type="importmap">
  {
    "imports": {
      "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@latest/dist/esm/index.min.mjs",
      "@nuka9510/simple-custom-element/plugin": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@latest/dist/esm/plugin/index.min.mjs"
    }
  }
</script>
```

```html
<script type="importmap">
  {
    "imports": {
      "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@<specific-version>/dist/esm/index.mjs",
      "@nuka9510/simple-custom-element/plugin": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@<specific-version>/dist/esm/plugin/index.mjs"
    }
  }
</script>
```

## Usage

- js

```js
simpleCustomElement.Component;
simpleCustomElementPlugin.UtilAction;
```

- mjs

```js
import { Component } from "@nuka9510/simple-custom-element";
import { UtilAction } from "@nuka9510/simple-custom-element/plugin";
```

- cjs

```js
const simpleCustomElement = require('@nuka9510/simple-custom-element'),
simpleCustomElementPlugin = require('@nuka9510/simple-custom-element/plugin');

simpleCustomElement.Component;
simpleCustomElementPlugin.UtilAction;
```