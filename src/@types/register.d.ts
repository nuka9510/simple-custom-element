import sce_element from "./element.js";

export = sce_register;
export as namespace sce_register;

declare namespace sce_register {
  interface element {
    tagName: string;
    element: sce_element.SceElement;
  }

	class SceRegister {
    get element(): element[];
  }

	interface Constructor {
		(): SceRegister;
	}
}