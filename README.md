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

## Usage
### js (> 1.1.2)
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/index.min.js"> </script>
  OR
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@latest/dist/index.min.js"> </script>
  OR
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@<specific-version>/dist/index.min.js"> </script>
```
### mjs
```
npm i @nuka9510/simple-custom-element
```
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "<path>/node_modules/@nuka9510/js-util/dist/index.mjs",
      "@nuka9510/simple-enum": "<path>/node_modules/@nuka9510/simple-enum/dist/index.mjs",
      "@nuka9510/simple-custom-element": "<path>/node_modules/@nuka9510/simple-custom-element/dist/index.mjs"
        OR
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.mjs",
      "@nuka9510/simple-enum": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-enum/dist/index.mjs",
      "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/index.mjs"
        OR
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@latest/dist/index.mjs",
      "@nuka9510/simple-enum": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-enum@latest/dist/index.mjs",
      "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@latest/dist/index.mjs"
        OR
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@<specific-version>/dist/index.mjs",
      "@nuka9510/simple-enum": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-enum@<specific-version>/dist/index.mjs",
      "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element@<specific-version>/dist/index.mjs"
    }
  }
</script>
```
### example
```
example
├── js
│  ├── component
│  │  └── test-component.mjs
│  ├── register
│  │  └── test-register.mjs
│  └── index.mjs
└── view
   └── index.html
```
- `js/component/test-component.mjs`
```
import { JUtil } from "@nuka9510/js-util";
import { SCEComponent } from "@nuka9510/simple-custom-element";

export default class TestComponent extends SCEComponent {
  get action() {
    return {
      'set-state': [
        { event: 'click', callback: this.onSetStateClick }
      ]
    };
  }

  get css() {
    return `
      table { border-collapse: collapse; }
      :is(th, td) { border: 1px solid #000000; }
      td { text-align: center; }
    `;
  }

  async init() {
    this.attachShadow({ mode: 'open' });

    this.state = this.setState({ arg: 'arg1' });
  }

  onSetStateClick(ev) {
    const node = ev.currentTarget;

    this.state.set('arg', node.dataset.sceValue);
  }

  eventInit() { console.debug('eventInit'); }

  render() {
    const state = this.state.get();

    return `
      <table>
        <colgroup>
          <col style="width: 80px;">
          <col style="width: 80px;">
          <col style="width: 80px;">
          <col style="width: 250px;">
          <col style="width: 250px;">
          <col style="width: 250px;">
        </colgroup>
        <thead>
          <tr>
            <th> num </th>
            <th> num * 2 </th>
            <th> num ** 2 </th>
            <th> (num / (num * 2)) * 100 </th>
            <th> (num / (num ** 2)) * 100 </th>
            <th> ((num * 2) / (num ** 2)) * 100 </th>
          </tr>
        </thead>
        <tbody>
          ${
            this[state.arg].list.reduce(
              (...arg) => `
                ${ arg[0] }
                <tr>
                  <td> ${ arg[1].num } </td>
                  <td> ${ arg[1].num * 2 } </td>
                  <td> ${ arg[1].num ** 2 } </td>
                  <td> ${ JUtil.numberFormat((arg[1].num / (arg[1].num * 2)) * 100, 3) } </td>
                  <td> ${ JUtil.numberFormat((arg[1].num / (arg[1].num ** 2)) * 100, 3) } </td>
                  <td> ${ JUtil.numberFormat(((arg[1].num * 2) / (arg[1].num ** 2)) * 100, 3) } </td>
                </tr>
              `, ''
            )
          }
        </tbody>
      </table>
      <button type="button" data-sce-action="set-state" data-sce-value="arg1"> setState(arg1) </button>
      <button type="button" data-sce-action="set-state" data-sce-value="arg2"> setState(arg2) </button>
      <button type="button" data-sce-action="set-state" data-sce-value="arg3"> setState(arg3) </button>
    `;
  }

}
```
- `js/register/test-register.mjs`
```
import { SCERegister } from "@nuka9510/simple-custom-element";
import TestComponent from "../component/test-component.mjs";

export default class TestResister extends SCERegister {
  get element() {
    return [
      { tagName: 'test-component', element: TestComponent }
    ];
  }

}
```
- `js/index.mjs`
```
import TestResister from "./register/test-register.mjs";

new TestResister();
```
- `view/index.html`
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <test-component>
    <script type="application/json" data-sce-arg="arg1">
      {
        "list": [
          { "num": 1 },
          { "num": 2 },
          { "num": 3 },
          { "num": 4 },
          { "num": 5 },
          { "num": 6 }
        ]
      }
    </script>
    <script type="application/json" data-sce-arg="arg2">
      {
        "list": [
          { "num": 7 },
          { "num": 8 },
          { "num": 9 },
          { "num": 10 },
          { "num": 11 },
          { "num": 12 }
        ]
      }
    </script>
    <script type="application/json" data-sce-arg="arg3">
      {
        "list": [
          { "num": 13 },
          { "num": 14 },
          { "num": 15 },
          { "num": 16 },
          { "num": 17 },
          { "num": 18 }
        ]
      }
    </script>
  </test-component>
</body>
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.mjs",
      "@nuka9510/simple-enum": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-enum/dist/index.mjs",
      "@nuka9510/simple-custom-element": "../../dist/index.mjs"
    }
  }
</script>
<script src="../js/index.mjs" type="module"></script>
</html>
```