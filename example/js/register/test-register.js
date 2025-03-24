import { SCERegister } from "@nuka9510/simple-custom-element";
import TestElement from "../component/test-element.js";

export default class TestResister extends SCERegister {
  get element() {
    return [
      { tagName: 'test-element', element: TestElement }
    ];
  }

}