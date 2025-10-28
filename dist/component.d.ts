import { action, root } from "@nuka9510/simple-custom-element/@types/component";
import State from "./state.js";
export default class Component extends HTMLElement {
    #private;
    /** `Component` `load` 여부 */
    get isLoaded(): boolean;
    /** 현재 `Component`를 호출 한 `Document` 또는 `Component` 객체 */
    get root(): root;
    /** `EventListener`에 할당 할 `data-sce-action`을 정의한 `action` */
    get action(): action;
    /** `Component`에서 사용할 모든 `action` */
    get allAction(): action;
    /** `ShadowRoot`에 적용 할 `style`을 정의한 `css`문자열 */
    get css(): string;
    /** `html`을 `render`하는 `Component` 또는 `ShadowRoot` 객체 */
    get el(): Component | ShadowRoot;
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
    constructor();
    /** `Component`가 할당 될 때 실행한다. */
    init(): Promise<void>;
    /**
     * `Component`객체의 `action`에 정의한 이벤트들의 `eventListener`를 갱신한다.
     * `removeEventListener` -> `addEventListener`
     * `eventListener`를 갱신 후 실행할 `callback` 정의.
     */
    updateEvent(): void;
    /** `Component`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용할 시 실행할 `callback`. */
    addEvent(): void;
    /** `Component`객체의 `action`에 정의한 이벤트를 `removeEventListener`에 적용할 시 실행할 `callback`. */
    removeEvent(): void;
    /** `rendering`이후 실행 할 `callback` */
    afterRender(): void;
    /** 화면에 `render`할 html 문자열을 반환한다. */
    render(): string | void;
    /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
    destroy(): void;
    /** `arg`를 `state`로 갖는 `State`객체를 반환한다. */
    setState<T extends object>(state: T): State<T>;
    /** 현재 페이지의 `URLSearchParams`객체를 반환한다. */
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
}
