import sce_element from "./element";

export = sce_plugin;
export as namespace sce_plugin;

declare namespace sce_plugin {
  interface _plugin {
    action: sce_element.action;
    afterRender: (el: sce_element.SceElement) => void;
    destroy: (el: sce_element.SceElement) => void;
  }

  interface plugin {
    target?: SceElement[]?;
    plugin: _plugin;
  };

  class Plugin {
    /**
     * `SceElement`에 사용할 `plugin` 배열 객체
     * 
     * @private
     * @static
     */
    private _plugin: plugin[];

    /**
     * `SceElement`에 사용할 `plugin` 배열 객체
     * 
     * @static
     */
    get plugin(): plugin[];

    /**
     * `SceElement`에 사용할 `plugin`을 추가 한다.
     * 
     * @static
     */
    appendPlugin(plugin: plugin): void;
  }

  interface Constructor {
    (): Plugin;
  }
}