import { element } from "../@types/register";

export default class Register {
  /** `customElement.define`을 실행 시 사용할 `element` */
  get element(): element[] { return []; }

  /**
   * `Component`를 등록을 위한 객체
   * 
   * ```
   * <html>
   *   <body>
   *     <test-component> </test-component>
   *   </body>
   *   <script type="importmap">
   *     {
   *       "imports": {
   *         "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
   *         "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/index.js"
   *       }
   *     }
   *   </script>
   *   <script type="module">
   *     import { SCEComponent, SCERegister } from "@nuka9510/simple-custom-element";
   *   
   *     class TestComponent extends SCEComponent {
   *       render() {
   *         return `<div> test </div>`;
   *       }
   *   
   *     }
   *   
   *     class TestRegister extends SCERegister {
   *       get element() {
   *         return [
   *           { tagName: 'test-component', element: TestComponent }
   *         ];
   *       }
   *   
   *     }
   * 
   *     new TestRegister();
   *   </script>
   * </html>
   * ```
   */
  constructor() {
    this.element.forEach((...arg) => { customElements.define(arg[0].tagName, arg[0].element as any); });
  }

}