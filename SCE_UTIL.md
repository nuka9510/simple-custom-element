# SceUtil
## type
- `dateInterval`
```
year?: number;
month?: number;
day?: number;
hour?: number;
minute?: number;
second?: number;
millisecond?: number;
```
## method
- `empty(arg?: any): boolean`
```
값이 비어있는지 확인한다.

@param
# arg

@example
// returns true
empty();
empty(undefined);
empty(null);
empty(0);
empty('');
empty([]);
empty({});
```
- `isNumber(arg: any, strict?: boolean): boolean`
```
값이 숫자인지 확인한다.

@param
# arg
# strict - true일 경우 arg의 type도 확인 #default false

@example
// returns true
isNumber(1);
isNumber('1');

// returns false
isNumber('test');
isNumber('1', true);
```
- `isObject(arg?: any): boolean`
```
해당 값이 객체인지 확인

@param
# arg

@example
// returns true
isObject({});

// returns false
isObject();
isObject(undefined);
isObject(null);
isObject(0);
isObject('');
isObject([]);
```
- `numberFormat(num: number, decimals?: number, decimalSeparator?: string, thousandsSeparator?: string): string`
```
천 단위 마다 그룹화 된 숫자 형식을 반환 한다.

@param
# num
# decimals - 소숫점 아래 자리 수 #default 0
# decimalSeparator - 소수점 구분자 #default '.'
# thousandsSeparator - 천 단위 구분자 #default ','

@example
// returns '1,000'
numberFormat(1000);
numberFormat(1000.01);

// returns '1,000.0'
numberFormat(1000.01, 1);

// returns '1,000 0'
numberFormat(1000.01, 1, ' ');

// returns '1.000 0'
numberFormat(1000.01, 1, ' ', '.');
```
- `strftime(date: Date, format: string): string`
```
주어진 포맷에 따라 Date객체를 문자열로 변환

@param
# date
# format

@example
const date = new Date(2022, 9, 27);

// returns '2022-10-27'
strftime(date, '%Y-%m-%d');

// returns '2022/10/27'
strftime(date, '%Y/%m/%d');

%a: 요일을 축약된 이름으로 - Sun, Mon, …, Sat
%A: 요일을 전체 이름으로 - Sunday, Monday, …, Saturday
%d: 월중 일(day of the month)을 0으로 채워진 10진수로 - 01, 02, …, 31
%b: 월을 축약된 이름으로 - Jan, Feb, …, Dec
%B: 월을 전체 이름으로 - January, February, …, December
%m: 월을 0으로 채워진 10진수로 - 01, 02, …, 12
%y: 세기가 없는 해(year)를 0으로 채워진 10진수로 - 00, 01, …, 99
%Y: 세기가 있는 해(year)를 10진수로 - 0001, 0002, …, 2013, 2014, …, 9998, 9999
%H: 시(24시간제)를 0으로 채워진 십진수로 - 00, 01, …, 23
%I: 시(12시간제)를 0으로 채워진 십진수로 - 01, 02, …, 12
%p: 오전이나 오후에 해당하는 것 - AM, PM
%M: 분을 0으로 채워진 십진수로 - 00, 01, …, 59
%S: 초를 0으로 채워진 10진수로 - 00, 01, …, 59
%%: 리터럴 '%' 문자 - %
```
- `checkdate(year: number, month: number, day: number): boolean`
```
유효한 날짜인지 확인

@param
# year 년
# month 월
# day 일

@example
// returns true
checkdate(2022, 10, 28);

// returns false
checkdate(2022, 10, 32);
```
- `equaldate(date1: Date, date2?: Date): boolean`
```
같은 날짜인지 비교

@param
# date1 기준 날짜
# date2 비교할 날짜 #default new Date()

@example
const date1 = new Date();
const date2 = new Date();

// returns true
equaldate(date1);
equaldate(date1, date2);

// returns false
date1.setDate(date1.getDate() + 1);
date2.setDate(date2.getDate() + 2);
equaldate(date1);
equaldate(date1, date2);
```
- `getWeek(date: Date, flag?: boolean): string`
```
Date객체에서 해당 하는 요일을 반환한다.

@param
# date Date 객체
# flag 해당 요일의 약어반환 대한 구분 값 false일 경우 약어 반환 #default true

@example
const date = new Date(2022, 9, 27);

// returns '목요일'
getWeek(date);

// returns '목'
getWeek(date, false);
```
- `addDate(date: Date, interval: dateInterval): Date`
```
Date객체에 interval를 더한 값을 반환한다.

@param
# date
# interval

@example
const date = new Date(2022, 8, 27);

// returns '2022-10-28'
strftime(util.addDate(date, {month: 1, day: 1}), '%Y-%m-%d');
```
- `subDate(date: Date, interval: dateInterval): Date`
```
Date객체에 interval를 뺀 값을 반환한다.

@param
# date
# interval

@example
const date = new Date(2022, 8, 27);

// returns '2022-08-26'
strftime(util.subDate(date, {month: 1, day: 1}), '%Y-%m-%d');
```
- `xor(arg1: boolean, arg2: boolean): boolean`
```
xor 비교

@param
# arg1
# arg2

@example
// returns true
xor(true, false);
xor(false, true);

// returns false
xor(true, true);
xor(false, false);
```
- `setCookie(key: string, value: string, expire?: Date, path?: string, domain?: string): void`
```
쿠키 값 설정

@param
# key
# value
# expire
# path #default '/'
# domain #default location.hostname

@example
setCookie('key', 'value');
```
- `getCookie(key: string): string | undefined`
```
쿠키 값 반환

@param
# key

@example
setCookie('key', 'value');

// returns 'value'
getCookie('key');
```
- `popCookie(key: string, path?: string, domain?: string): void`
```
쿠키 값 제거

@param
# key
# path #default '/'
# domain #default location.hostname

@example
setCookie('key', 'value');

popCookie('key');
```
- `formDataToJson(formData: FormData): string`
```
FormData객체를 json 문자열로 반환

@param
# formData

@example
const data = new FormData();

data.append('key', value);

const json = formDataToJson(data);
```
- `percentage(num: number, per: number): number`
```
기준 숫자의 백분율 값을 적용했을 경우의 값을 반환한다.

@param
# num
# per

@example
// returns 10
percentage(100, 10);
```
- `ratio(ratio: [number, number], num: number, flag?: boolean): number`
```
기준 숫자의 비율 대비 값을 반환한다.

@param
# ratio
# num
# flag #default true

@example
// returns 8
// 1 : 2 = 4 : x
ratio([1, 2], 4);

// returns 2
// 1 : 2 = x : 4
ratio([1, 2], 4, false);
```
- `arithmeticSequence(a: number, x: number, d: number, n: number): number`
```
x 번째의 항이 a 이고 공차가 d 인 등차수열의 n 번째 항을 반환 한다.

@param
# a 기준 항
# x 기준 항의 순번 x > 0 인 정수
# d 공차
# n 결과 항의 순번
```
- `geometricSequence(a: number, x: number, r: number, n: number): number`
```
x 번째의 항이 a 이고 공비가 r 인 등비수열의 n 번째 항을 반환 한다.

@param
# a 기준 항
# x 기준 항의 순번 x > 0 인 정수
# d 공비
# n 결과 항의 순번
```
- `decimalAdjust(type: 'round' | 'floor' | 'ceil', value: number, exp: number): number`
```
value 를 반올림(round), 내림(floor), 올림(ceil) 한 값을 반환한다.

@param
# type
# value
# exp 소숫점 아래 자리 수 #default 0
```
- `encodeHtmlEntity(arg: string): string`
```
html entity를 인코딩 한다.

@param
# arg html entity를 인코딩 할 문자열
```
- `decodeHtmlEntity(arg: string): string`
```
html entity를 디코딩 한다.

@param
# arg html entity를 디코딩 할 문자열
```
- `copy<T extends object>(arg: T): T`
```
object의 deepCopy를 반환 한다.

@param
# arg deepCopy할 object
```
- `numRange(s_num: number, e_num: number): number[]`
```
s_num <= x <= e_num 범위의 배열을 반환한다.

@param
# s_num
# e_num
```