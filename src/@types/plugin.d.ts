import sce_component from "./component";

export = sce_plugin;
export as namespace sce_plugin;

declare namespace sce_plugin {
  interface _plugin {
    action: sce_component.action;
    afterRender: (el: sce_component.Component) => void;
    destroy: (el: sce_component.Component) => void;
  }

  interface plugin {
    target?: SceComponent[]?;
    plugin: _plugin;
  };

  class Plugin {
    /**
     * `SceComponent`에 사용할 `plugin` 배열 객체
     * 
     * @private
     * @static
     */
    private _plugin: plugin[];

    /**
     * `SceComponent`에 사용할 `plugin` 배열 객체
     * 
     * @static
     */
    get plugin(): plugin[];

    /**
     * `SceComponent`에 사용할 `plugin`을 추가 한다.
     * 
     * @static
     */
    appendPlugin(plugin: plugin): void;
  }

  interface Constructor {
    (): Plugin;
  }
}