import { Register } from "@nuka9510/simple-custom-element";
import TestComponent from "../component/test-component.mjs";

export default class TestResister extends Register {
  get element() {
    return [
      { tagName: 'test-component', element: TestComponent }
    ];
  }

}