import { Component } from "@nuka9510/simple-custom-element";
import { action } from "./component";

export interface plugin {
  /**
   * `Plugin`를 적용할 `Component`  \
   * 지정되지 않았을 경우 모든 `Component`에 적용
   */
  component?: Component[];
  /** `Plugin`으로 추가할 `action` */
  action: action;
  /** `render`이후 실행 할 `callback` */
  afterRender?: (component: Component) => void;
  /** `destroy` 시 실행 할 `callback` */
  destroy?: (component: Component) => void;
}