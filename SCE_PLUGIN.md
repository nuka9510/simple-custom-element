# ScePlugin
## type
- `_plugin`
```
action: sce_element.action;
afterRender: (el: sce_element.SceElement) => void;
destroy: (el: sce_element.SceElement) => void;
```
- `plugin`
```
target?: SceElement[]?;
plugin: _plugin;
```
## method
- `static get plugin(): plugin[]`
```
SceElement에 사용할 plugin 배열 객체
```
- `static appendPlugin(plugin: plugin): void`
```
SceElement에 사용할 plugin을 추가 한다.
```