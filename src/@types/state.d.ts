export = sce_state;
export as namespace sce_state;

declare namespace sce_state {
  class State<V extends { [key: string]: any; }> {
    /** @private */
    private _state: V;

    /** @private */
    private _callback: () => void;

    /** `target`을 수정한다.  */
    set(...arg: [V] | [keyof V, V[keyof V]]): void;

    /** `target`을 반환한다. */
    get(arg?: keyof V): V | V[keyof V];
  }

  interface Constructor<V extends { [key: string]: any; }> {
    (
      state: V,
      async callback: () => void
    ): State<V>;
  }
}