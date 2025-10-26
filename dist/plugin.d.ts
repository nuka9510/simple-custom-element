import { plugin } from "../@types/plugin";
export default class Plugin {
    #private;
    /** `simple-custome-element`에 사용할 `plugin` 배열 객체 */
    static get plugin(): plugin[];
    /** `simple-custome-element`에 사용할 `plugin`을 추가 한다.  */
    static append(plugin: plugin | plugin[]): void;
}
