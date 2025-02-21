import sce_element from "./element.js";

export = sce_util;
export as namespace sce_util;

declare namespace sce_util {
	interface dateInterval {
		year?: number;
		month?: number;
		day?: number;
		hour?: number;
		minute?: number;
		second?: number;
		millisecond?: number;
	}

	interface fetchError {
		status: number;
		msg?: string;
		[key: string]: any;
	}

	class SceUtil {
		/**
		 * 값이 비어있는지 확인한다.
		 *
		 * @example
		 * // returns true
		 * empty();
		 * empty(undefined);
		 * empty(null);
		 * empty(0);
		 * empty('');
		 * empty([]);
		 * empty({});
		 * @param arg 값
		 */
		empty(arg?: any): boolean;

		/**
		 * 값이 숫자인지 확인한다.
		 *
		 * @example
		 * // returns true
		 * isNumber(1);
		 * isNumber('1');
		 * 
		 * // returns false
		 * isNumber('test');
		 * isNumber('1', true);
		 * @param arg 확인할 값
		 * @param strict true일 경우 arg의 type도 확인 #default `false`
		 */
		isNumber(
			arg: any,
			strict?: boolean
		): boolean;

		/**
		 * 해당 값이 객체인지 확인
		 *
		 * @example
		 * // returns true
		 * isObject({});
		 * 
		 * // returns false
		 * isObject();
		 * isObject(undefined);
		 * isObject(null);
		 * isObject(0);
		 * isObject('');
		 * isObject([]);
		 * @param arg 값
		 */
		isObject(arg?: any): boolean;

		/**
		 * 천 단위 마다 그룹화 된 숫자 형식을 반환 한다.
		 * 
		 * @example
		 * // returns '1,000'
		 * numberFormat(1000);
		 * numberFormat(1000.01);
		 * 
		 * // returns '1,000.0'
		 * numberFormat(1000.01, 1);
		 * 
		 * // returns '1,000 0'
		 * numberFormat(1000.01, 1, ' ');
		 * 
		 * // returns '1.000 0'
		 * numberFormat(1000.01, 1, ' ', '.');
		 * @param num 
		 * @param decimals - 소숫점 아래 자리 수 #default `0`
		 * @param decimalSeparator - 소수점 구분자 #default `'.'`
		 * @param thousandsSeparator - 천 단위 구분자 #default `','`
		 */
		numberFormat(
			num: number,
			decimals?: number,
			decimalSeparator?: string,
			thousandsSeparator?: string
		): string;

		/**
		 * 주어진 포맷에 따라 Date객체를 문자열로 변환
		 * 
		 * @example
		 * const date = new Date(2022, 9, 27);
		 * 
		 * // returns '2022-10-27'
		 * strftime(date, '%Y-%m-%d');
		 * 
		 * // returns '2022/10/27'
		 * strftime(date, '%Y/%m/%d');
		 * 
		 * %a: 요일을 축약된 이름으로 - Sun, Mon, …, Sat
		 * %A: 요일을 전체 이름으로 - Sunday, Monday, …, Saturday
		 * %d: 월중 일(day of the month)을 0으로 채워진 10진수로 - 01, 02, …, 31
		 * %b: 월을 축약된 이름으로 - Jan, Feb, …, Dec
		 * %B: 월을 전체 이름으로 - January, February, …, December
		 * %m: 월을 0으로 채워진 10진수로 - 01, 02, …, 12
		 * %y: 세기가 없는 해(year)를 0으로 채워진 10진수로 - 00, 01, …, 99
		 * %Y: 세기가 있는 해(year)를 10진수로 - 0001, 0002, …, 2013, 2014, …, 9998, 9999
		 * %H: 시(24시간제)를 0으로 채워진 십진수로 - 00, 01, …, 23
		 * %I: 시(12시간제)를 0으로 채워진 십진수로 - 01, 02, …, 12
		 * %p: 오전이나 오후에 해당하는 것 - AM, PM
		 * %M: 분을 0으로 채워진 십진수로 - 00, 01, …, 59
		 * %S: 초를 0으로 채워진 10진수로 - 00, 01, …, 59
		 * %%: 리터럴 '%' 문자 - %
		 * @param date 
		 * @param format 
		 */
		strftime(
			date: Date,
			format: string
		): string;

		/**
		 * 유효한 날짜인지 확인
		 *
		 * @example
		 * // returns true
		 * checkdate(2022, 10, 28);
		 * 
		 * // returns false
		 * checkdate(2022, 10, 32);
		 * @param year 년
		 * @param month 월
		 * @param day 일
		 */
		checkdate(
			year: number,
			month: number,
			day: number
		): boolean;

		/**
		 * 같은 날짜인지 비교
		 *
		 * @example
		 * const date1 = new Date();
		 * const date2 = new Date();
		 * 
		 * // returns true
		 * equaldate(date1);
		 * equaldate(date1, date2);
		 * 
		 * // returns false
		 * date1.setDate(date1.getDate() + 1);
		 * date2.setDate(date2.getDate() + 2);
		 * equaldate(date1);
		 * equaldate(date1, date2);
		 * @param date1 기준 날짜
		 * @param date2 비교할 날짜 #default `new Date()`
		 */
		equaldate(
			date1: Date,
			date2?: Date
		): boolean;

