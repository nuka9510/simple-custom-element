export default class Context {
  /** @type {sce_context.Context['_root']} */
  static #root;

  /** @type {sce_context.Context['setRoot']} */
  static setRoot(el, root) { Context.#root = [...(Context.#root ?? []), [el, root]]; }

  /** @type {sce_context.Context['getRoot']} */
  static getRoot(el) { return Context.#root?.find((...arg) => arg[0][0] == el)[1] ?? null; }

  /** @type {sce_context.Context['popRoot']} */
  static popRoot(el) { Context.#root = Context.#root?.filter((...arg) => arg[0][0] != el); }

}