export interface NumberOnlyElement extends HTMLInputElement {
  event_key_code?: KeyboardEvent['keyCode'];
  prev_value?: string;
  prev_selection?: number | null;
}