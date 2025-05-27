import { action } from "./component";
import Component from "../src/component.mjs";

interface _plugin {
  action: action;
  afterRender: (el: Component | ShadowRoot) => void;
  destroy: (el: Component | ShadowRoot) => void;
}

export interface plugin {
  target?: (Component | ShadowRoot)[] | null;
  plugin: _plugin;
}