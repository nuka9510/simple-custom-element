import { action, actionItem, root } from "../@types/component"
import { plugin } from "../@types/plugin"
import { Util } from "@nuka9510/js-util";
import Context from "./context.js";
import Plugin from "./plugin.js";
import State from "./state.js";
import Interceptor from "./interceptor.js";
import { interceptor } from "../@types/interceptor";

export default class Component extends HTMLElement {
  #isLoaded: boolean;

  #template: HTMLTemplateElement;

  #root: root;

  #action: action;

  /** `Component` `load` 여부 */
  get isLoaded(): boolean { return this.#isLoaded; }

  /** 현재 `Component`를 호출 한 `Document` 또는 `Component` 객체 */
  get root(): root { return this.#root; }

  /** `EventListener`에 할당 할 `data-sce-action`을 정의한 `action` */
  get action(): action { return {}; }

  /** `Component`에서 사용할 모든 `action` */
  get allAction(): action {
    const plugin: plugin[] = Plugin.plugin.filter(
      (...arg) => Util.empty(arg[0].target) ||
                  arg[0].target.includes(this)
    ),
    action: action = {
      ...plugin.reduce(
        (...arg) => {
          return {
            ...arg[0],
            ...arg[1].action
          };
        }, {}
      ),
      ...this.action
    };

    let _action: action = {};

    for (const key in action) {
      for (const value of action[key].values()) {
        if (Util.empty(value.event)) {
          _action[key] = [
            ...(_action[key] ?? []),
            value
          ];
        }
      }
    }

    const keys = Object.keys(_action);

    if (!Util.empty(keys)) {
      this.el.querySelectorAll(`[data-sce-action~="${ keys.join('"], [data-sce-action~="') }"]`)
              .forEach((...arg) => {
                if (!arg[0].hasAttribute('data-sce-event')) { return; }

                const event = arg[0].getAttribute('data-sce-event')
                                    .split(' ');

                arg[0].getAttribute('data-sce-action')
                      .split(' ')
                      .filter((..._arg) => keys.includes(_arg[0]))
                      .forEach((..._arg) => {
                        _action[_arg[0]].forEach((...__arg) => {
                          _action[_arg[0]][__arg[1]] = {
                            ...__arg[0],
                            event: [
                              ...(__arg[0].event ?? []),
                              ...event.filter((...___arg) => !(__arg[0].event ?? []).includes(___arg[0]))
                            ],
                            flag: true
                          };
                        });
                      });
              });

      for (const key in _action) {
        action[key] = [
          ...action[key].filter((...arg) => !Util.empty(arg[0].event)),
          ..._action[key]
        ];
      }
    }

    return action;
  }

  /** `ShadowRoot`에 적용 할 `style`을 정의한 `css`문자열 */
  get css(): string { return ''; }

  /** `html`을 `render`하는 `Component` 또는 `ShadowRoot` 객체 */
  get el(): Component | ShadowRoot { return this.shadowRoot ?? this; }

  /** `Component`의 `attributeChangedCallback`를 실행하기 위해 추척할 `attributes` */
  static get observedAttributes(): string[] { return []; }

  /**
   * `custom-element`를 위한 `Component`객체
   * 
   * ```
   * <html>
   *   <body>
   *     <test-component> </test-component>
   *   </body>
   *   <script type="importmap">
   *     {
   *       "imports": { "@nuka9510/simple-custom-element": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-custom-element/dist/esm/index.min.mjs" }
   *     }
   *   </script>
   *   <script type="module">
   *     import { Component, Register } from "@nuka9510/simple-custom-element";
   *   
   *     class TestComponent extends Component {
   *       render() {
   *         return `<div> test </div>`;
   *       }
   *   
   *     }
   *   
   *     class TestRegister extends Register {
   *       get element() {
   *         return [
   *           { tagName: 'test-component', element: TestComponent }
   *         ];
   *       }
   *   
   *     }
   * 
   *     new TestRegister();
   *   </script>
   * </html>
   * ```
   */
  constructor() {
    super();

    const updateEvent = this.updateEvent.bind(this),
    init = this.init.bind(this);

    this.updateEvent = () => {
      this.#updateEvent();
      updateEvent();
    };

    this.init = async () => {
      this.#initAction();

      await init();

      this.init = async () => {
        this.updateEvent();

        await init();
      };
    };

    this.#isLoaded = false;
    this.#template = document.createElement('template');
    this.#root = Context.getRoot(this) ?? document;

    this.querySelectorAll<HTMLScriptElement>('script[data-sce-arg]')
        .forEach((...arg) => {
          try {
            this[arg[0].dataset['sceArg']] = JSON.parse(arg[0].innerText);
          } catch (e) { console.error(e); }
        });

    Context.popRoot(this);
  }

  /** `Component`가 할당 될 때 실행한다. */
  async init(): Promise<void> {}

  /** `EventListener`에 할당 할 `action`을 정의한다. */
  #initAction(): void {
    const interceptor: interceptor[] = Interceptor.interceptor;

    this.#action = this.allAction;

    for (const action in this.#action) {
      this.#action[action].forEach((...arg) => { arg[0].listener = Component.#actionHandle(this, interceptor, arg[0].callback.bind(this), action, arg[0].flag).bind(this); });
    }
  }

  /**
   * `Component`객체의 `action`에 정의한 이벤트들의 `eventListener`를 갱신한다.
   * `removeEventListener` -> `addEventListener`
   * `eventListener`를 갱신 후 실행할 `callback` 정의.
   */
  updateEvent() {}

  #updateEvent() {
    this.#removeEvent();
    this.#initAction();
    this.#addEvent();
  }

