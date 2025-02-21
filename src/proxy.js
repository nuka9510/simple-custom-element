import SceUtil from "./util.js";

/** @extends {sce_util.SceUtil} */
export default class SceProxy extends SceUtil {
	/** @type {sce_proxy.SceProxy<{ [key: string]: any; }>['_target']} */
	#target;

	/** @type {sce_proxy.SceProxy<{ [key: string]: any; }>['_callback']} */
	#callback;

	/** @type {sce_proxy.Constructor<{ [key: string]: any; }>} */
	constructor(target, callback) {
		super();

		this.#target = this.copy(target);
		this.#callback = callback;
	}

	/** @type {sce_proxy.SceProxy<{ [key: string]: any; }>['set']} */
	set(...arg) {
		if ((arg.length > 0) && (arg.length <= 2)) {
			switch(arg.length) {
				case 1: {
					const [newValue] = arg;

					this.#target = newValue;
					break;
				}
				case 2: {
					const [key, newValue] = arg;

					this.#target[key] = newValue;
					break;
				}
			}

			this.#callback();
		} else { throw new Error('param 개수 범위 초과') }
	}

	/** @type {sce_proxy.SceProxy<{ [key: string]: any; }>['get']} */
	get(arg) {
		if (arg == undefined) {
			return this.#target ?? null;
		} else { return this.#target[arg] ?? null; }
	}

}