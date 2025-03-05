import SceUtil from "./util.js";

export default class ScePlugin {
  /** @type {sce_plugin.Plugin['_plugin']} */
  static #plugin = [];

  /** @type {sce_plugin.Plugin['plugin']} */
  static get plugin() { return SceUtil.copy(ScePlugin.#plugin); }

  /** @type {sce_plugin.Plugin['appendPlugin']} */
  static appendPlugin(plugin) { ScePlugin.#plugin.push(plugin); }

}