		/**
		 * Date객체에서 해당 하는 요일을 반환한다.
		 * 
		 * @example
		 * const date = new Date(2022, 9, 27);
		 * 
		 * // returns '목요일'
		 * getWeek(date);
		 * 
		 * // returns '목'
		 * getWeek(date, false); 
		 * @param date Date 객체
		 * @param flag 해당 요일의 약어반환 대한 구분 값 false일 경우 약어 반환 #default `true`
		 */
		getWeek(
			date: Date,
			flag?: boolean
		): string;

		/**
		 * Date객체에 interval를 더한 값을 반환한다.
		 * 
		 * @example
		 * const date = new Date(2022, 8, 27);
		 * 
		 * // returns '2022-10-28'
		 * strftime(util.addDate(date, {month: 1, day: 1}), '%Y-%m-%d');
		 * 
		 * @param date 
		 * @param interval 
		 */
		addDate(
			date: Date,
			interval: dateInterval
		): Date;

		/**
		 * Date객체에 interval를 뺀 값을 반환한다.
		 * 
		 * @example
		 * const date = new Date(2022, 8, 27);
		 * 
		 * // returns '2022-08-26'
		 * strftime(util.subDate(date, {month: 1, day: 1}), '%Y-%m-%d');
		 * 
		 * @param date 
		 * @param interval 
		 */
		subDate(
			date: Date,
			interval: dateInterval
		): Date;

		/**
		 * xor 비교
		 * 
		 * @example
		 * // returns true
		 * xor(true, false);
		 * xor(false, true);
		 * 
		 * // returns false
		 * xor(true, true);
		 * xor(false, false);
		 * @param arg1 
		 * @param arg2 
		 */
		xor(
			arg1: boolean,
			arg2: boolean
		): boolean;

		/**
		 * @example
		 * setCookie('key', 'value');
		 * @param key 
		 * @param value 
		 * @param expire 
		 * @param path #default `'/'`
		 * @param domain #default `location.hostname`
		 */
		setCookie(
			key: string,
			value: string,
			expire?: Date,
			path?: string,
			domain?: string
		): void;

		/**
		 * @example
		 * setCookie('key', 'value');
		 * 
		 * // returns 'value'
		 * getCookie('key');
		 * @param key
		 */
		getCookie(key: string): string | undefined;

		/**
		 * @example
		 * setCookie('key', 'value');
		 * 
		 * popCookie('key');
		 * @param key 
		 * @param path #default `'/'`
		 * @param domain #default `location.hostname`
		 */
		popCookie(
			key: string,
			path?: string,
			domain?: string
		): void;

		/**
		 * @example
		 * const data = new FormData();
		 * 
		 * data.append('key', value);
		 * 
		 * const json = formDataToJson(data);
		 * @param formData 
		 */
		formDataToJson(formData: FormData): ReturnType<JSON['stringify']>;

		/**
		 * 기준 숫자의 백분율 값을 적용했을 경우의 값을 반환한다.
		 * 
		 * @example
		 * // returns 10
		 * percentage(100, 10);
		 */
		percentage(
			num: number,
			per: number
		): number;

		/**
		 * 기준 숫자의 비율 대비 값을 반환한다.
		 * 
		 * @example
		 * // returns 8 
		 * // 1 : 2 = 4 : x
		 * ratio([1, 2], 4);
		 * 
		 * // returns 2
		 * // 1 : 2 = x : 4
		 * ratio([1, 2], 4, false);
		 * @param flag `default: true`
		 */
		ratio(
			ratio: [number, number],
			num: number,
			flag?: boolean
		): number;

		/**
		 * `x` 번째의 항이 `a`이고 공차가 `d`인 등차수열의 `n` 번째 항을 반환 한다.
		 * 
		 * @param x `x > 0`인 정수
		 */
		arithmeticSequence(
			a: number,
			x: number,
			d: number,
			n: number
		): number;

		/**
		 * `x` 번째의 항이 `a`이고 공비가 `r`인 등비수열의 `n` 번째 항을 반환 한다.
		 * 
		 * @param x `x > 0`인 정수
		 */
		geometricSequence(
			a: number,
			x: number,
			r: number,
			n: number
		): number

		/**
		 * `value`를 반올림(round), 내림(floor), 올림(ceil) 한 값을 반환한다.
		 * 
		 * @param exp 소숫점 아래 자리 수 #default `0`
		 */
		decimalAdjust(
			type: 'round' | 'floor' | 'ceil',
			value: number,
			exp: number
		): number;

		/**
		 * html entity를 인코딩 한다.
		 * 
		 * @param arg html entity를 인코딩 할 문자열
		 */
		encodeHtmlEntity(arg: string): string;

		/**
		 * html entity를 디코딩 한다.
		 * 
		 * @param arg html entity를 디코딩 할 문자열
		 */
		decodeHtmlEntity(arg: string): string;

		/**
		 * `object`의 `deepCopy`를 반환 한다.
		 * 
		 * @param arg `deepCopy`할 `object`
		 */
		copy<T extends object>(arg: T): T;

		/**
		 * `s_num` <= x <= `e_num` 범위의 배열을 반환한다.
		 */
		numRange(
			s_num: number,
			e_num: number
		): number[];

		/**
		 * fetch Response status 확인 후 json을 반환한다.  
		 */
		fetchJson<T extends object>(response: Response): Promise<T | never>;

		/**
		 * `Error`객체의 `message`를 `fetchError`로 parsing하여 반환한다.  
		 */
		getFetchError(e: Error): fetchError;
	}

	interface Constructor {
		(root?: sce_element.SceElement): SceUtil;
	}
}