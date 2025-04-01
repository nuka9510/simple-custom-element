import { action, root } from "../@types/component";
import State from "./state.js";
export default class Component extends HTMLElement {
    #private;
    /** `EventListener`에 할당 할 `data-sce-action`을 정의한 `action` */
    get action(): action;
    /** `Component` `load` 여부 */
    get isLoaded(): boolean;
    /** 현재 `Component`를 호출 한 `Document` 또는 `Component` 객체 */
    get root(): root;
    /** `Component`의 `attributeChangedCallback`를 실행하기 위해 추척할 `attributes` */
    static get observedAttributes(): string[];
    /**
     * `custom-element`를 위한 `Component`객체
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
    constructor();
    /** `Component`가 할당 될 때 실행한다.  */
    init(): Promise<void>;
    /** `rendering`이후 실행 할 `callback` */
    afterRender(): void;
    /** 화면에 `render`할 html 문자열을 반환한다.  */
    render(): string | void;
    /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
    destroy(): void;
    /** `arg`를 `state`로 갖는 `State`객체를 반환한다.  */
    setState<T extends object>(state: T): State<T>;
    /** 현재 페이지의 `URLSearchParams`객체를 반환한다.  */
    getParams(): URLSearchParams;
    /** `Component`가 `connected`될 때 실행할 `callback` */
    connectedCallback(): void;
    /** `Component`가 `disconnected`될 때 실행할 `callback` */
    disconnectedCallback(): void;
    /** `Component`가 새로운 `document`로 이동되었을 때 실행할 `callback` */
    adoptedCallback(): void;
    /** `Component`의 `observedAttributes`가 변경 될 때 실행할 `callback` */
    attributeChangedCallback(target: string, oldValue: string, newValue: string): void;
    /** `Component`의 `attributeChangedCallback`가 실행 될 때 실행 할 `callback` */
    updateAttribute(target: string, oldValue: string, newValue: string): void;
    /** `data-sce-action="sub-select"`이후 실행 할 `callback` */
    afterSubSelect(ev: Event): Promise<void>;
    /** `data-sce-action="check-all"`이후 실행 할 `callback` */
    afterCheckAll(ev: MouseEvent): Promise<void>;
    /** `data-sce-action="check"`이후 실행 할 `callback` */
    afterCheck(ev: MouseEvent): Promise<void>;
}
