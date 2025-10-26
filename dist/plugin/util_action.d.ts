import { plugin } from "../../@types/plugin/util_action";
import Component from "../component.js";
export default class UtilAction {
    #private;
    static plugin(component: Component | Component[]): plugin;
}
