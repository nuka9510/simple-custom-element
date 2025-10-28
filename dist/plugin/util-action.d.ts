import { plugin } from "@nuka9510/simple-custom-element/@types/plugin/util-action";
import { Component } from "@nuka9510/simple-custom-element";
export default class UtilAction {
    #private;
    static plugin(component: Component | Component[]): plugin;
}
