import Component from "./component.mjs";

export default class Context {
  static #root: [Component, Component | ShadowRoot][];

  /** `Component`의 `root`로 사용할 `Component`를 `root`설정을 위한 배열에 담는다.  */
  static setRoot(
    el: Component,
    root: Component | ShadowRoot
  ): void { Context.#root = [...(Context.#root ?? []), [el, root]]; }

  /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 반환한다.  */
  static getRoot(
    el: Component
  ): Component | ShadowRoot | null { return Context.#root?.find((...arg) => arg[0][0] == el)[1] ?? null; }

  /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 `root`설정을 위한 배열에서 제거한다.  */
  static popRoot(
    el: Component
  ): void { Context.#root = Context.#root?.filter((...arg) => arg[0][0] != el); }

}