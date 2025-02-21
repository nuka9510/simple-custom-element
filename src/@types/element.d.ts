import sce_proxy from "./proxy.js";
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
		[action: string]: action_callback[];
	}

	class SceElement extends HTMLElement {
		util: sce_util.SceUtil;

		/** @private */
		private _isLoaded: boolean;

		/** @private */
		private _template: HTMLTemplateElement;

		/** @private */
		private _root: SceElement?;

		/** @private */
		private __action: action;

		/** @private */
		private get _action(): action;

		get action(): action;

		/** class load 여부 */
		get isLoaded(): boolean;

		/** root `SceElement` 객체 */
		get root(): SceElement?;

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
		 * 화면에 `render`할 html 문자열을 반환한다.
		 */
		render(): string;

		/**
		 * 화면을 `render`한다.
		 * 
		 * @private
		 */
		private _render(): void;

		/** `arg`를 `target`으로 갖는 `PBProxy`객체를 반환한다. */
		setState(arg: object): sce_proxy.SceProxy;

		/** 현재 페이지의 `URLSearchParams`객체를 반환한다. */
		getParams(): URLSearchParams;

		/**
		 * `SceElement`가 `connected`될 때 실행할 `callback`
		 */
		connectedCallback(): void;

		/** `SceElement`가 `disconnected`될 때 실행할 `callback` */
		disconnectedCallback(): void;

		/** `SceElement`가 새로운 `document`로 이동되었을 때 실행할 `callback` */
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
		private _eventInit(): void;

		/**
		 * `SceElement`에 정의한 `eventListener`들을 `remove`한다.
		 * 
		 * @private
		 */
		private _destroy(): void;

		/**
		 * @example
		 * <input type="radio" data-sce-action="event-cancel" data-sce-event="click">
		 * #data-sce-event - 이벤트 #separator: ' '
		 * 
		 * @private
		 */
		private _eventCancel(ev: Event): void;

		/**
		 * @example
		 * <button type="button" data-sce-action="bubble-stop"> 버튼 </button>
		 * 
		 * @private
		 */
		private _bubbleStop(ev: MouseEvent | Event): void;

		/** @async */
		async afterSubSelect(ev: Event): Promise<void>;

		/**
		 * @example
		 * <select data-sce-action="sub-select" data-sce-target="[data-sce-id]">
		 *    <option value="a">A</option>
		 *    <option value="b">B</option>
		 * </select>
		 * <select data-sce-id="[data-sce-id]">
		 *    <option style="display: none" data-sce-main="a" value="1">1</option>
		 *    <option style="display: none" data-sce-main="a" value="2">2</option>
		 *    <option style="display: none" data-sce-main="a" value="3">3</option>
		 *    <option style="display: none" data-sce-main="b" value="4">4</option>
		 *    <option style="display: none" data-sce-main="b" value="5">5</option>
		 *    <option style="display: none" data-sce-main="b" value="6">6</option>
		 * </select>
		 * 
		 * @private
		 */
		private _subSelect(ev: Event): void;

		/** @async */
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

		/** @async */
		async afterCheck(ev: MouseEvent): Promise<void>;

		/**
		 * @example
		 * #1
		 * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]">
		 * <input type="hidden" value="N" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
		 * 
		 * #2
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