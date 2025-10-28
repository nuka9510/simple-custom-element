import { actionItem } from "@nuka9510/simple-custom-element/@types/component";
import { Component } from "@nuka9510/simple-custom-element";

export interface plugin {
  component: Component[];
  action: {
    /**
      * ```
      * <select data-sce-action="sub-select" data-sce-target="[data-sce-name]">
      *   <option value="a">A</option>
      *   <option value="b">B</option>
      * </select>
      * <select data-sce-name="[data-sce-name]">
      *   <option style="display: none" data-sce-main="a" value="1">1</option>
      *   <option style="display: none" data-sce-main="a" value="2">2</option>
      *   <option style="display: none" data-sce-main="a" value="3">3</option>
      *   <option style="display: none" data-sce-main="b" value="4">4</option>
      *   <option style="display: none" data-sce-main="b" value="5">5</option>
      *   <option style="display: none" data-sce-main="b" value="6">6</option>
      * </select>
      * ```
      */
    'sub-select': actionItem[];
    /**
      * ```
      * <input type="checkbox" data-sce-action="check-all" data-sce-target="[target-data-sce-name]">
      * <input type="checkbox" data-sce-name="[target-data-sce-name]">
      * <input type="checkbox" data-sce-name="[target-data-sce-name]">
      * ```
      */
    'check-all': actionItem[];
    /**
      * ```
      * <input type="text" data-sce-action="number-only" data-sce-type="A">
      * <input type="text" data-sce-action="number-only" data-sce-type="A" data-sce-min="0" data-sce-max="100">
      * <input type="text" data-sce-action="number-only" data-sce-type="B">
      * <input type="text" data-sce-action="number-only" data-sce-type="C">
      * <input type="text" data-sce-action="number-only" data-sce-type="C" data-sce-decimal="2">
      * ```
      * #data-sce-min 최소값
      * optional
      * 
      * #data-sce-max 최대값
      * optional
      * 
      * #data-sce-type  \
      * `A`: 숫자만 허용  \
      * `B`: 소숫점 및 음수 허용  \
      * `C`: #,###.# 형식으로 변환
      * 
      * #data-sce-decimals 소숫점 아래 자리 수  \
      * defalut: `0`
      */
    'number-only': actionItem[];
    /**
      * ```
      * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]">
      * <input type="hidden" value="N" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
      * 
      * <input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]" checked>
      * <input type="hidden" value="Y" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">
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