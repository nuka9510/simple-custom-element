import Component from "./component";
export default class Context {
    #private;
    /** `Component`의 `root`로 사용할 `Component`를 `root`설정을 위한 배열에 담는다.  */
    static setRoot(el: Component, root: Component): void;
    /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 반환한다.  */
    static getRoot(el: Component): Component | null;
    /** 전달 된 `Component`의 `root`에 해당하는 `Component`를 `root`설정을 위한 배열에서 제거한다.  */
    static popRoot(el: Component): void;
}
