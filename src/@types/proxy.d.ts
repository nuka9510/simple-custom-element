export = sce_proxy;
export as namespace sce_proxy;

declare namespace sce_proxy {
	class SceProxy<V extends { [key: string]: any; }> {
		/** @private */
		private _target: V;

		/** @private */
		private _callback: () => void;

		/** `target`을 수정한다.  */
		set(...arg: [V] | [keyof V, V[keyof V]]): void;

		/** `target`을 반환한다. */
		get(arg?: keyof V): V | V[keyof V];
	}

	interface Constructor<V extends { [key: string]: any; }> {
		(
			target: V,
			async callback: () => void
		): SceProxy<V>;
	}
}