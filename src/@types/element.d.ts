import sce_plugin from "./plugin.js";
import sce_state from "./state.js";
import sce_util from "./util.js";

export = sce_element;
export as namespace sce_element;

declare namespace sce_element {
  interface action_callback {
    event?: string;
    callback: (ev: Event) => void | Promise<void>;
    option?: EventListenerOptions;
  }

  interface action {
    [data_sce_action: string]: action_callback[];
  }

  type root = SceElement | Document;

  class SceElement extends HTMLElement {
    /**
     * `SceElement`에 사용할 `plugin` 배열 객체
     * 
     * @private
     */
    private _plugin: sce_plugin.plugin[];

    /**
     * `SceElement` `load` 여부
     * 
     * @private
     */
    private _isLoaded: boolean;

    /**
     * `rendering` 시 사용할 `HTMLTemplateElement` 객체
     * 
     * @private
     */
    private _template: HTMLTemplateElement;

    /**
     * 현재 `SceElement`를 호출 한 `Document` 또는 `SceElement` 객체
     * 
     * @private
     */
    private _root: root;
 
    /**
     * `EventListener`에 할당 할 `data-sce-action`을 정의한 `action`
     * 
     * @private
     */
    private __action: action;

    /**
     * `EventListener`에 할당 할 `data-sce-action`을 정의한 `action`
     * 
     * @private
     */
    private get _action(): action;

    /**
     * `EventListener`에 할당 할 `data-sce-action`을 정의한 `action`
     */
    get action(): action;

    /**
     * `SceElement` `load` 여부
     */
    get isLoaded(): boolean;

    /**
     * 현재 `SceElement`를 호출 한 `Document` 또는 `SceElement` 객체
     */
    get root(): root;

    /**
     * `SceElement`의 `attributeChangedCallback`를 실행하기 위해 추척할 `attributes`
     * 
     * @static
     */
    get observedAttributes(): string[];

    /**
     * `SceElement`가 할당 될 때 실행한다.
     * 
     * @async
     */
    async init(): Promise<void>;

    /**
     * `rendering`이후 실행 할 `callback`
     */
    afterRender(): void;

    /**
     * 화면에 `render`할 html 문자열을 반환한다.
     */
    render(): string;

    /**
     * 화면을 `render`한다.
     * 
     * @private
     */
    private _render(): void;

    /**
     * `SceElement`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback`
     */
    destroy(): void;

    /**
     * `SceElement`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback`
     */
    private _destroy(): void;

    /**
     * `arg`를 `state`로 갖는 `SceState`객체를 반환한다.
     */
    setState<T extends { [key: string]: any; }>(state: T): sce_state.SceState<T>;

    /**
     * 현재 페이지의 `URLSearchParams`객체를 반환한다.
     */
    getParams(): URLSearchParams;

    /**
     * `SceElement`가 `connected`될 때 실행할 `callback`
     */
    connectedCallback(): void;

    /**
     * `SceElement`가 `disconnected`될 때 실행할 `callback`
     */
    disconnectedCallback(): void;

    /**
     * `SceElement`가 새로운 `document`로 이동되었을 때 실행할 `callback`
     */
    adoptedCallback(): void;

    /**
     * `SceElement`의 `observedAttributes`가 변경 될 때 실행할 `callback`
     */
    attributeChangedCallback(
      target: string,
      oldValue: string,
      newValue: string
    ): void;

    /** `SceElement`의 `attributeChangedCallback`가 실행 될 때 실행 할 `callback` */
    updateAttribute(
      target: string,
      oldValue: string,
      newValue: string
    ): void;

    /**
     * `SceElement`에 정의한 `eventListener`들을 `add`한다.
     * 
     * @private
     */
    private _addEvent(): void;

    /**
     * `SceElement`에 정의한 `eventListener`들을 `remove`한다.
     * 
     * @private
     */
    private _removeEvent(): void;

    /**
     * Event.preventDefault를 실행 한다.
     * 
     * @example
     * <input type="radio" data-sce-action="prevent-default" data-sce-event="click">
     * #data-sce-event - 이벤트 #separator: ' '
     * 
     * @private
     */
    private _preventDefault(ev: Event): void;

    /**
     * Event.stopPropagation를 실행 한다.
     * 
     * @example
     * <button type="button" data-sce-action="stop-propagation" data-sce-event="click"> 버튼 </button>
     * #data-sce-event - 이벤트 #separator: ' '
     * 
     * @private
     */
    private _stopPropagation(ev: Event): void;

    /**
     * `data-sce-action="sub-select"`이후 실행 할 `callback`
     * 
     * @async
     */
    async afterSubSelect(ev: Event): Promise<void>;

    /**
     * @example
     * <select data-sce-action="sub-select" data-sce-target="[data-sce-name]">
     *   <option value="a">A</option>
     *   <option value="b">B</option>
     * </select>
     * <select data-sce-name="[data-sce-name]">
     *   <option style="display: none" data-sce-main="a" value="1">1</option>
     *   <option style="display: none" data-sce-main="a" value="2">2</option>
     *   <option style="display: none" data-sce-main="a" value="3">3</option>
     *   <option style="display: none" data-sce-main="b" value="4">4</option>
     *   <option style="display: none" data-sce-main="b" value="5">5</option>
     *   <option style="display: none" data-sce-main="b" value="6">6</option>
     * </select>
     * 
     * @private
     */
    private _subSelect(ev: Event): void;

    /**
     * `data-sce-action="check-all"`이후 실행 할 `callback`
     * 
     * @async
     */
    async afterCheckAll(ev: MouseEvent): Promise<void>;

    /**
     * @example
     * <input type="checkbox" data-sce-action="check-all" data-sce-target="[target-data-sce-name]">
     * <input type="checkbox" data-sce-name="[target-data-sce-name]">
     * <input type="checkbox" data-sce-name="[target-data-sce-name]">
     * 
     * @async
     * @private
     */
    async private _checkAll(ev: MouseEvent): Promise<void>;

    /** @private */
    private _numberOnlyKeydown(ev: KeyboardEvent): void;

    /** @private */
    private _numberOnlyInput(ev: Event): void;

    /** @private */
    private _numberOnlyBlur(ev: FocusEvent): void;

    /**
     * @example
     * <input type="text" data-sce-action="number-only" data-sce-type="A">
     * <input type="text" data-sce-action="number-only" data-sce-type="A" data-sce-min="0" data-sce-max="100">
     * <input type="text" data-sce-action="number-only" data-sce-type="B">
     * <input type="text" data-sce-action="number-only" data-sce-type="C">
     * <input type="text" data-sce-action="number-only" data-sce-type="C" data-sce-decimal="2">
     * 
     * #data-sce-min 최소값
     * optional
     * 
     * #data-sce-max 최대값
     * optional
     * 
     * #data-sce-type
     * A: 숫자만 허용
     * B: 소숫점 및 음수 허용
     * C: #,###.# 형식으로 변환
     * 
     * #data-sce-decimals 소숫점 아래 자리 수
     * defalut: 0
     * 
     * @private
     */
    private _numberOnly(ev: Event | FocusEvent): void;

    /**
     * `data-sce-action="check"`이후 실행 할 `callback`
     * 
     * @async
     */
    async afterCheck(ev: MouseEvent): Promise<void>;

    /**
     * @example
     * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]">
     * <input type="hidden" value="N" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
     * 
     * @example
     * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]" checked>
     * <input type="hidden" value="Y" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
     * 
     * @async
     * @private
     */
    async private _check(ev: MouseEvent): Promise<void>;
  }

  interface Constructor {
    (): SceElement;
  }
}