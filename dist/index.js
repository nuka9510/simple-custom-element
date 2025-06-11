var simpleCustomElement;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _context_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _plugin_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




class Component extends HTMLElement {
    /** `Component`에 사용할 `plugin` 배열 객체 */
    #plugin;
    /** `Component` `load` 여부 #default `false` */
    #isLoaded;
    /** `rendering` 시 사용할 `HTMLTemplateElement` 객체 */
    #template;
    /** 현재 `Component`를 호출 한 `Document` 또는 `Component` 객체 */
    #root;
    /** `EventListener`에 할당 할 `data-sce-action`을 정의한 `action` */
    #_action;
    /** `Component` `load` 여부 */
    get isLoaded() { return this.#isLoaded; }
    /** 현재 `Component`를 호출 한 `Document` 또는 `Component` 객체 */
    get root() { return this.#root; }
    /** `EventListener`에 할당 할 `data-sce-action`을 정의한 `action` */
    get #action() {
        return {
            'prevent-default': [
                { callback: this.#preventDefault }
            ],
            'stop-propagation': [
                { callback: this.#stopPropagation }
            ],
            'sub-select': [
                { event: 'change', callback: this.#subSelect }
            ],
            'check-all': [
                { event: 'click', callback: this.#checkAll, option: { capture: true } }
            ],
            'number-only': [
                { event: 'keydown', callback: this.#numberOnlyKeydown },
                { event: 'input', callback: this.#numberOnlyInput },
                { event: 'blur', callback: this.#numberOnlyBlur }
            ],
            'check': [
                { event: 'click', callback: this.#check }
            ]
        };
    }
    /** `EventListener`에 할당 할 `data-sce-action`을 정의한 `action` */
    get action() { return {}; }
    /** `ShadowRoot`에 적용 할 `style`을 정의한 `css`문자열 */
    get css() { return ''; }
    /** `html`을 `render`하는 `Component` 또는 `ShadowRoot` 객체 */
    get el() { return this.shadowRoot ?? this; }
    /** `Component`의 `attributeChangedCallback`를 실행하기 위해 추척할 `attributes` */
    static get observedAttributes() { return []; }
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
    constructor() {
        super();
        const eventInit = this.eventInit.bind(this), eventDestroy = this.eventDestroy.bind(this);
        this.eventInit = () => {
            this.#eventInit();
            eventInit();
        };
        this.eventDestroy = () => {
            this.#eventDestroy();
            eventDestroy();
        };
        this.#plugin = _plugin_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].plugin.filter((...arg) => _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(arg[0].target) ||
            arg[0].target.includes(this));
        this.#isLoaded = false;
        this.#template = document.createElement('template');
        this.#root = _context_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getRoot(this) ?? document;
        this.#_action = {
            ...this.#action,
            ...this.#plugin.reduce((...arg) => {
                return {
                    ...arg[0],
                    ...arg[1].plugin.action
                };
            }, {}),
            ...this.action
        };
        this.querySelectorAll('script[data-sce-arg]').forEach((...arg) => {
            try {
                this[arg[0].dataset['sceArg']] = JSON.parse(arg[0].innerText);
            }
            catch (e) {
                console.error(e);
            }
        });
        for (const action in this.#_action) {
            this.#_action[action].forEach((...arg) => { arg[0].callback = arg[0].callback.bind(this); });
        }
        _context_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].popRoot(this);
    }
    /** `Component`가 할당 될 때 실행한다. */
    async init() { }
    /** `rendering`이후 실행 할 `callback` */
    afterRender() { }
    /** 화면에 `render`할 html 문자열을 반환한다. */
    render() { }
    /** 화면을 `render`한다. */
    #render() {
        let node;
        this.#template.innerHTML = this.render() ?? '';
        node = this.#template.content.cloneNode(true);
        node.querySelectorAll('*').forEach((...arg) => {
            if (customElements.get(arg[0].localName)) {
                _context_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].setRoot(arg[0], this);
            }
        });
        this.el.innerHTML = null;
        this.#setCss();
        this.el.appendChild(node);
        this.eventInit();
        this.#plugin.forEach((...arg) => { arg[0].plugin.afterRender(this); });
        this.afterRender();
    }
    #setCss() {
        if (this.shadowRoot) {
            const style = document.createElement('style');
            style.textContent = this.css;
            this.shadowRoot.appendChild(style);
        }
    }
    /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
    destroy() { }
    /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
    #destroy() {
        this.destroy();
        this.#plugin.forEach((...arg) => { arg[0].plugin.destroy(this); });
        this.eventDestroy();
    }
    /** `arg`를 `state`로 갖는 `State`객체를 반환한다. */
    setState(state) {
        return new _state_mjs__WEBPACK_IMPORTED_MODULE_3__["default"](state, () => {
            this.#destroy();
            this.#render();
        });
    }
    /** 현재 페이지의 `URLSearchParams`객체를 반환한다. */
    getParams() { return new URLSearchParams(location.search); }
    /** `Component`가 `connected`될 때 실행할 `callback` */
    connectedCallback() {
        this.init()
            .then(() => {
            this.#render();
            this.#isLoaded = true;
        });
    }
    /** `Component`가 `disconnected`될 때 실행할 `callback` */
    disconnectedCallback() {
        if (this.#isLoaded) {
            this.#destroy();
        }
    }
    /** `Component`가 새로운 `document`로 이동되었을 때 실행할 `callback` */
    adoptedCallback() { }
    /** `Component`의 `observedAttributes`가 변경 될 때 실행할 `callback` */
    attributeChangedCallback(target, oldValue, newValue) {
        if (this.#isLoaded) {
            this.updateAttribute(target, oldValue, newValue);
            this.#destroy();
            this.#render();
        }
    }
    /** `Component`의 `attributeChangedCallback`가 실행 될 때 실행 할 `callback` */
    updateAttribute(target, oldValue, newValue) { }
    /** `Component`에 정의한 `eventListener`들을 `add`한다. */
    eventInit() { }
    /** `Component`에 정의한 `eventListener`들을 `add`한다. */
    #eventInit() {
        for (const action in this.#_action) {
            this.el.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((...arg) => {
                this.#_action[action].forEach((..._arg) => {
                    if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(_arg[0].event)) {
                        arg[0].dataset['sceEvent']?.split(' ').forEach((...__arg) => {
                            if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(__arg[0])) {
                                arg[0].addEventListener(__arg[0], _arg[0].callback, _arg[0].option);
                            }
                        });
                    }
                    else {
                        arg[0].addEventListener(_arg[0].event, _arg[0].callback, _arg[0].option);
                    }
                });
            });
        }
    }
    /** `Component`에 정의한 `eventListener`들을 `remove`한다. */
    eventDestroy() { }
    /** `Component`에 정의한 `eventListener`들을 `remove`한다. */
    #eventDestroy() {
        for (const action in this.#_action) {
            this.el.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((...arg) => {
                this.#_action[action].forEach((..._arg) => {
                    if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(_arg[0].event)) {
                        arg[0].dataset['sceEvent']?.split(' ').forEach((...__arg) => {
                            if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(__arg[0])) {
                                arg[0].removeEventListener(__arg[0], _arg[0].callback, _arg[0].option);
                            }
                        });
                    }
                    else {
                        arg[0].removeEventListener(_arg[0].event, _arg[0].callback, _arg[0].option);
                    }
                });
            });
        }
    }
    /**
     * Event.preventDefault를 실행 한다.
     *
     * ```
     * <input type="radio" data-sce-action="prevent-default" data-sce-event="click">
     * ```
     * #data-sce-event - 이벤트 #separator: `' '`
     */
    #preventDefault(ev) { ev.preventDefault(); }
    /**
     * Event.stopPropagation를 실행 한다.
     *
     * ```
     * <button type="button" data-sce-action="stop-propagation" data-sce-event="click"> 버튼 </button>
     * ```
     * #data-sce-event - 이벤트 #separator: `' '`
     */
    #stopPropagation(ev) { ev.stopPropagation(); }
    /** `data-sce-action="sub-select"`이후 실행 할 `callback` */
    async afterSubSelect(ev) { }
    /**
     * ```
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
     * ```
     */
    #subSelect(ev) {
        const node = ev.currentTarget, subSelect = this.el.querySelectorAll(`select[data-sce-name="${node.dataset['sceTarget']}"]`);
        subSelect.forEach(async (...arg) => {
            arg[0].querySelectorAll('option').forEach((..._arg) => {
                if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(_arg[0].value)) {
                    _arg[0].style.setProperty('display', (node.value == _arg[0].dataset['sceMain']) ? 'block' : 'none');
                }
            });
            arg[0].value = '';
            await this.afterSubSelect(ev);
            arg[0].dispatchEvent(new Event('change'));
        });
    }
    /** `data-sce-action="check-all"`이후 실행 할 `callback` */
    async afterCheckAll(ev) { }
    /**
     * ```
     * <input type="checkbox" data-sce-action="check-all" data-sce-target="[target-data-sce-name]">
     * <input type="checkbox" data-sce-name="[target-data-sce-name]">
     * <input type="checkbox" data-sce-name="[target-data-sce-name]">
     * ```
     */
    async #checkAll(ev) {
        const node = ev.currentTarget;
        this.el.querySelectorAll(`input[type="checkbox"][data-sce-name='${node.dataset['sceTarget']}']`).forEach((...arg) => { arg[0].checked = node.checked; });
        await this.afterCheckAll(ev);
    }
    #numberOnlyKeydown(ev) {
        const node = ev.currentTarget;
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (ev.keyCode == 229) {
            node.event_key_code = ev.keyCode;
            node.prev_value = node.value;
            node.prev_selection = node.selectionStart;
        }
        else {
            delete node.event_key_code;
            delete node.prev_value;
            delete node.prev_selection;
        }
    }
    #numberOnlyInput(ev) {
        const node = ev.currentTarget;
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (node.event_key_code == 229) {
            if (!ev.isComposing) {
                node.value = node.prev_value;
                node.selectionStart = node.prev_selection;
            }
            else {
                delete node.event_key_code;
                delete node.prev_value;
                delete node.prev_selection;
            }
        }
        if (ev.data != null) {
            const regex = {
                A: /[\d]/,
                B: /[\d\.\-]/,
                C: /[\d\.]/
            };
            if (!regex[node.dataset['sceType'] ?? 'A'].test(ev.data) &&
                !_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.selectionStart)) {
                node.selectionStart -= 1;
            }
        }
        this.#numberOnly(ev);
    }
    #numberOnlyBlur(ev) { this.#numberOnly(ev); }
    /**
     * ```
     * <input type="text" data-sce-action="number-only" data-sce-type="A">
     * <input type="text" data-sce-action="number-only" data-sce-type="A" data-sce-min="0" data-sce-max="100">
     * <input type="text" data-sce-action="number-only" data-sce-type="B">
     * <input type="text" data-sce-action="number-only" data-sce-type="C">
     * <input type="text" data-sce-action="number-only" data-sce-type="C" data-sce-decimal="2">
     * ```
     * #data-sce-min 최소값
     * optional
     *
     * #data-sce-max 최대값
     * optional
     *
     * #data-sce-type  \
     * `A`: 숫자만 허용  \
     * `B`: 소숫점 및 음수 허용  \
     * `C`: #,###.# 형식으로 변환
     *
     * #data-sce-decimals 소숫점 아래 자리 수  \
     * defalut: `0`
     */
    #numberOnly(ev) {
        const node = ev.currentTarget, type = node.dataset['sceType'] ?? 'A', min = node.dataset['sceMin'], max = node.dataset['sceMax'], regex = {
            A: /[^\d]/g,
            B: /[^\d\.\-]/g,
            C: /[^\d]/g
        };
        let selection = node.selectionStart, decimal;
        if (type == 'C') {
            const value = node.value.split('.');
            selection = node.selectionStart - [...node.value.matchAll(/,/g)].length;
            node.value = value[0];
            decimal = value.filter((...arg) => arg[1] > 0).join('').substring(0, parseInt(node.dataset['sceDecimal'] ?? '0'));
            decimal = `${!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(decimal) ? '.' : ''}${decimal}`;
        }
        node.value = node.value.replace(regex[type], '');
        if (type == 'C') {
            if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.value) ||
                !_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(decimal)) {
                const num = parseInt(node.value || '0');
                node.value = `${_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.numberFormat(num)}${decimal}`;
                selection += [...node.value.matchAll(/,/g)].length;
            }
        }
        if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(min) ||
            _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(max)) {
            let flag = false, value, num;
            if (type == 'C') {
                value = Number(node.value.replace(/,/g, ''));
            }
            else {
                value = Number(node.value);
            }
            if (!flag &&
                _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(min)) {
                if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.value) ||
                    value < Number(min)) {
                    num = Number(min);
                    flag = true;
                }
            }
            if (!flag &&
                _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(max) &&
                value > Number(max)) {
                num = Number(max);
                flag = true;
            }
            if (flag) {
                let _value;
                if (type == 'C') {
                    _value = _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.numberFormat(num, parseInt(node.dataset['sceDecimal'] ?? '0'));
                }
                else {
                    _value = `${num}`;
                }
                selection -= node.value.length - _value.length;
                node.value = _value;
            }
        }
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(node.selectionEnd)) {
            node.selectionEnd = selection;
        }
    }
    /** `data-sce-action="check"`이후 실행 할 `callback` */
    async afterCheck(ev) { }
    /**
     * ```
     * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]">
     * <input type="hidden" value="N" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
     *
     * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]" checked>
     * <input type="hidden" value="Y" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
     * ```
     */
    async #check(ev) {
        const node = ev.currentTarget, target = this.el.querySelector(`input[data-sce-name="${node.dataset['sceTarget']}"]`);
        target.value = node.checked ? target.dataset['sceTrue'] : target.dataset['sceFalse'];
        await this.afterCheck(ev);
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _util_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    /**
     * 값이 비어있는지 확인한다.
     *
     * ```
     * // returns true
     * empty(undefined);
     * empty(null);
     * empty(0);
     * empty('');
     * empty([]);
     * empty({});
     * ```
     */
    static empty(
    /** 확인할 값 */ arg) {
        let result = [undefined, null, 0, ''].includes(arg);
        if (!result) {
            if (arg.constructor == Object) {
                result = Object.keys(arg).length == 0 &&
                    Object.keys(Object.getPrototypeOf(arg)).length == 0;
            }
            else if (arg.constructor == NodeList) {
                result = arg.length == 0;
            }
            else if (Array.isArray(arg)) {
                result = arg.length == 0;
            }
        }
        return result;
    }
    /**
     * 값이 숫자인지 확인한다.
     *
     * ```
     * // returns true
     * isNumber(1);
     * isNumber('1');
     *
     * // returns false
     * isNumber('test');
     * isNumber('1', true);
     * ```
     */
    static isNumber(
    /** 확인할 값 */ arg, 
    /** `true`일 경우 `arg`의 `type`도 확인 | #default `false` */ strict = false) {
        let result = !Number.isNaN(Number(arg)) &&
            ['number', 'string'].includes(typeof arg) &&
            !/^\s*$/.test(`${arg}`);
        if (result &&
            strict) {
            result = typeof arg == 'number';
        }
        return result;
    }
    /**
     * 해당 값이 객체인지 확인
     *
     * ```
     * // returns true
     * isObject({});
     *
     * // returns false
     * isObject(undefined);
     * isObject(null);
     * isObject(0);
     * isObject('');
     * isObject([]);
     * ```
     */
    static isObject(
    /** 확인할 값 */ arg) { return arg?.constructor == Object; }
    /**
     * 천 단위 마다 그룹화 된 숫자 형식으로 변환한 문자열을 반환 한다.
     *
     * ```
     * // returns '1,000'
     * numberFormat(1000);
     * numberFormat(1000.01);
     *
     * // returns '1,000.0'
     * numberFormat(1000.01, 1);
     *
     * // returns '1,000 0'
     * numberFormat(1000.01, 1, ' ');
     *
     * // returns '1.000 0'
     * numberFormat(1000.01, 1, ' ', '.');
     * ```
     */
    static numberFormat(
    /** 변환할 숫자 - `number` 타입이 아닌경우 `null` 반환 */ num, 
    /** 소숫점 아래 자리 수 - `number` 타입이 아닌경우 `null` 반환 | #default `0` */ decimals = 0, 
    /** 소수점 구분자 | #default `'.'` */ decimalSeparator = '.', 
    /** 천 단위 구분자 | #default `','` */ thousandsSeparator = ',') {
        if (!Util.isNumber(num, true) &&
            !Util.isNumber(decimals, true)) {
            return null;
        }
        const result = String(num).split('.');
        result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        if (!Util.empty(result[1])) {
            result[1] = result[1].substring(0, decimals);
        }
        return (!Util.empty(result[1])) ? result[0].concat(decimalSeparator, result[1]) : result[0];
    }
    /**
     * 주어진 포맷에 따라 `Date`객체를 문자열로 변환
     *
     * ```
     * const date = new Date(2022, 9, 27);
     *
     * // returns '2022-10-27'
     * strftime(date, '%Y-%m-%d');
     *
     * // returns '2022/10/27'
     * strftime(date, '%Y/%m/%d');
     * ```
     *
     * `%a`: 요일을 축약된 이름으로 - Sun, Mon, …, Sat  \
     * `%A`: 요일을 전체 이름으로 - Sunday, Monday, …, Saturday  \
     * `%d`: 월중 일(day of the month)을 0으로 채워진 10진수로 - 01, 02, …, 31  \
     * `%b`: 월을 축약된 이름으로 - Jan, Feb, …, Dec  \
     * `%B`: 월을 전체 이름으로 - January, February, …, December  \
     * `%m`: 월을 0으로 채워진 10진수로 - 01, 02, …, 12  \
     * `%y`: 세기가 없는 해(year)를 0으로 채워진 10진수로 - 00, 01, …, 99  \
     * `%Y`: 세기가 있는 해(year)를 10진수로 - 0001, 0002, …, 2013, 2014, …, 9998, 9999  \
     * `%H`: 시(24시간제)를 0으로 채워진 십진수로 - 00, 01, …, 23  \
     * `%I`: 시(12시간제)를 0으로 채워진 십진수로 - 01, 02, …, 12  \
     * `%p`: 오전이나 오후에 해당하는 것 - AM, PM  \
     * `%M`: 분을 0으로 채워진 십진수로 - 00, 01, …, 59  \
     * `%S`: 초를 0으로 채워진 10진수로 - 00, 01, …, 59  \
     * `%%`: 리터럴 '%' 문자 - %
     */
    static strftime(
    /** 변환할 `Date`객체 */ date, 
    /** 변활할 포맷 문자열 */ format) {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        format = format.replace(/(%{1})/g, '\\$1');
        format = format.replace(/(\\%){2}/g, '%');
        format = format.replace(/\\%Y/g, String(date.getFullYear()));
        format = format.replace(/\\%y/g, String(date.getFullYear()).replace(/^\d+(\d{2})$/, '$1'));
        format = format.replace(/\\%B/g, month[date.getMonth()]);
        format = format.replace(/\\%b/g, month[date.getMonth()].replace(/^(\w{3})\w*$/, '$1'));
        format = format.replace(/\\%m/g, String(date.getMonth() + 1).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%d/g, String(date.getDate()).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%A/g, week[date.getDay()]);
        format = format.replace(/\\%a/g, week[date.getDay()].replace(/^(\w{3})\w*$/, '$1'));
        format = format.replace(/\\%H/g, String(date.getHours()).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%I/g, String((date.getHours() > 12) ? (date.getHours() - 12) : date.getHours()).replace(/^0$/, '12').replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%p/g, (date.getHours() < 12) ? 'AM' : 'PM');
        format = format.replace(/\\%M/g, String(date.getMinutes()).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%S/g, String(date.getSeconds()).replace(/^(\d{1})$/, '0$1'));
        return format;
    }
    /**
     * 유효한 날짜인지 확인
     *
     * ```
     * // returns true
     * checkdate(2022, 10, 28);
     *
     * // returns false
     * checkdate(2022, 10, 32);
     * ```
     */
    static checkdate(
    /** 년 */ year, 
    /** 월 */ month, 
    /** 일 */ day) {
        const date = new Date(year, (month - 1), day);
        return date.getFullYear() == year &&
            (date.getMonth() + 1) == month &&
            date.getDate() == day;
    }
    /**
     * 같은 날짜인지 비교
     *
     * ```
     * const date1 = new Date();
     * const date2 = new Date();
     *
     * // returns true
     * equaldate(date1);
     * equaldate(date1, date2);
     *
     * // returns false
     * date1.setDate(date1.getDate() + 1);
     * date2.setDate(date2.getDate() + 2);
     * equaldate(date1);
     * equaldate(date1, date2);
     * ```
     */
    static equaldate(
    /** 기준 날짜 */ date1, 
    /** 비교할 날짜 | #default `new Date()` */ date2 = new Date()) { return Util.strftime(date1, '%Y-%m-%d') == Util.strftime(date2, '%Y-%m-%d'); }
    /**
     * Date객체에서 해당 하는 요일을 반환한다.
     *
     * ```
     * const date = new Date(2022, 9, 27);
     *
     * // returns '목요일'
     * getWeek(date);
     *
     * // returns '목'
     * getWeek(date, false);
     * ```
     */
    static getWeek(
    /** 요일을 반환할 `Date` 객체 */ date, 
    /** 해당 요일의 약어반환 대한 구분 값 `false`일 경우 약어 반환 | #default `true` */ flag = true) {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], result = week[date.getDay()];
        return (flag) ? result : result.replace(/^([ㄱ-ㅎㅏ-ㅣ가-힣]{1})[ㄱ-ㅎㅏ-ㅣ가-힣]+$/, '$1');
    }
    /**
     * `Date`객체에 `interval`를 더한 값을 반환한다.
     *
     * ```
     * const date = new Date(2022, 8, 27);
     *
     * // returns '2022-10-28'
     * strftime(util.addDate(date, {month: 1, day: 1}), '%Y-%m-%d');
     * ```
     */
    static addDate(
    /** 기준 `Date`객체 */ date, 
    /** `Date`객체에 계산할 `interval` */ interval) {
        return new Date(date.getFullYear() + (Util.isNumber(interval.year, true) ? interval.year : 0), date.getMonth() + (Util.isNumber(interval.month, true) ? interval.month : 0), date.getDate() + (Util.isNumber(interval.day, true) ? interval.day : 0), date.getHours() + (Util.isNumber(interval.hour, true) ? interval.hour : 0), date.getMinutes() + (Util.isNumber(interval.minute, true) ? interval.minute : 0), date.getSeconds() + (Util.isNumber(interval.second, true) ? interval.second : 0), date.getMilliseconds() + (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0));
    }
    /**
     * `Date`객체에 `interval`를 뺀 값을 반환한다.
     *
     * ```
     * const date = new Date(2022, 8, 27);
     *
     * // returns '2022-08-26'
     * strftime(util.subDate(date, {month: 1, day: 1}), '%Y-%m-%d');
     * ```
     */
    static subDate(
    /** 기준 `Date`객체 */ date, 
    /** `Date`객체에 계산할 `interval` */ interval) {
        return new Date(date.getFullYear() - (Util.isNumber(interval.year, true) ? interval.year : 0), date.getMonth() - (Util.isNumber(interval.month, true) ? interval.month : 0), date.getDate() - (Util.isNumber(interval.day, true) ? interval.day : 0), date.getHours() - (Util.isNumber(interval.hour, true) ? interval.hour : 0), date.getMinutes() - (Util.isNumber(interval.minute, true) ? interval.minute : 0), date.getSeconds() - (Util.isNumber(interval.second, true) ? interval.second : 0), date.getMilliseconds() - (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0));
    }
    /**
     * xor 비교
     *
     * ```
     * // returns true
     * xor(true, false);
     * xor(false, true);
     *
     * // returns false
     * xor(true, true);
     * xor(false, false);
     * ```
     */
    static xor(
    /** 비교할 값 1 */ arg1, 
    /** 비교할 값 2 */ arg2) {
        return !(arg1 && arg2) &&
            (arg1 || arg2);
    }
    /**
     * `FormDate`객체에 설정된 값을 `json`문자열로 반환 한다.
     *
     * ```
     * const data = new FormData();
     *
     * data.append('key', value);
     *
     * const json = formDataToJson(data);
     * ```
     */
    static formDataToJson(
    /** `json`문자열로 반환할 `FormData`객체 */ formData) {
        return JSON.stringify(Object.fromEntries([...new Set(formData.keys())].map((...arg) => [
            arg[0],
            (formData.getAll(arg[0]).length > 1)
                ? formData.getAll(arg[0])
                : formData.get(arg[0])
        ])));
    }
    /**
     * 기준 숫자의 백분율 값을 적용했을 경우의 값을 반환한다.
     *
     * ```
     * // returns 10
     * percentage(100, 10);
     * ```
     */
    static percentage(
    /** 기준 숫자 */ num, 
    /** 백분율 */ per) { return num * (per / 100); }
    /**
     * 기준 숫자의 비율 대비 값을 반환한다.
     *
     * ```
     * // returns 8
     * // 1 : 2 = 4 : x
     * ratio([1, 2], 4);
     *
     * // returns 2
     * // 1 : 2 = x : 4
     * ratio([1, 2], 4, false);
     * ```
     */
    static ratio(
    /** 비율 */ ratio, 
    /** 기준 숫자 */ num, 
    /** 비율 적용 기준 | #default `true` */ flag = true) {
        const index = flag
            ? [1, 0]
            : [0, 1];
        return (num * ratio[index[0]]) / ratio[index[1]];
    }
    /**
     * `x` 번째의 항이 `a`이고 공차가 `d`인 등차수열의 `n` 번째 항을 반환 한다.
     */
    static arithmeticSequence(
    /** 기준 항 */ a, 
    /** 기준 위치 `x > 0`인 정수 */ x, 
    /** 공차 */ d, 
    /** 반환 위치 */ n) { return a + ((n - x) * d); }
    /**
     * `x` 번째의 항이 `a`이고 공비가 `r`인 등비수열의 `n` 번째 항을 반환 한다.
     */
    static geometricSequence(
    /** 기준 항 */ a, 
    /** 기준 위치 `x > 0`인 정수 */ x, 
    /** 공비 */ r, 
    /** 반환 위치 */ n) { return (a / (r ** (x - 1))) * (r ** (n - 1)); }
    /**
     * `value`를 반올림(round), 내림(floor), 올림(ceil) 한 값을 반환한다.
     */
    static decimalAdjust(
    /** 구분 기준 `반올림(round)`, `내림(floor)`, `올림(ceil)` */ type, 
    /** 기준 값 */ value, 
    /** 소숫점 아래 자리 수 | #default `0` */ exp = 0) {
        const [m, n = '0'] = value.toString().split('e'), adjustValue = Math[type](Number(`${m}e${parseInt(n) + exp}`)), [nm, nn = '0'] = adjustValue.toString().split('e');
        return Number(`${nm}e${parseInt(nn) - exp}`);
    }
    /**
     * html entity를 인코딩 한다.
     */
    static encodeHtmlEntity(
    /** html entity를 인코딩 할 문자열 */ arg) {
        const textarea = document.createElement('textarea');
        textarea.innerText = arg;
        return textarea.innerHTML;
    }
    /**
     * html entity를 디코딩 한다.
     */
    static decodeHtmlEntity(
    /** html entity를 디코딩 할 문자열 */ arg) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = arg;
        return textarea.innerText;
    }
    /**
     * `Object`의 `deepCopy`를 반환 한다.
     */
    static copy(
    /** `deepCopy`할 `object` */ arg) {
        if (Util.isObject(arg)) {
            const result = {};
            for (const i in arg) {
                result[i] = Util.copy(arg[i]);
            }
            return result;
        }
        else if (Array.isArray(arg)) {
            const result = [];
            for (const i of arg) {
                result.push(Util.copy(i));
            }
            return result;
        }
        else {
            return arg;
        }
    }
    /**
     * `sNum` <= x <= `eNum` 범위의 배열을 반환한다.
     */
    static numRange(
    /** 시작 값 */ sNum, 
    /** 종료 값 */ eNum) {
        let range = (eNum - sNum);
        const flag = (range > 0);
        range = Math.abs(range) + 1;
        return [...new Array(range)].map((...arg) => (arg[1] * ((flag) ? 1 : -1)) + sNum);
    }
    /**
     * `size`를 크기로 하는 `chunk`를 담은 배열을 반환한다.
     */
    static arrayChunk(
    /** 기준 배열 */ arr, 
    /** `chunk`의 크기 (`size > 0`인 정수) */ size) {
        if (!Util.isNumber(size, true)) {
            throw new TypeError("size는 숫자 타입 이어야 합니다.");
        }
        if (size <= 0 &&
            Number.isInteger(size)) {
            throw new RangeError("size는 0보다 큰 정수여야 합니다.");
        }
        const _arr = [];
        Util.numRange(0, Util.decimalAdjust('ceil', arr.length / size) + ((arr.length > 0) ? -1 : 0))
            .forEach((...arg) => { _arr.push(arr.slice(arg[0] * size, (arg[0] + 1) * size)); });
        return _arr;
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Context)
/* harmony export */ });
class Context {
    static #root;
    /** `Component`의 `root`로 사용할 `Component`를 `root`설정을 위한 배열에 담는다.  */
    static setRoot(el, root) { Context.#root = [...(Context.#root ?? []), [el, root]]; }
    /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 반환한다.  */
    static getRoot(el) { return Context.#root?.find((...arg) => arg[0][0] == el)[1] ?? null; }
    /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 `root`설정을 위한 배열에서 제거한다.  */
    static popRoot(el) { Context.#root = Context.#root?.filter((...arg) => arg[0][0] != el); }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Plugin)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class Plugin {
    /** `SceComponent`에 사용할 `plugin` 배열 객체 */
    static #plugin = [];
    /** `SceComponent`에 사용할 `plugin` 배열 객체 */
    static get plugin() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(Plugin.#plugin); }
    /** `SceComponent`에 사용할 `plugin`을 추가 한다.  */
    static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ State)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class State {
    #state;
    #callback;
    /** `target`을 수정한다.  */
    constructor(state, callback) {
        this.#state = _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(state);
        this.#callback = callback;
    }
    /** `target`을 수정한다.  */
    set(...arg) {
        if ((arg.length > 0) && (arg.length <= 2)) {
            switch (arg.length) {
                case 1: {
                    const [newValue] = arg;
                    this.#state = newValue;
                    break;
                }
                case 2: {
                    const [key, newValue] = arg;
                    this.#state[key] = newValue;
                    break;
                }
            }
            this.#callback();
        }
        else {
            throw new Error('param 개수 범위 초과');
        }
    }
    /** `target`을 반환한다. */
    get(arg) {
        if (arg == undefined) {
            return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(this.#state ?? null);
        }
        else {
            return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.copy(this.#state[arg] ?? null);
        }
    }
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Register)
/* harmony export */ });
class Register {
    /** `customElement.define`을 실행 시 사용할 `element` */
    get element() { return []; }
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
        this.element.forEach((...arg) => { customElements.define(arg[0].tagName, arg[0].element); });
    }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* reexport safe */ _component_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   JUtil: () => (/* reexport safe */ _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_3__.JUtil),
/* harmony export */   Plugin: () => (/* reexport safe */ _plugin_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Register: () => (/* reexport safe */ _register_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _component_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _plugin_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _register_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);






})();

simpleCustomElement = __webpack_exports__;
/******/ })()
;