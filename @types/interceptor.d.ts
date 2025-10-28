import { Component } from "@nuka9510/simple-custom-element";

export interface interceptor {
  /**
   * `Interceptor`를 적용할 `Component`  \
   * 지정되지 않았을 경우 모든 `Component`에 적용
   */
  component?: Component[];
  /**
   * `Interceptor`를 적용할 `action`명  \
   * 지정되지 않았을 경우 모든 `action`에 적용
   */
  action?: string[];
  /**
   * `action`동작 전에 실행 할 `callback`  \
   * `false` 반환 시 `action` 중단
   */
  preHandle?: <T, U> (
    ev: T,
    target: U,
    component: Component
  ) => boolean | void;
  /** `action`동작 이후 실행 할 `callback`  \ */
  postHandle?: <T, U> (
    ev: T,
    target: U,
    component: Component
  ) => void;
}