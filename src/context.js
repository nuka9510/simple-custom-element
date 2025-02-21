export default class SceContext {
	/** @type {sce_context.SceContext['_root']} */
	static #root;

	/** @type {sce_context.SceContext['setRoot']} */
	static setRoot(el, root) { SceContext.#root = [...(SceContext.#root ?? []), [el, root]]; }

	/** @type {sce_context.SceContext['getRoot']} */
	static getRoot(el) { return SceContext.#root?.find((_el, i, arr) => _el[0] == el)[1] ?? null; }

	/** @type {sce_context.SceContext['popRoot']} */
	static popRoot(el) { SceContext.#root = SceContext.#root?.filter((_el, i, arr) => _el[0] != el); }

}