import { Util } from "@nuka9510/js-util";
import Plugin from "../plugin.js";
export default class UtilAction {
    constructor(component) {
        if (Util.empty(component)) {
            return;
        }
        Plugin.append({
            target: Array.isArray(component)
                ? component
                : [component],
            action: {
                'sub-select': [
                    { event: 'change', callback: this.#onSubSelect }
                ],
                'check-all': [
                    { event: 'click', callback: this.#onCheckAll }
                ],
                'number-only': [
                    { event: 'keydown', callback: this.#onNumberOnlyKeydown },
                    { event: 'input', callback: this.#onNumberOnlyInput },
                    { event: 'blur', callback: this.#onNumberOnlyBlur, option: { capture: true } }
                ],
                'check': [
                    { event: 'click', callback: this.#onCheck }
                ]
            }
        });
    }
    #onSubSelect(ev, target, component) {
        const subNode = component.el.querySelectorAll(`select[data-sce-name="${target.dataset['sceTarget']}"]`);
        subNode.forEach(async (...arg) => {
            arg[0].querySelectorAll('option')
                .forEach((..._arg) => {
                if (!Util.empty(_arg[0].value)) {
                    _arg[0].style.setProperty('display', (target.value == _arg[0].dataset['sceMain']) ? 'block' : 'none');
                }
            });
            arg[0].value = '';
            arg[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
    async #onCheckAll(ev, target, component) {
        component.el.querySelectorAll(`input[type="checkbox"][data-sce-name='${target.dataset['sceTarget']}']`)
            .forEach((...arg) => { arg[0].checked = target.checked; });
    }
    #onNumberOnlyKeydown(ev, target, component) {
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (ev.keyCode == 229) {
            target.event_key_code = ev.keyCode;
            target.prev_value = target.value;
            target.prev_selection = target.selectionStart;
        }
        else {
            delete target.event_key_code;
            delete target.prev_value;
            delete target.prev_selection;
        }
    }
    async #onNumberOnlyInput(ev, target, component) {
        /** 한글 입력시 input 이벤트가 여러번 발생하는 현상 보정을 위한 로직 */
        if (target.event_key_code == 229) {
            if (!ev.isComposing) {
                target.value = target.prev_value;
                target.selectionStart = target.prev_selection;
            }
            else {
                delete target.event_key_code;
                delete target.prev_value;
                delete target.prev_selection;
            }
        }
        if (ev.data != null) {
            const regex = {
                A: /[\d]/,
                B: /[\d\.\-]/,
                C: /[\d\.]/
            };
            if (!regex[target.dataset['sceType'] ?? 'A'].test(ev.data) &&
                !Util.empty(target.selectionStart)) {
                target.selectionStart -= 1;
            }
        }
        await this.#numberOnly(ev, target, component);
    }
    async #onNumberOnlyBlur(ev, target, component) { await this.#numberOnly(ev, target, component); }
    async #numberOnly(ev, target, component) {
        const type = target.dataset['sceType'] ?? 'A', min = target.dataset['sceMin'], max = target.dataset['sceMax'], regex = {
            A: /[^\d]/g,
            B: /[^\d\.\-]/g,
            C: /[^\d]/g
        };
        let selection = target.selectionStart, decimal;
        if (type == 'C') {
            const value = target.value.split('.');
            selection -= [...target.value.matchAll(/,/g)].length;
            target.value = value[0];
            decimal = value.filter((...arg) => arg[1] > 0)
                .join('')
                .substring(0, parseInt(target.dataset['sceDecimal'] ?? '0'));
            decimal = `${!Util.empty(decimal) ? '.' : ''}${decimal}`;
        }
        target.value = target.value.replace(regex[type], '');
        if (type == 'C') {
            if (!Util.empty(target.value) ||
                !Util.empty(decimal)) {
                const num = parseInt(target.value || '0');
                target.value = `${Util.numberFormat(num)}${decimal}`;
                selection += [...target.value.matchAll(/,/g)].length;
            }
        }
        if (Util.isNumber(min) ||
            Util.isNumber(max)) {
            let flag = false, num = null, value;
            if (type == 'C') {
                value = Number(target.value.replace(/,/g, ''));
            }
            else {
                value = Number(target.value);
            }
            if (!flag &&
                Util.isNumber(min)) {
                if (Util.empty(target.value) ||
                    value < Number(min)) {
                    num = Number(min);
                    flag = true;
                }
            }
            if (!flag &&
                Util.isNumber(max) &&
                value > Number(max)) {
                num = Number(max);
                flag = true;
            }
            if (flag) {
                let _value;
                if (type == 'C') {
                    _value = Util.numberFormat(num, parseInt(target.dataset['sceDecimal'] ?? '0'));
                }
                else {
                    _value = `${num}`;
                }
                selection -= target.value.length - _value.length;
                target.value = _value;
            }
        }
        if (!Util.empty(target.selectionEnd)) {
            target.selectionEnd = selection;
        }
    }
    async #onCheck(ev, target, component) {
        const targetEl = component.el.querySelector(`input[data-sce-name="${target.dataset['sceTarget']}"]`);
        if (targetEl != null) {
            targetEl.value = target.checked ? targetEl.dataset['sceTrue'] : targetEl.dataset['sceFalse'];
        }
    }
}
