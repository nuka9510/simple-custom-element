# SceValidation
```
@example
<form name="form">
  <input type="text" name="text" data-sce-pattern="password" data-sce-input-name="비밀번호" minlength="0" maxlength="10">
  <input type="text" name="text" data-sce-pattern="password" minlength="0" maxlength="10" required="비밀번호">
  <input type="date" name="sdate1" data-sce-date="date1" data-sce-date-state="S" data-sce-input-name="검색일1">
  <input type="date" name="edate1" data-sce-date="date1" data-sce-date-state="E" data-sce-input-name="검색일1">
  <input type="date" name="sdate2" data-sce-date="date2" data-sce-date-state="S" required="검색일2">
  <input type="date" name="edate2" data-sce-date="date2" data-sce-date-state="E" required="검색일2">
</form>
<script>
  const validation = new SceValidation({regex: {password: /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/}});
  
  validation.run(form);
  
  if (validation.result.flag) {
    form.submit();
  } else {
    alert(validation.result.alertMsg);
    validation.result.el.focus();
  }
</script>
```
## type
- `InputElement`
```
HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
```
- `result`
```
flag: boolean; #default true
alertMsg: string | null; #default null
el: InputElement | null; #default null
```
- `dateEl`
```
S: InputElement;
E: InputElement;
```
- `el`
```
el: InputElement[];
date: {
  [data-sce-date: string]: dateEl;
};
```
- `radio`
```
[required: string]: InputElement[];
```
- `regexDefault`
```
email: RegExp; #default /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]+$/
password: RegExp; #default /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/
phone: RegExp; #default /^\d{11}$/
nickname: RegExp; #default /^[ㄱ-ㅎㅏ-ㅣ가-힣\w\d]{2,10}$/
```
- `regex`
```
@extends regexDefault

[pattern: string]: RegExp;
```
- `config`
```
regex?: regex;
```
## constructor
- `constructor(config?: config): SceValidation`
```
생성자

@param
# config
```
## member
- `result: result`
```
결과 값 객체
```
## method
- `init(config?: config): void`
```
객체 초기화

@param
# config
```
- `run(form: HTMLFormElement): void`
```
validation을 실행한다.

@param
# form
```