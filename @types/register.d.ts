import { Component } from "@nuka9510/simple-custom-element";

export interface element {
  /** `simple-custom-element`로 사용할 `Component`의 `tagName` */
  tagName: string;
  /** `simple-custom-element`로 사용할 `Component` */
  element: Component;
}