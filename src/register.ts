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
   *       "imports": { "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/esm/index.min.mjs" }
   *     }
   *   </script>
   *   <script type="module">
   *     import { Component, Register } from "@nuka9510/simple-custom-element";
   *   
   *     class TestComponent extends Component {
   *       render() {
   *         return `<div> test </div>`;
   *       }
   *   
   *     }
   *   
   *     class TestRegister extends Register {
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
    this.preHandle();

    this.element.forEach((...arg) => { customElements.define(arg[0].tagName, arg[0].element as any); });

    this.postHandle();
  }

  /** `customElement.define` 이전에 실행할 `callback` */
  preHandle() {}

  /** `customElement.define` 이후에 실행할 `callback` */
  postHandle() {}

}