import Component from "../src/component";

export = register;
export as namespace register;

declare namespace register {
  interface element {
    tagName: string;
    element: Component;
  }
}