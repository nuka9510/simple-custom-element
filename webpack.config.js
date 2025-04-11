const path = require('path');

module.exports = [
  {
    mode: 'none',
    entry: './dist/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'simpleCustomElement',
        type: 'var'
      }
    }
  }, {
    mode: 'production',
    entry: './dist/index.js',
    output: {
      filename: 'index.min.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'simpleCustomElement',
        type: 'var'
      }
    }
  }
];