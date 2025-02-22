import { SceRegister } from "../module/simple-custom-element/src/index.js";
import TestElement from "../component/test-element.js";

export default class TestResister extends SceRegister {
  get element() {
    return [
      {
        tagName: 'test-element',
        element: TestElement
      }
    ];
  }

}