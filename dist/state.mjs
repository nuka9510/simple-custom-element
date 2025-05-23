import { JUtil } from "@nuka9510/js-util";
export default class State {
    #state;
    #callback;
    /** `target`을 수정한다.  */
    constructor(state, callback) {
        this.#state = JUtil.copy(state);
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
            return JUtil.copy(this.#state ?? null);
        }
        else {
            return JUtil.copy(this.#state[arg] ?? null);
        }
    }
}
