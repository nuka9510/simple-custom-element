export default class SceRegister {
  /** @type {sce_register.SceRegister['element']} */
  get element() { return []; };

  /** @type {sce_register.Constructor} */
  constructor() {
    this.element.forEach((...arg) => { customElements.define(arg[0].tagName, arg[0].element); });
  }
}