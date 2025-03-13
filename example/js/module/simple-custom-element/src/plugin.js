import { SceUtil } from "./index.js";

export default class Plugin {
  /** @type {sce_plugin.Plugin['_plugin']} */
  static #plugin = [];

  /** @type {sce_plugin.Plugin['plugin']} */
  static get plugin() { return SceUtil.copy(Plugin.#plugin); }

  /** @type {sce_plugin.Plugin['appendPlugin']} */
  static appendPlugin(plugin) { Plugin.#plugin.push(plugin); }

}