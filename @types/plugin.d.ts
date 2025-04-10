import { action } from "./component";
import Component from "../src/component.mjs";

interface _plugin {
  action: action;
  afterRender: (el: Component) => void;
  destroy: (el: Component) => void;
}

export interface plugin {
  target?: Component[] | null;
  plugin: _plugin;
}