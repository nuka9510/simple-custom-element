import SceUtil from "./util";

export default class ScePlugin {
  /** @type {sce_plugin.Plugin['_plugin']} */
  static #plugin = [];

  /** @type {sce_plugin.Plugin['plugin']} */
  static get plugin() { return SceUtil.copy(Plugin.#plugin); }

  /** @type {sce_plugin.Plugin['appendPlugin']} */
  static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }

}