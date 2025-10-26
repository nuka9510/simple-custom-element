import { Util } from "@nuka9510/js-util";
import Plugin from "../plugin.js";
export default class UtilAction {
    constructor(component) {
        if (Util.empty(component)) {
            return;
        }
        Plugin.append({
            component: Array.isArray(component)
                ? component
                : [component],
            action: {
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
                'sub-select': [
                    { event: 'change', callback: this.#onSubSelect }
                ],
                /**
                 * ```
                 * <input type="checkbox" data-sce-action="check-all" data-sce-target="[target-data-sce-name]">
                 * <input type="checkbox" data-sce-name="[target-data-sce-name]">
                 * <input type="checkbox" data-sce-name="[target-data-sce-name]">
                 * ```
                 */
                'check-all': [
                    { event: 'click', callback: this.#onCheckAll }
                ],
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
                'number-only': [
                    { event: 'keydown', callback: this.#onNumberOnlyKeydown },
                    { event: 'input', callback: this.#onNumberOnlyInput },
                    { event: 'blur', callback: this.#onNumberOnlyBlur, option: { capture: true } }
                ],
                /**
                 * ```
                 * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]">
                 * <input type="hidden" value="N" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
                 *
                 * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]" checked>
                 * <input type="hidden" value="Y" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
                 * ```
                 */
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
