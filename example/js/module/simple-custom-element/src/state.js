import SceUtil from "./util.js";

/** @extends {sce_util.SceUtil} */
export default class SceState extends SceUtil {
  /** @type {sce_state.SceState<{ [key: string]: any; }>['_state']} */
  #state;

  /** @type {sce_state.SceState<{ [key: string]: any; }>['_callback']} */
  #callback;

  /** @type {sce_state.Constructor<{ [key: string]: any; }>} */
  constructor(state, callback) {
    super();

    this.#state = this.copy(state);
    this.#callback = callback;
  }

  /** @type {sce_state.SceState<{ [key: string]: any; }>['set']} */
  set(...arg) {
    if ((arg.length > 0) && (arg.length <= 2)) {
      switch(arg.length) {
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
    } else { throw new Error('param 개수 범위 초과') }
  }

  /** @type {sce_state.SceState<{ [key: string]: any; }>['get']} */
  get(arg) {
    if (arg == undefined) {
      return this.#state ?? null;
    } else { return this.#state[arg] ?? null; }
  }

}