import sce_component from "./component.js";

export = sce_register;
export as namespace sce_register;

declare namespace sce_register {
  interface element {
    tagName: string;
    element: sce_component.Component;
  }

  class Register {
    /**
     * customElement.define을 실행 시 사용할 element
     */
    get element(): element[];
  }

  interface Constructor {
    (): Register;
  }
}