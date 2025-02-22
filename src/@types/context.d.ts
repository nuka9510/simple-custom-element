import sce_element from "./element.js";

export = sce_context;
export as namespace sce_context;

declare namespace sce_context {
  class SceContext {
    /** @static */
    _root: [sce_element.SceElement, sce_element.SceElement][];

    /** @static */
    setRoot(
      el: sce_element.SceElement,
      root: sce_element.SceElement
    ): void;

    /** @static */
    getRoot(el: sce_element.SceElement): sce_element.SceElement?;

    /** @static */
    popRoot(el: sce_element.SceElement): void;
  }

  interface Constructor {
    (): SceContext;
  }
}