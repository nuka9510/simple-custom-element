import { element } from "../@types/register.js";

export default class Register {
  /** `customElement.define`을 실행 시 사용할 `element` */
  get element(): element[] { return []; }

  constructor() {
    this.element.forEach((...arg) => { customElements.define(arg[0].tagName, arg[0].element as any); });
  }

}