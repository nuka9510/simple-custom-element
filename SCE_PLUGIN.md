# ScePlugin
## type
- `_plugin`
```
action: sce_component.action;
afterRender: (el: sce_component.SceComponent) => void;
destroy: (el: sce_component.SceComponent) => void;
```
- `plugin`
```
target?: SceComponent[]?;
plugin: _plugin;
```
## method
- `static get plugin(): plugin[]`
```
SceComponent에 사용할 plugin 배열 객체
```
- `static appendPlugin(plugin: plugin): void`
```
SceComponent에 사용할 plugin을 추가 한다.
```