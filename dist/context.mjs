export default class Context {
    static #root;
    /** `Component`의 `root`로 사용할 `Component`를 `root`설정을 위한 배열에 담는다.  */
    static setRoot(el, root) { Context.#root = [...(Context.#root ?? []), [el, root]]; }
    /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 반환한다.  */
    static getRoot(el) { return Context.#root?.find((...arg) => arg[0][0] == el)[1] ?? null; }
    /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 `root`설정을 위한 배열에서 제거한다.  */
    static popRoot(el) { Context.#root = Context.#root?.filter((...arg) => arg[0][0] != el); }
}
