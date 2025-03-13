import sce_component from "./component.js";

export = sce_context;
export as namespace sce_context;

declare namespace sce_context {
  class Context {
    /** @static */
    _root: [sce_component.Component, sce_component.Component][];

    /**
     * `SceComponent`의 `root`로 사용할 `SceComponent`를 `root`설정을 위한 배열에 담는다.
     * 
     * @static
     */
    setRoot(
      el: sce_component.Component,
      root: sce_component.Component
    ): void;

    /**
     * 전달 된 `SceComponent`의 `root`에 해당하는 `SceComponent`를 반환한다.
     * 
     * @static
     */
    getRoot(el: sce_component.Component): sce_component.Component?;

    /**
     * 전달 된 `SceComponent`의 `root`에 해당하는 `SceComponent`를 `root`설정을 위한 배열에서 제거한다.
     * 
     * @static
     */
    popRoot(el: sce_component.Component): void;
  }

  interface Constructor {
    (): Context;
  }
}