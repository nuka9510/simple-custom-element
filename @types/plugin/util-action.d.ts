import { actionItem } from "@nuka9510/simple-custom-element/@types/component";
import { Component } from "@nuka9510/simple-custom-element";

export interface plugin {
  component: Component[];
  action: {
    /**
      * ```html
      * <select data-sce-action="sub-select" data-sce-target="{target-select}">
      *   <option value="{main-value-a}">A</option>
      *   <option value="{main-value-b}">B</option>
      * </select>
      * <select data-sce-name="{target-select}">
      *   <option style="display: none" data-sce-main="{main-value-a}" value="1">1</option>
      *   <option style="display: none" data-sce-main="{main-value-a}" value="2">2</option>
      *   <option style="display: none" data-sce-main="{main-value-a}" value="3">3</option>
      *   <option style="display: none" data-sce-main="{main-value-b}" value="4">4</option>
      *   <option style="display: none" data-sce-main="{main-value-b}" value="5">5</option>
      *   <option style="display: none" data-sce-main="{main-value-b}" value="6">6</option>
      * </select>
      * ```
      */
    'sub-select': actionItem[];
    /**
      * ```html
      * <input type="checkbox" data-sce-action="check-all" data-sce-target="{target-input}">
      * <input type="checkbox" data-sce-name="{target-input}">
      * <input type="checkbox" data-sce-name="{target-input}">
      * ```
      */
    'check-all': actionItem[];
    /**
      * ```html
      * <input type="text" data-sce-action="number-only" [ data-sce-type="{( A | B | C )}" ] [ data-sce-min="{min-value}" ] [ data-sce-max="{max-value}" ] [ data-sce-decimal="{decimal-value}" ]>
      */
    'number-only': actionItem[];
    /**
      * ```html
      * <input type="checkbox" data-sce-action="check" data-sce-target="{target-input}">
      * <input type="hidden" value="{false-value}" data-sce-name="{target-input}" data-sce-true="{true-value}" data-sce-false="{false-value}">
      * ```
      */
    'check': actionItem[];
  }
}

export interface NumberOnlyElement extends HTMLInputElement {
  event_key_code?: KeyboardEvent['keyCode'];
  prev_value?: string;
  prev_selection?: number | null;
}