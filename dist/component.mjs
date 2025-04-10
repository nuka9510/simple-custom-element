import { JUtil } from "@nuka9510/js-util";
import Context from "./context.mjs";
import Plugin from "./plugin.mjs";
import State from "./state.mjs";
export default class Component extends HTMLElement {
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
    /** `Component` `load` 여부 */
    get isLoaded() { return this.#isLoaded; }
    /** 현재 `Component`를 호출 한 `Document` 또는 `Component` 객체 */
    get root() { return this.#root; }
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
        this.#plugin = Plugin.plugin.filter((...arg) => JUtil.empty(arg[0].target) ||
            arg[0].target.includes(this));
        this.#isLoaded = false;
        this.#template = document.createElement('template');
        this.#root = Context.getRoot(this) ?? document;
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
        Context.popRoot(this);
    }
    /** `Component`가 할당 될 때 실행한다.  */
    async init() { }
    /** `rendering`이후 실행 할 `callback` */
    afterRender() { }
    /** 화면에 `render`할 html 문자열을 반환한다.  */
    render() { }
    /** 화면을 `render`한다.  */
    #render() {
        let node;
        this.#template.innerHTML = this.render() ?? '';
        node = this.#template.content.cloneNode(true);
        node.querySelectorAll('*').forEach((...arg) => {
            if (customElements.get(arg[0].localName)) {
                Context.setRoot(arg[0], this);
            }
        });
        this.innerHTML = null;
        this.appendChild(node);
        this.#addEvent();
        this.#plugin.forEach((...arg) => { arg[0].plugin.afterRender(this); });
        this.afterRender();
    }
    /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
    destroy() { }
    /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
    #destroy() {
        this.destroy();
        this.#plugin.forEach((...arg) => { arg[0].plugin.destroy(this); });
        this.#removeEvent();
    }
    /** `arg`를 `state`로 갖는 `State`객체를 반환한다.  */
    setState(state) {
        return new State(state, () => {
            this.#destroy();
            this.#render();
        });
    }
    /** 현재 페이지의 `URLSearchParams`객체를 반환한다.  */
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
    /** `Component`에 정의한 `eventListener`들을 `add`한다.  */
    #addEvent() {
        for (const action in this.#_action) {
            this.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((...arg) => {
                this.#_action[action].forEach((..._arg) => {
                    if (JUtil.empty(_arg[0].event)) {
                        arg[0].dataset['sceEvent']?.split(' ').forEach((...__arg) => {
                            if (!JUtil.empty(__arg[0])) {
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
    /** `Component`에 정의한 `eventListener`들을 `remove`한다.  */
    #removeEvent() {
        for (const action in this.#_action) {
            this.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((...arg) => {
                this.#_action[action].forEach((..._arg) => {
                    if (JUtil.empty(_arg[0].event)) {
                        arg[0].dataset['sceEvent']?.split(' ').forEach((...__arg) => {
                            if (!JUtil.empty(__arg[0])) {
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
        const node = ev.currentTarget, subSelect = this.querySelectorAll(`select[data-sce-name="${node.dataset['sceTarget']}"]`);
        subSelect.forEach(async (...arg) => {
            arg[0].querySelectorAll('option').forEach((..._arg) => {
                if (!JUtil.empty(_arg[0].value)) {
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
        this.querySelectorAll(`input[type="checkbox"][data-sce-name='${node.dataset['sceTarget']}']`).forEach((...arg) => { arg[0].checked = node.checked; });
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
                !JUtil.empty(node.selectionStart)) {
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
            decimal = `${!JUtil.empty(decimal) ? '.' : ''}${decimal}`;
        }
        node.value = node.value.replace(regex[type], '');
        if (type == 'C') {
            if (!JUtil.empty(node.value) ||
                !JUtil.empty(decimal)) {
                const num = parseInt(node.value || '0');
                node.value = `${JUtil.numberFormat(num)}${decimal}`;
                selection += [...node.value.matchAll(/,/g)].length;
            }
        }
        if (JUtil.isNumber(min) ||
            JUtil.isNumber(max)) {
            let flag = false, value, num;
            if (type == 'C') {
                value = Number(node.value.replace(/,/g, ''));
            }
            else {
                value = Number(node.value);
            }
            if (!flag &&
                JUtil.isNumber(min)) {
                if (JUtil.empty(node.value) ||
                    value < Number(min)) {
                    num = Number(min);
                    flag = true;
                }
            }
            if (!flag &&
                JUtil.isNumber(max) &&
                value > Number(max)) {
                num = Number(max);
                flag = true;
            }
            if (flag) {
                let _value;
                if (type == 'C') {
                    _value = JUtil.numberFormat(num, parseInt(node.dataset['sceDecimal'] ?? '0'));
                }
                else {
                    _value = `${num}`;
                }
                selection -= node.value.length - _value.length;
                node.value = _value;
            }
        }
        if (!JUtil.empty(node.selectionEnd)) {
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
        const node = ev.currentTarget, target = this.querySelector(`input[data-sce-name="${node.dataset['sceTarget']}"]`);
        target.value = node.checked ? target.dataset['sceTrue'] : target.dataset['sceFalse'];
        await this.afterCheck(ev);
    }
}
