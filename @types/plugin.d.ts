import Component from "../src/component";
import { action } from "./component";

export = plugin;
export as namespace plugin;

declare namespace plugin {
  interface _plugin {
    action: action;
    afterRender: (el: Component) => void;
    destroy: (el: Component) => void;
  }

  interface plugin {
    target?: Component[] | null;
    plugin: _plugin;
  }
}