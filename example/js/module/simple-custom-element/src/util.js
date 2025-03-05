export default class SceUtil {
  /** @type {sce_util.SceUtil['empty']} */
  static empty(arg) {
    let result = [undefined, null, 0, ''].includes(arg);

    if (!result) {
      if (arg.constructor == Object) {
        result = Object.keys(arg).length == 0 &&
            Object.keys(Object.getPrototypeOf(arg)).length == 0;
      } else if (arg.constructor == NodeList) {
        result = arg.length == 0;
      } else if (Array.isArray(arg)) { result = arg.length == 0; }
    }

    return result;
  }

  /** @type {sce_util.SceUtil['isNumber']} */
  static isNumber(arg, strict = false) {
    let result = !Number.isNaN(Number(arg)) &&
          ['number', 'string'].includes(typeof arg) &&
          !/^\s*$/.test(arg);

    if (
      result &&
      strict
    ) { result = typeof arg == 'number'; }

    return result;
  }

  /** @type {sce_util.SceUtil['isObject']} */
  static isObject(arg) { return arg?.constructor == Object; }

  /** @type {sce_util.SceUtil['numberFormat']} */
  static numberFormat(num, decimals = 0, decimalSeparator = '.', thousandsSeparator = ',') {
    const result = String(num).split('.');

    result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    if (!this.empty(result[1])) { result[1] = result[1].substring(0, decimals); }

    return (!this.empty(result[1])) ? result[0].concat(decimalSeparator, result[1]) : result[0];
  }

  /** @type {sce_util.SceUtil['strftime']} */
  static strftime(date, format) {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    format = format.replace(/(%{1})/g, '\\$1');
    format = format.replace(/(\\%) {2}/g, '%');
    format = format.replace(/\\%Y/g, String(date.getFullYear()));
    format = format.replace(/\\%y/g, String(date.getFullYear()).replace(/^\d+(\d{2})$/, '$1'));
    format = format.replace(/\\%B/g, month[date.getMonth()]);
    format = format.replace(/\\%b/g, month[date.getMonth()].replace(/^(\w{3})\w*$/, '$1'));
    format = format.replace(/\\%m/g, String(date.getMonth() + 1).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%d/g, String(date.getDate()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%A/g, week[date.getDay()]);
    format = format.replace(/\\%a/g, week[date.getDay()].replace(/^(\w{3})\w*$/, '$1'));
    format = format.replace(/\\%H/g, String(date.getHours()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%I/g, String((date.getHours() > 12) ? (date.getHours() - 12) : date.getHours()).replace(/^0$/, '12').replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%p/g, (date.getHours() < 12) ? 'AM' : 'PM');
    format = format.replace(/\\%M/g, String(date.getMinutes()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%S/g, String(date.getSeconds()).replace(/^(\d{1})$/, '0$1'));

    return format;
  }

  /** @type {sce_util.SceUtil['checkdate']} */
  static checkdate(year, month, day) {
    const date = new Date(year, (month - 1), day);

    return date.getFullYear() == year &&
        (date.getMonth() + 1) == month &&
        date.getDate() == day;
  }

  /** @type {sce_util.SceUtil['equaldate']} */
  static equaldate(date1, date2 = new Date()) { return this.strftime(date1, '%Y-%m-%d') == this.strftime(date2, '%Y-%m-%d'); }

  /** @type {sce_util.SceUtil['getWeek']} */
  static getWeek(date, flag = true) {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    result = week[date.getDay()];

    return (flag) ? result : result.replace(/^([ㄱ-ㅎㅏ-ㅣ가-힣]{1})[ㄱ-ㅎㅏ-ㅣ가-힣]+$/, '$1');
  }

  /** @type {sce_util.SceUtil['addDate']} */
  static addDate(date, interval) {
    return new Date(
      date.getFullYear() + (this.isNumber(interval.year, true) ? interval.year : 0),
      date.getMonth() + (this.isNumber(interval.month, true) ? interval.month : 0),
      date.getDate() + (this.isNumber(interval.day, true) ? interval.day : 0),
      date.getHours() + (this.isNumber(interval.hour, true) ? interval.hour : 0),
      date.getMinutes() + (this.isNumber(interval.minute, true) ? interval.minute : 0),
      date.getSeconds() + (this.isNumber(interval.second, true) ? interval.second : 0),
      date.getMilliseconds() + (this.isNumber(interval.millisecond, true) ? interval.millisecond : 0)
    );
  }

  /** @type {sce_util.SceUtil['subDate']} */
  static subDate(date, interval) {
    return new Date(
      date.getFullYear() - (this.isNumber(interval.year, true) ? interval.year : 0),
      date.getMonth() - (this.isNumber(interval.month, true) ? interval.month : 0),
      date.getDate() - (this.isNumber(interval.day, true) ? interval.day : 0),
      date.getHours() - (this.isNumber(interval.hour, true) ? interval.hour : 0),
      date.getMinutes() - (this.isNumber(interval.minute, true) ? interval.minute : 0),
      date.getSeconds() - (this.isNumber(interval.second, true) ? interval.second : 0),
      date.getMilliseconds() - (this.isNumber(interval.millisecond, true) ? interval.millisecond : 0)
    );
  }

  /** @type {sce_util.SceUtil['xor']} */
  static xor(arg1, arg2) {
    return !(arg1 && arg2) &&
        (arg1 || arg2);
  }

  /** @type {sce_util.SceUtil['setCookie']} */
  static setCookie(key, value, expire, path = '/', domain = location.hostname) {
    if (this.empty(expire)) {
      expire = new Date();
      
      expire.setDate(expire.getDate() + 1);
    }

    document.cookie = `${key}=${value}; expires=${expire.toUTCString()}; path=${path}; domain=${domain}`;
  }

  /** @type {sce_util.SceUtil['getCookie']} */
  static getCookie(key) {
    let result = document.cookie.split('; ')
                  .find((val, i ,arr) => val.startsWith(key));
        
    if (!this.empty(result)) {
      result = result.split('=')[1];
    } else { result = null; }

    return result;
  }

  /** @type {sce_util.SceUtil['popCookie']} */
  static popCookie(key, path = '/', domain = location.hostname) {
    const expire = new Date();
    
    expire.setDate(expire.getDate() - 1);

    document.cookie = `${key}=; expires=${expire.toUTCString()}; path=${path}; domain=${domain}`;
  }

  /** @type {sce_util.SceUtil['formDataToJson']} */
  static formDataToJson(formData) {
    return JSON.stringify(
      Object.fromEntries(
        [...new Set(formData.keys())].map(
          (key) => [
            key,
            (formData.getAll(key).length > 1)
              ? formData.getAll(key)
              : formData.get(key)
          ]
        )
      )
    );
  }

  /** @type {sce_util.SceUtil['percentage']} */
  static percentage(num, per) { return num * (per / 100); }

  /** @type {sce_util.SceUtil['ratio']} */
  static ratio(ratio, num, flag = true) {
    const index = flag
      ? [1, 0]
      : [0, 1];

    return (num * ratio[index[0]]) / ratio[index[1]];
  }

  /** @type {sce_util.SceUtil['arithmeticSequence']} */
  static arithmeticSequence(a, x, d, n) { return a + ((n - x) * d); }

  /** @type {sce_util.SceUtil['geometricSequence']} */
  static geometricSequence(a, x, r, n) { return (a / (r ** (x - 1))) * (r ** (n - 1)); }

  /** @type {sce_util.SceUtil['decimalAdjust']} */
  static decimalAdjust(type, value, exp = 0) {
    const [m, n = 0] = value.toString().split('e'),
    adjustValue = Math[type](`${m}e${parseInt(n) + exp}`),
    [nm, nn = 0] = adjustValue.toString().split('e');

    return Number(`${nm}e${parseInt(nn) - exp}`);
  }

  /** @type {sce_util.SceUtil['encodeHtmlEntity']} */
  static encodeHtmlEntity(arg) {
    const textarea = document.createElement('textarea');

    textarea.innerText = arg;

    return textarea.innerHTML;
  }

  /** @type {sce_util.SceUtil['decodeHtmlEntity']} */
  static decodeHtmlEntity(arg) {
    const textarea = document.createElement('textarea');

    textarea.innerHTML = arg;

    return textarea.innerText;
  }

  /** @type {sce_util.SceUtil['copy']} */
  static copy(arg) {
    if (this.isObject(arg)) {
      const result = {};

      for (const i in arg) { result[i] = this.copy(arg[i]); }

      return result;
    } else if (Array.isArray(arg)) {
      const result = [];

      for (const i of arg) { result.push(this.copy(i)); }

      return result;
    } else { return arg; }
  }

  /** @type {sce_util.SceUtil['numRange']} */
  static numRange(sNum, eNum) {
    let range = (eNum - sNum);

    const flag = (range > 0);

    range = Math.abs(range) + 1;

    return [...new Array(range)].map((el, i, arr) => (i * ((flag) ? 1 : -1)) + sNum);
  }

  /** @type {sce_util.SceUtil['fetchJson']} */
  static fetchJson(response) {
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then((text) => {
        let error = { status: response.status };

        try {
          error = { ...error, ...JSON.parse(text) };
        } catch (e) { error = { ...error, msg: text }; }

        throw new Error(JSON.stringify(error));
      });
    }
  }

  /** @type {sce_util.SceUtil['getFetchError']} */
  static getFetchError(e) { return JSON.parse(e.message); };

}