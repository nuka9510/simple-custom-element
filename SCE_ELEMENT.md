# SceElement
## type
- `action_callback`
```
event?: string; undefined 시 attribute data-sce-event의 값을 사용
callback: (ev: Event) => void | Promise<void>;
option?: EventListenerOptions;
```
- `action`
```
[data-sce-action: string]: action_callback[];
```
- `root`
```
SceElement | Document;
```
## member
- `util: SceUtil` (readonly)
```
SceUtil 객체
```
- `isLoaded: boolean` (readonly)
```
SceElement load 여부
```
- `root: root` (readonly)
```
현재 SceElement를 호출 한 root
```
## method
- `get action(): action`
```
EventListener에 할당 할 data-sce-action을 정의한 action
```
- `async init(): Promise<void>`
```
SceElement가 할당 될 때 실행한다.
```
- `render(): string`
```
화면에 render할 html 문자열을 반환한다.
```
- `setState<T extends { [key: string]: any; }>(state: T): SceState<T>`
```
param을 state로 갖는 SceState객체를 반환한다.

@example
this.state = this.setState({
  'A': 'value_a',
  'B': 'value_b'
});

const state = this.state.get(); // SceState의 state를 반환

this.state.set({ // SceState의 state를 재설정 한다. 실행 시 SceElement를 다시 render한다.
  ...state,
  'B': 'b_value'
});

@example
this.state = this.setState({
  'A': 'value_a',
  'B': 'value_b'
});

const value = this.state.get('A'); // param을 state의 key로 사용하는 SceState의 value를 반환

this.state.set('A', 'a_value'); // param의 key를 사용하는 SceState의 value를 재설정 한다. 실행 시 SceElement를 다시 render한다.

@param
# state
```
- `getParams(): URLSearchParams`
```
현재 페이지의 URLSearchParams객체를 반환한다.
```
- `async afterSubSelect(ev: Event): Promise<void>`
```
data-sce-action="sub-select"이후 실행 할 callback

@param
# ev
```
- `async afterCheckAll(ev: MouseEvent): Promise<void>`
```
data-sce-action="check-all"이후 실행 할 callback

@param
# ev
```
- `async afterCheck(ev: MouseEvent): Promise<void>`
```
data-sce-action="check"이후 실행 할 callback

@param
# ev
```
## data-sce-action
- `prevent-default`
```
Event.preventDefault를 실행 한다.

@example
<input type="radio" data-sce-action="prevent-default" data-sce-event="click">

@attribute
# data-sce-event - 이벤트 #separator: ' '
```
- `stop-propagation`
```
Event.stopPropagation를 실행 한다.

@example
<button type="button" data-sce-action="stop-propagation" data-sce-event="click"> 버튼 </button>

@attribute
# data-sce-event - 이벤트 #separator: ' '
```
- `sub-select`
```
@example
<select data-sce-action="sub-select" data-sce-target="[data-sce-name]">
  <option value="a">A</option>
  <option value="b">B</option>
</select>
<select data-sce-name="[data-sce-name]">
  <option style="display: none" data-sce-main="a" value="1">1</option>
  <option style="display: none" data-sce-main="a" value="2">2</option>
  <option style="display: none" data-sce-main="a" value="3">3</option>
  <option style="display: none" data-sce-main="b" value="4">4</option>
  <option style="display: none" data-sce-main="b" value="5">5</option>
  <option style="display: none" data-sce-main="b" value="6">6</option>
</select>

@attribute
# data-sce-target - sub select의 data-sce-name
# data-sce-name
# data-sce-main - main select의 value
```
- `check-all`
```
@example
<input type="checkbox" data-sce-action="check-all" data-sce-target="[target-data-sce-name]">
<input type="checkbox" data-sce-name="[target-data-sce-name]">
<input type="checkbox" data-sce-name="[target-data-sce-name]">

@attribute
# data-sce-target - checkbox의 data-sce-name
# data-sce-name
```
- `number-only`
```
@example
<input type="text" data-sce-action="number-only" data-sce-type="A">
<input type="text" data-sce-action="number-only" data-sce-type="A" data-sce-min="0" data-sce-max="100">
<input type="text" data-sce-action="number-only" data-sce-type="B">
<input type="text" data-sce-action="number-only" data-sce-type="C">
<input type="text" data-sce-action="number-only" data-sce-type="C" data-sce-decimal="2">

@attribute
# data-sce-min - 최소값
  optional
# data-sce-max - 최대값
  optional
# data-sce-type - 타입
  A: 숫자만 허용
  B: 소숫점 및 음수 허용
  C: #,###.# 형식으로 변환
# data-sce-decimals - 소숫점 아래 자리 수
  optional
  defalut: 0
```
- `check`
```
@example
<input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]">
<input type="hidden" value="N" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">

@example
<input type="checkbox" data-sce-action="check" data-sce-target="[target-data-sce-name]" checked>
<input type="hidden" value="Y" data-sce-name="[target-data-sce-name]" data-sce-true="Y" data-sce-false="N">

@attribute
# data-sce-target - input의 data-sce-name
# data-sce-name
# data-sce-true - checked가 true일 경우의 value
# data-sce-false - checked가 false일 경우의 value
```