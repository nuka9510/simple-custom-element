import SceContext from "./context.js";
import ScePlugin from "./plugin.js";
import SceState from "./state.js";
import SceUtil from "./util.js";

/** @extends {HTMLElement} */
export default class SceElement extends HTMLElement {
  /** @type {sce_element.SceElement['_plugin']} */
  #plugin;

  /** @type {sce_element.SceElement['_isLoaded']} */
  #isLoaded;

  /** @type {sce_element.SceElement['_template']} */
  #template;

  /** @type {sce_element.SceElement['_root']} */
  #root;

  /** @type {sce_element.SceElement['__action']} */
  #_action;

  /** @type {sce_element.SceElement['_action']} */
  get #action() { return {
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
  }; };

  /** @type {sce_element.SceElement['action']} */
  get action() { return {}; };

  /** @type {sce_element.SceElement['isLoaded']} */
  get isLoaded() { return this.#isLoaded; }

  /** @type {sce_element.SceElement['root']} */
  get root() { return this.#root; }

  /** @type {sce_element.SceElement['observedAttributes']} */
  static get observedAttributes() { return []; }

  /** @type {sce_element.Constructor} */
  constructor() {
    super();

    this.#plugin = ScePlugin.plugin.filter(
      (...arg) => SceUtil.empty(arg[0].target) ||
                  arg[0].target.includes(this)
    );
    this.#isLoaded = false;
    this.#template = document.createElement('template');
    this.#root = SceContext.getRoot(this) ?? document;
    this.#_action = {
      ...this.#action,
      ...this.#plugin.reduce(
        (...arg) => {
          return {
            ...arg[0],
            ...arg[1].plugin.action
          };
        }, {}
      ),
      ...this.action
    };

    this.querySelectorAll('script[data-sce-arg]').forEach((...arg) => {
      try {
        this[arg[0].dataset.sceArg] = JSON.parse(arg[0].innerText);
      } catch (e) { console.error(e); }
    });

    for (const action in this.#_action) {
      this.#_action[action].forEach((...arg) => { arg[0].callback = arg[0].callback.bind(this); });
    }

    SceContext.popRoot(this);
  }

  /** @type {sce_element.SceElement['init']} */
  async init() {}

  /** @type {sce_element.SceElement['afterRender']} */
  afterRender() {}

  /** @type {sce_element.SceElement['render']} */
  render() {}

  /** @type {sce_element.SceElement['_render']} */
  #render() {
    /** @type {DocumentFragment} */
    let node;

    this.#template.innerHTML = this.render();

    node = this.#template.content.cloneNode(true);

    node.querySelectorAll('*').forEach((...arg) => {
      if (customElements.get(arg[0].localName)) { SceContext.setRoot(arg[0], this); }
    });

    this.innerHTML = null;
    this.appendChild(node);
    this.#addEvent();
    this.#plugin.forEach((...arg) => { arg[0].plugin.afterRender(this); });
    this.afterRender();
  }

  /** @type {sce_element.SceElement['destroy']} */
  destroy() {}

  /** @type {sce_element.SceElement['_destroy']} */
  #destroy() {
    this.destroy();
    this.#plugin.forEach((...arg) => { arg[0].plugin.destroy(this); });
    this.#removeEvent();
  }

  /** @type {sce_element.SceElement['setState']} */
  setState(state) {
    return new SceState(
      state,
      () => {
        this.#destroy();
        this.#render();
      }
    );
  }

  /** @type {sce_element.SceElement['getParams']} */
  getParams() { return new URLSearchParams(location.search); }

  /** @type {sce_element.SceElement['connectedCallback']} */
  connectedCallback() {
    this.init()
        .then(() => {
          this.#render();

          this.#isLoaded = true;
        });
  }

  /** @type {sce_element.SceElement['disconnectedCallback']} */
  disconnectedCallback() {
    if (this.#isLoaded) { this.#destroy(); }
  }

  /** @type {sce_element.SceElement['adoptedCallback']} */
  adoptedCallback() { }

  /** @type {sce_element.SceElement['attributeChangedCallback']} */
  attributeChangedCallback(target, oldValue, newValue) {
    if (this.#isLoaded) {
      this.updateAttribute(target, oldValue, newValue);
      this.#destroy();
      this.#render();
    }
  }

  /** @type {sce_element.SceElement['updateAttribute']} */
  updateAttribute(target, oldValue, newValue) {}

  /** @type {sce_element.SceElement['_addEvent']} */
  #addEvent() {
    for (const action in this.#_action) {
      this.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((...arg) => {
        this.#_action[action].forEach((..._arg) => {
          if (SceUtil.empty(_arg[0].event)) {
            arg[0].dataset.sceEvent?.split(' ').forEach((...__arg) => {
              if (!SceUtil.empty(__arg[0])) { arg[0].addEventListener(__arg[0], _arg[0].callback, _arg[0].option); }
            });
          } else { arg[0].addEventListener(_arg[0].event, _arg[0].callback, _arg[0].option); }
        });
      });
    }
  }

  /** @type {sce_element.SceElement['_removeEvent']} */
  #removeEvent() {
    for (const action in this.#_action) {
      this.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((...arg) => {
        this.#_action[action].forEach((..._arg) => {
          if (SceUtil.empty(_arg[0].event)) {
            arg[0].dataset.sceEvent?.split(' ').forEach((...__arg) => {
              if (!SceUtil.empty(__arg[0])) { arg[0].removeEventListener(__arg[0], _arg[0].callback, _arg[0].option); }
            });
          } else { arg[0].removeEventListener(_arg[0].event, _arg[0].callback, _arg[0].option); }
        });
      });
    }
  }

  /** @type {sce_element.SceElement['_preventDefault']} */
  #preventDefault(ev) { ev.preventDefault(); }

  /** @type {sce_element.SceElement['_stopPropagation']} */
  #stopPropagation(ev) { ev.stopPropagation(); }

  /** @type {sce_element.SceElement['afterSubSelect']} */
  async afterSubSelect(ev) {}

  /** @type {sce_element.SceElement['_subSelect']} */
  #subSelect(ev) {
    /** @type {HTMLSelectElement} */
    const node = ev.currentTarget,
    /** @type {NodeListOf<HTMLSelectElement>} */
    subSelect = this.querySelectorAll(`select[data-sce-name="${node.dataset.sceTarget}"]`);

    subSelect.forEach(async (...arg) => {
      arg[0].querySelectorAll('option').forEach((..._arg) => {
        if (!SceUtil.empty(_arg[0].value)) { _arg[0].style.setProperty('display', (node.value == _arg[0].dataset.sceMain) ? 'block' : 'none'); }
      });

      arg[0].value = '';

      await this.afterSubSelect(ev);

      arg[0].dispatchEvent(new Event('change'));
    });
  }

  /** @type {sce_element.SceElement['afterCheckAll']} */
  async afterCheckAll(ev) {}

  /** @type {sce_element.SceElement['_checkAll']} */
  async #checkAll(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget;

    this.querySelectorAll(`input[type="checkbox"][data-sce-name='${node.dataset.sceTarget}']`).forEach((...arg) => { arg[0].checked = node.checked; });

    await this.afterCheckAll(ev);
  }

  /** @type {sce_element.SceElement['_numberOnlyKeydown']} */
  #numberOnlyKeydown(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget;

    /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
    if (ev.keyCode == 229) {
      node.event_key_code = ev.keyCode;
      node.prev_value = node.value;
      node.prev_selection = node.selectionStart;
    } else {
      delete node.event_key_code;
      delete node.prev_value;
      delete node.prev_selection;
    }
  }

  /** @type {sce_element.SceElement['_numberOnlyInput']} */
  #numberOnlyInput(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget;

    /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
    if (node.event_key_code == 229) {
      if (!ev.isComposing) {
        node.value = node.prev_value;
        node.selectionStart = node.prev_selection;
      } else {
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

      if (
        !regex[node.dataset.sceType ?? 'A'].test(ev.data) &&
        !SceUtil.empty(node.selectionStart)
      ) { node.selectionStart -= 1; }
    }

    this.#numberOnly(ev);
  }

  /** @type {sce_element.SceElement['_numberOnlyBlur']} */
  #numberOnlyBlur(ev) { this.#numberOnly(ev); }

  /** @type {sce_element.SceElement['_numberOnly']} */
  #numberOnly(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget,
    type = node.dataset.sceType ?? 'A',
    min = node.dataset.sceMin,
    max = node.dataset.sceMax,
    regex = {
      A: /[^\d]/g,
      B: /[^\d\.\-]/g,
      C: /[^\d]/g
    };

    let selection = node.selectionStart,
    /** @type {string | undefined} */
    decimal;

    if (type == 'C') {
      const value = node.value.split('.');

      selection = node.selectionStart - [...node.value.matchAll(/,/g)].length;

      node.value = value[0];

      decimal = value.filter((...arg) => arg[1] > 0).join('').substring(0, parseInt(node.dataset.sceDecimal ?? '0'));
      decimal = `${!SceUtil.empty(decimal) ? '.' : ''}${decimal}`;
    }

    node.value = node.value.replace(regex[type], '');

    if (type == 'C') {
      if (
        !SceUtil.empty(node.value) ||
        !SceUtil.empty(decimal)
      ) {
        const num = parseInt(node.value || '0');

        node.value = `${SceUtil.numberFormat(num)}${decimal}`;

        selection += [...node.value.matchAll(/,/g)].length;
      }
    }

    if (
      SceUtil.isNumber(min) ||
      SceUtil.isNumber(max)
    ) {
      let flag = false,
      /** @type {number} */
      value,
      /** @type {number} */
      num;

      if (type == 'C') {
        value = Number(node.value.replace(/,/g, ''));
      } else { value = Number(node.value); }

      if (
        !flag &&
        SceUtil.isNumber(min)
      ) {
        if (
          SceUtil.empty(node.value) ||
          value < Number(min)
        ) {
          num = Number(min);
          flag = true;
        }
      }

      if (
        !flag &&
        SceUtil.isNumber(max) &&
        value > Number(max)
      ) {
        num = Number(max);
        flag = true;
      }

      if (flag) {
        /** @type {string} */
        let _value;

        if (type == 'C') {
          _value = SceUtil.numberFormat(num, parseInt(node.dataset.sceDecimal ?? '0'));
        } else { _value = `${num}`; }

        selection -= node.value.length - _value.length;
        node.value = _value;
      }
    }

    if (!SceUtil.empty(node.selectionEnd)) { node.selectionEnd = selection; }
  }

  /** @type {sce_element.SceElement['afterCheck']} */
  async afterCheck(ev) {}

  /** @type {sce_element.SceElement['_check']} */
  async #check(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget,
    /** @type {HTMLInputElement} */
    target = this.querySelector(`input[data-sce-name="${node.dataset.sceTarget}"]`);

    target.value = node.checked ? target.dataset.sceTrue : target.dataset.sceFalse;

    await this.afterCheck(ev);
  }

}