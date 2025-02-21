import SceRegister from "../../../../src/register.js";
import Test from "../component/first/test.js";

export default class FirstRegister extends SceRegister {
  get element() {
    return [
      {
        tagName: 'first-test',
        element: Test
      }
    ];
  }
}