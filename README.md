[![GITHUB][github]][github-url]
[![NPM][npm]][npm-url]

# simple-custom-element
## Installation
```
npm i @nuka9510/simple-custom-element
```
## Usage
```
root
├── dist
│  ├── component.js
│  ├── context.js
│  ├── index.js
│  ├── plugin.js
│  ├── register.js
│  └── state.js
├── example
│  ├── js
│  │  ├── component
│  │  │  └── test-element.js
│  │  ├── register
│  │  │  └── test-register.js
│  │  └── index.js
│  └── view
│     └── index.html
└── node_modules
   └── @nuka9510
      └── js-util
         └── dist
            ├── index.js
            └── util.js
```
- `js/component/test-element.js`
```
import { SceComponent } from "../module/simple-custom-element/src/index.js";

export default class TestElement extends SceComponent {
  get action() { return {
    'set-state': [
      {
        event: 'click',
        callback: this.onSetStateClick
      }
    ]
  }; }

  async init() {
    this.state = this.setState({ arg: 'arg1' });
  }

  onSetStateClick(ev) {
    const node = ev.currentTarget;

    this.state.set('arg', node.dataset.sceValue);
  }

  render() {
    const state = this.state.get();

    return `
      <table style="border-collapse: collapse;">
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
            <th style="border: 1px solid #000000"> num </th>
            <th style="border: 1px solid #000000"> num * 2 </th>
            <th style="border: 1px solid #000000"> num ** 2 </th>
            <th style="border: 1px solid #000000"> (num / (num * 2)) * 100 </th>
            <th style="border: 1px solid #000000"> (num / (num ** 2)) * 100 </th>
            <th style="border: 1px solid #000000"> ((num * 2) / (num ** 2)) * 100 </th>
          </tr>
        </thead>
        <tbody>
          ${
            this[state.arg].list.reduce(
              (acc, cur, i, arr) => `
                ${acc}
                <tr>
                  <td style="text-align: center; border: 1px solid #000000;"> ${cur.num} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${cur.num * 2} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${cur.num ** 2} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${this.util.numberFormat((cur.num / (cur.num * 2)) * 100, 3)} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${this.util.numberFormat((cur.num / (cur.num ** 2)) * 100, 3)} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${this.util.numberFormat(((cur.num * 2) / (cur.num ** 2)) * 100, 3)} </td>
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
- `js/register/test-register.js`
```
import { SceRegister } from "../module/simple-custom-element/src/index.js";
import TestElement from "../component/test-element.js";

export default class TestResister extends SceRegister {
  get element() {
    return [
      { tagName: 'test-element', element: TestElement }
    ];
  }

}
```
- `js/test.js`
```
import TestResister from "./register/test-register.js";

new TestResister();
```
- `view/test.html`
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <test-element>
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
  </test-element>
</body>
<script src="../js/test.js" type="module"></script>
</html>
```

[github]: https://img.shields.io/badge/github-blue.svg?style=flat&logo=github
[github-url]: https://github.com/nuka9510/simple-custom-element
[npm]: https://img.shields.io/badge/npm-1.0.0-blue.svg?style=flat&logo=nodedotjs
[npm-url]: https://www.npmjs.com/package/@nuka9510/simple-custom-element