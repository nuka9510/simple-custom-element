export default class Register {
  /** @type {sce_register.Register['element']} */
  get element() { return []; };

  /** @type {sce_register.Constructor} */
  constructor() {
    this.element.forEach((...arg) => { customElements.define(arg[0].tagName, arg[0].element); });
  }
}