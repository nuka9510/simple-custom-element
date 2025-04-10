import { SCERegister } from "@nuka9510/simple-custom-element";
import TestComponent from "../component/test-component.mjs";

export default class TestResister extends SCERegister {
  get element() {
    return [
      { tagName: 'test-component', element: TestComponent }
    ];
  }

}