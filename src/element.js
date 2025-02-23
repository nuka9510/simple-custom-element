import SceContext from "./context.js";
import SceState from "./state.js";
import SceUtil from "./util.js";

/** @extends {HTMLElement} */
export default class SceElement extends HTMLElement {
  /** @type {sce_element.SceElement['_util']} */
  #util;

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
      {
        event: 'change',
        callback: this.#subSelect
      }
    ],
    'check-all': [
      {
        event: 'click',
        callback: this.#checkAll,
        option: { capture: true }
      }
    ],
    'number-only': [
      {
        event: 'keydown',
        callback: this.#numberOnlyKeydown
      }, {
        event: 'input',
        callback: this.#numberOnlyInput
      }, {
        event: 'blur',
        callback: this.#numberOnlyBlur
      }
    ],
    'check': [
      {
        event: 'click',
        callback: this.#check
      }
    ]
  }; };

  /** @type {sce_element.SceElement['util']} */
  get util() { return this.#util; }

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

    this.#isLoaded = false;
    this.#template = document.createElement('template');
    this.#root = SceContext.getRoot(this) ?? document;
    this.#util = new SceUtil(this);

    this.querySelectorAll('script[data-sce-arg]').forEach((el, i, arr) => {
      try {
        this[el.dataset.sceArg] = JSON.parse(el.innerText);
      } catch (e) { console.error(e); }
    });

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
    /** @type {Node} */
    let node;

    this.#template.innerHTML = this.render();

    node = this.#template.content.cloneNode(true);

    node.querySelectorAll('*').forEach((el, i, arr) => {
      if (customElements.get(el.localName)) { SceContext.setRoot(el, this); }
    });

    this.innerHTML = null;
    this.appendChild(node);
    this.#addEvent();
    this.afterRender();
  }

  /** @type {sce_element.SceElement['destroy']} */
  destroy() {}

  /** @type {sce_element.SceElement['_destroy']} */
  #destroy() {
    this.destroy();
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
    this.#_action = {
      ...this.#action,
      ...this.action
    };

    for (const action in this.#_action) {
      this.#_action[action].forEach((a, i, arr) => { a.callback = a.callback.bind(this); });
    }

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
      this.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((el, i, arr) => {
        this.#_action[action].forEach((a, _i, _arr) => {
          if (this.#util.empty(a.event)) {
            el.dataset.sceEvent?.split(' ').forEach((e, __i, __arr) => {
              if (!this.#util.empty(e)) { el.addEventListener(e, a.callback, a.option); }
            });
          } else { el.addEventListener(a.event, a.callback, a.option); }
        });
      });
    }
  }

  /** @type {sce_element.SceElement['_removeEvent']} */
  #removeEvent() {
    for (const action in this.#_action) {
      this.querySelectorAll(`[data-sce-action~="${action}"]`).forEach((el, i, arr) => {
        this.#_action[action].forEach((a, _i, _arr) => {
          if (this.#util.empty(a.event)) {
            el.dataset.sceEvent?.split(' ').forEach((e, __i, __arr) => {
              if (!this.#util.empty(e)) { el.removeEventListener(e, a.callback, a.option); }
            });
          } else { el.removeEventListener(a.event, a.callback, a.option); }
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

    subSelect.forEach(async (el, i, arr) => {
      el.querySelectorAll('option').forEach((_el, _i, _arr) => {
        if (!this.#util.empty(_el.value)) { _el.style.setProperty('display', (node.value == _el.dataset.sceMain) ? 'block' : 'none'); }
      });

      el.value = '';

      await this.afterSubSelect(ev);

      el.dispatchEvent(new Event('change'));
    });
  }

  /** @type {sce_element.SceElement['afterCheckAll']} */
  async afterCheckAll(ev) {}

  /** @type {sce_element.SceElement['_checkAll']} */
  async #checkAll(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget;

    this.querySelectorAll(`input[type="checkbox"][data-sce-name='${node.dataset.sceTarget}']`).forEach((el, i, arr) => { el.checked = node.checked; });

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
        !this.#util.empty(node.selectionStart)
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

      decimal = value.filter((el, i, arr) => i > 0).join('').substring(0, parseInt(node.dataset.sceDecimal ?? '0'));
      decimal = `${!this.#util.empty(decimal) ? '.' : ''}${decimal}`;
    }

    node.value = node.value.replace(regex[type], '');

    if (type == 'C') {
      if (
        !this.#util.empty(node.value) ||
        !this.#util.empty(decimal)
      ) {
        const num = parseInt(node.value || '0');

        node.value = `${this.#util.numberFormat(num)}${decimal}`;

        selection += [...node.value.matchAll(/,/g)].length;
      }
    }

    if (
      this.#util.isNumber(min) ||
      this.#util.isNumber(max)
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
        this.#util.isNumber(min)
      ) {
        if (
          this.#util.empty(node.value) ||
          value < Number(min)
        ) {
          num = Number(min);
          flag = true;
        }
      }

      if (
        !flag &&
        this.#util.isNumber(max) &&
        value > Number(max)
      ) {
        num = Number(max);
        flag = true;
      }

      if (flag) {
        /** @type {string} */
        let _value;

        if (type == 'C') {
          _value = this.#util.numberFormat(num, parseInt(node.dataset.sceDecimal ?? '0'));
        } else { _value = `${num}`; }

        selection -= node.value.length - _value.length;
        node.value = _value;
      }
    }

    if (!this.#util.empty(node.selectionEnd)) { node.selectionEnd = selection; }
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