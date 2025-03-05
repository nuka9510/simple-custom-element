import SceUtil from "./util.js";

export default class SceValidation {
  /** @type {sce_validation.SceValidation['result']} */
  result;

  /** @type {sce_validation.SceValidation['_el']} */
  #el;

  /** @type {sce_validation.SceValidation['_radio']} */
  #radio;

  /** @type {sce_validation.SceValidation['_regex']} */
  #regex;

  /** @type {sce_validation.Constructor} */
  constructor(config) { this.init(config); }

  /** @type {sce_validation.SceValidation['init']} */
  init(config = null) {
    this.#resultInit();
    this.#elInit();
    this.#radioInit();
    this.#regexInit(config?.regex);
  }

  /** @type {sce_validation.SceValidation['_resultInit']} */
  #resultInit() {
    this.result = {
      flag: true,
      alertMsg: null,
      el: null
    };
  }

  /** @type {sce_validation.SceValidation['_elInit']} */
  #elInit() { this.#el = {}; }

  /** @type {sce_validation.SceValidation['_radioInit']} */
  #radioInit() { this.#radio = {}; }

  /** @type {sce_validation.SceValidation['_regexInit']} */
  #regexInit(regex = null) {
    /** @type {sce_validation.regexDefault} */
    const _default = {
      email: /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]+$/,
      password: /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/,
      phone: /^\d{11}$/,
      nickname: /^[ㄱ-ㅎㅏ-ㅣ가-힣\w\d]{2,10}$/
    };

    this.#regex = (!SceUtil.empty(regex) && SceUtil.isObject(regex))
      ? {
        ..._default,
        ...this.#regex,
        ...regex,
      }
      : {
        ..._default,
        ...this.#regex
      };
  }

  /** @type {sce_validation.SceValidation['_setRadio']} */
  #setRadio(el) {
    const required = el.getAttribute('required');

    if (!SceUtil.empty(required)) {
      if (SceUtil.empty(this.#radio[required])) {
        this.#radio[required] = [el];
      } else { this.#radio[required].push(el); }
    }
  }

  /** @type {sce_validation.SceValidation['_setEl']} */
  #setEl(el) {
    const pattern = el.dataset.scePattern,
    date = el.dataset.sceDate;

    if (!SceUtil.empty(pattern)) {
      if (SceUtil.empty(this.#el.el)) { this.#el.el = []; }

      this.#el.el.push(el);
    }

    if (!SceUtil.empty(date)) {
      const state = el.dataset.sceDateState;

      switch (state) {
        case 'S':
        case 'E':
          if (SceUtil.empty(this.#el.date)) { this.#el.date = {}; }
          if (SceUtil.empty(this.#el.date[date])) { this.#el.date[date] = {}; }

          this.#el.date[date][state] = el;
          break;
      }
    }
  }

  /** @type {sce_validation.SceValidation['_required']} */
  #required(el) {
    const required = el.getAttribute('required');

    if (!SceUtil.empty(required)) {
      if (el.type == 'radio') {
        this.#setRadio(el);
      } else if (SceUtil.empty(el.value)) {
        this.result.flag = false;
        this.result.alertMsg = `'${required}'을/를 입력해 주세요.`;
        this.result.el = el;
      }
    }
  }

  /** @type {sce_validation.SceValidation['_requiredRadio']} */
  #requiredRadio() {
    for (const i in this.#radio) {
      const el = this.#radio[i][0],
      flag = this.#radio[i].some((_el, _i, _arr) => _el.checked);

      if (!flag) {
        this.result.flag = false;
        this.result.alertMsg = `'${i}'을/를 선택해주세요.`;
        this.result.el = el;
        break;
      }
    }
  }

  /** @type {sce_validation.SceValidation['_match']} */
  #match() {
    for (const i in this.#el) {
      if (this.result.flag) {
        switch (i) {
          case 'date':
            this.#isDate(this.#el[i]);
            break;
          case 'el':
            this.#isPattern(this.#el[i]);
            break;
        }
      } else { break; }
    }
  }

  /** @type {sce_validation.SceValidation['_isDate']} */
  #isDate(el) {
    for (const i in el) {
      if (this.result.flag) {
        const sdate = el[i].S.value,
        edate = el[i].E.value;

        if (
          !SceUtil.empty(sdate) &&
          !SceUtil.empty(edate)
        ) {
          const inputName = el[i].S.dataset.sceInputName || el[i].E.dataset.sceInputName,
          required = el[i].S.getAttribute('required') || el[i].E.getAttribute('required');

          if ((new Date(sdate)).getTime() > (new Date(edate)).getTime()) {
            this.result.flag = false;
            this.result.alertMsg = `'${inputName || required}'의 시작일이 종료일 보다 늦습니다.`;
            this.result.el = el[i];
          }
        }
      } else { break; }
    }
  }

  /** @type {sce_validation.SceValidation['_isPattern']} */
  #isPattern(el) {
    if (Array.isArray(el)) {
      for (const i of el) {
        const pattern = i.dataset.scePattern,
        inputName = i.dataset.sceInputName,
        required = i.getAttribute('required'),
        val = i.value;

        if (Object.keys(this.#regex).includes(pattern)) {
          if (
            !SceUtil.empty(val) &&
            !this.#regex[pattern].test(val)
          ) {
            this.result.flag = false;
            this.result.alertMsg = `'${inputName || required}'의 형식이 올바르지 않습니다.`;
            this.result.el = i;
            break;
          }
        }
      }
    } else {
      const pattern = el.dataset.scePattern,
      inputName = el.dataset.sceInputName,
      required = el.getAttribute('required'),
      val = el.value;

      if (Object.keys(this.#regex).includes(pattern)) {
        if (
          !SceUtil.empty(val) &&
          !this.#regex[pattern].test(val)
        ) {
          this.result.flag = false;
          this.result.alertMsg = `'${inputName || required}'의 형식이 올바르지 않습니다.`;
          this.result.el = el;
        }
      }
    }
  }

  /** @type {sce_validation.SceValidation['_length']} */
  #length() {
    for (const i in this.#el) {
      if (
        i == 'el' &&
        this.result.flag
      ) {
        for (const j of this.#el[i]) {
          const inputName = j.dataset.sceInputName,
          required = j.getAttribute('required'),
          val = j.value.length;

          if (
            j.minLength >= 0 &&
            j.maxLength >= 0
          ) {
            if (
              val < j.minLength ||
              val > j.maxLength
            ) {
              this.result.flag = false;
              this.result.alertMsg = `'${inputName || required}'은/는 ${j.minLength}~${j.maxLength}자 이내로 입력해주세요.`;
              this.result.el = j;
              break;
            }
          } else if (
            j.minLength >= 0 &&
            j.maxLength < 0
          ) {
            if (val < j.minLength) {
              this.result.flag = false;
              this.result.alertMsg = `'${inputName || required}'은/는 ${j.minLength}자 이상으로 입력해주세요.`;
              this.result.el = j;
              break;
            }
          } else if (
            j.minLength < 0 &&
            j.maxLength >= 0
          ) {
            if (val > j.maxLength) {
              this.result.flag = false;
              this.result.alertMsg = `'${inputName || required}'은/는 ${j.maxLength}자 이하로 입력해주세요.`;
              this.result.el = j;
              break;
            }
          }
        }
      } else if (!this.result.flag) { break; }
    }
  }

  /** @type {sce_validation.SceValidation['run']} */
  run(form) {
    this.init();

    for (const el of form.elements) {
      if (this.result.flag) {
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
          if (!el.disabled) {
            this.#required(el);
            this.#setEl(el);
          }
        }
      } else { break; }
    }

    if (this.result.flag) { this.#requiredRadio(); }

    if (this.result.flag) { this.#match(); }

    if (this.result.flag) { this.#length(); }
  }

}