  /** `Component`객체의 `action`에 정의한 이벤트를 `addEventListener`에 적용할 시 실행할 `callback`. */
  addEvent(): void {}

  #addEvent(): void {
    for (const action in this.#action) {
      this.#action[action]
          .forEach((...arg) => {
            if (Util.empty(arg[0].event)) { return; }

            if (Array.isArray(arg[0].event)) {
              arg[0].event
                    .forEach((..._arg) => this.el.addEventListener(_arg[0], arg[0].listener, arg[0].option));
            } else { this.el.addEventListener(arg[0].event, arg[0].listener, arg[0].option) }
          });
    }

    this.addEvent();
  }

  /** `Component`객체의 `action`에 정의한 이벤트를 `removeEventListener`에 적용할 시 실행할 `callback`. */
  removeEvent(): void {}

  #removeEvent(): void {
    for (const action in this.#action) {
      this.#action[action]
          .forEach((...arg) => {
            if (Util.empty(arg[0].event)) { return; }

            if (Array.isArray(arg[0].event)) {
              arg[0].event
                    .forEach((..._arg) => this.el.removeEventListener(_arg[0], arg[0].listener, arg[0].option));
            } else { this.el.removeEventListener(arg[0].event, arg[0].listener, arg[0].option) }
          });
    }

    this.removeEvent();
  }

  /** `rendering`이후 실행 할 `callback` */
  afterRender(): void {}

  /** 화면에 `render`할 html 문자열을 반환한다. */
  render(): string | void {}

  /** 화면을 `render`한다. */
  #render(): void {
    let node: DocumentFragment;

    this.#template.innerHTML = (this.render() as string) ?? '';

    node = this.#template.content.cloneNode(true) as DocumentFragment;

    node.querySelectorAll('*').forEach((...arg) => {
      if (customElements.get(arg[0].localName)) { Context.setRoot((arg[0] as Component), this); }
    });

    this.el.innerHTML = '';
    this.#setCss();
    this.el.appendChild(node);
    Plugin.plugin.forEach((...arg) => { arg[0]['afterRender']?.(this); });
    this.afterRender();
  }

  /** `ShadowRoot`에 `css`를 적용한다. */
  #setCss() {
    if (this.shadowRoot) {
      const style = document.createElement('style');

      style.textContent = this.css;

      this.shadowRoot.appendChild(style);
    }
  }

  /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
  destroy(): void {}

  /** `Component`가 제거될 때 혹은 `state`가 변경되어 다시 `rendering`을 하기 이전에 실행할 `callback` */
  #destroy(): void {
    this.destroy();
    Plugin.plugin.forEach((...arg) => { arg[0]['destroy']?.(this); });
  }

  /** `arg`를 `state`로 갖는 `State`객체를 반환한다. */
  setState<T extends object>(state: T): State<T> {
    return new State(
      state,
      () => { this.#render(); }
    );
  }

  /** 현재 페이지의 `URLSearchParams`객체를 반환한다. */
  getParams(): URLSearchParams { return new URLSearchParams(location.search); }

  static #actionHandle(
    component: Component,
    interceptor: interceptor[],
    callback: actionItem['callback'],
    action?: string,
    flag?: boolean
  ): (
    ev: Event
  ) => Promise<void> {
    return async (
      ev: Event
    ) => {
      let target: EventTarget | HTMLElement = ev.target;

      if (!Util.empty(action)) {
        if (!(ev.target instanceof HTMLElement)) { return; }

        target = (ev.target as HTMLElement).closest(`[data-sce-action~="${ action }"]`);

        if (Util.empty(target)) { return; }

        if (
          (flag ?? false) &&
          !((target as HTMLElement).getAttribute('data-sce-event') ?? '')
                                    .split(' ')
                                    .includes(ev.type)
        ) { return; }
      }

      const preHandle = interceptor.filter(
                                      (...arg) => Util.empty(arg[0].action) ||
                                                  (arg[0].action ?? []).includes(action)
                                    )
                                    .map((...arg) => arg[0].preHandle),
      postHandle = interceptor.filter(
                                (...arg) => Util.empty(arg[0].action) ||
                                            (arg[0].action ?? []).includes(action)
                              )
                              .map((...arg) => arg[0].postHandle);

      for (const handle of preHandle) {
        if (!(handle?.(ev, target, component) ?? true)) { return; }
      }

      await callback(ev, target, component);

      postHandle.forEach((...arg) => arg[0]?.(ev, target, component));
    };
  }

  /** `Component`가 `connected`될 때 실행할 `callback` */
  connectedCallback(): void {
    this.init()
        .then(() => {
          this.#addEvent();
          this.#render();

          this.#isLoaded = true;
        });
  }

  /** `Component`가 `disconnected`될 때 실행할 `callback` */
  disconnectedCallback(): void {
    if (this.#isLoaded) {
      this.#destroy();
      this.#removeEvent();
    }
  }

  /** `Component`가 새로운 `document`로 이동되었을 때 실행할 `callback` */
  adoptedCallback(): void {}

  /** `Component`의 `observedAttributes`가 변경 될 때 실행할 `callback` */
  attributeChangedCallback(
    target: string,
    oldValue: string,
    newValue: string
  ): void {
    if (this.#isLoaded) {
      this.updateAttribute(target, oldValue, newValue);
      this.#render();
    }
  }

  /** `Component`의 `attributeChangedCallback`가 실행 될 때 실행 할 `callback` */
  updateAttribute(
    target: string,
    oldValue: string,
    newValue: string
  ): void {}

}