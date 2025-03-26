[![GITHUB][github]][github-url]
[![NPM][npm]][npm-url]

# js-util
## Installation
```
npm i @nuka9510/js-util
```
## Usage
```
root
├── dist
│  ├── index.js
│  └── util.js
└── example
   ├── js
   │  └── index.js
   └── view
      └── index.html
```
* example/js/index.js
```
import { JUtil } from "@nuka9510/js-util";

class Index {
  constructor() {
    this.onValueEmptyCheckClick = this.onValueEmptyCheckClick.bind(this);

    this.init();
  }

  onValueEmptyCheckClick(ev) {
    const value = document.querySelector('[data-name="value"]'),
    result = document.querySelector('[data-name="result"]');

    if (JUtil.empty(value.value)) {
      result.innerHTML = 'true';
    } else { result.innerHTML = 'false'; }
  }

  init() {
    document.querySelectorAll('[data-action="value-empty-check-click"]').forEach((...arg) => { arg[0].addEventListener('click', this.onValueEmptyCheckClick); });
  }

}

new Index();
```
* example/view/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div data-name="result"></div>
  <div style="display: flex; flex-direction: column;">
    <input type="text" data-name="value">
    <div style="display: flex;">
      <button data-action="value-empty-check-click">value-empty</button>
    </div>
  </div>
</body>
<script type="importmap">
  {
    "imports": { "@nuka9510/js-util": "/dist/index.js" }
  }
</script>
<script type="module" src="../js/index.js"></script>
</html>
```

[github]: https://img.shields.io/badge/github-blue.svg?style=flat&logo=github
[github-url]: https://github.com/nuka9510/js-util
[npm]: https://img.shields.io/badge/npm-1.0.21-blue.svg?style=flat&logo=nodedotjs
[npm-url]: https://www.npmjs.com/package/@nuka9510/js-util