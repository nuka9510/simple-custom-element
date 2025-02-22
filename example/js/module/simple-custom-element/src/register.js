export default class SceRegister {
  /** @type {sce_register.SceRegister['element']} */
  get element() { return []; };

  /** @type {sce_register.Constructor} */
  constructor() {
    this.element.forEach((el, i, arr) => { customElements.define(el.tagName, el.element); });
  }
}