import Component from "../src/component.js";

export interface actionItem {
  /**
   * `EventListener`에 적용할 `event`  \
   * 지정되지 않았을 경우 `data-sce-event`의 값 사용
   */
  event?: string | string[];
  /** `EventListener`에 적용할 `callback` */
  callback: <T, U> (
    ev: T,
    target: U,
    component: Component
  ) => void | Promise<void>;
  /** `EventListener`에 적용할 `option` */
  option?: EventListenerOptions;
  /** 지정되지 않았을 경우 `data-sce-event` `attribute`를 사용하여 `event`를 지정했는지 여부 */
  flag?: boolean;
  listener?: (ev: Event) => Promise<void>;
}

export interface action {
  [data_sce_action: string]: actionItem[];
}

export type root = Component | Document;