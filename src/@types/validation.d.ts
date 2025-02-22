import sce_util from "./util.js";

export = sce_validation;
export as namespace sce_validation;

declare namespace sce_validation {
  type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  /** 결과 값 객체 */
  interface result {
    /** #default `true` */
    flag: boolean;
    /** #default `null` */
    alertMsg: string | null;
    /** #default `null` */
    el: InputElement | null;
  }

  interface dateEl {
    S: InputElement;
    E: InputElement;
  }

  /** validation check할 Element를 담는 객체 */
  interface el {
    el: InputElement[];
    date: {
      [date: string]: dateEl;
    };
  }

  interface radio {
    [required: string]: InputElement[];
  }

  interface regexDefault {
    /** #default `/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]+$/` */
    email: RegExp;
    /** #default `/^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/` */
    password: RegExp;
    /** #default `/^\d{11}$/` */
    phone: RegExp;
    /** #default `/^[ㄱ-ㅎㅏ-ㅣ가-힣\w\d]{2,10}$/` */
    nickname: RegExp;
  }

  /** validation에 사용할 정규식을 담은 객체 */
  interface regex extends regexDefault {
    [pattern: string]: RegExp;
  }

  /** validation 초기화를 위한 객체 */
  interface config {
    regex?: regex;
  }

  class SceValidation {
    /** 결과 값 객체 */
    result: result;

    /** @private */
    private _util: sce_util.SceUtil;

    /**
     * validation check할 Element를 담는 객체
     * 
     * @private
     */
    private _el: el;

    /**
     * validation check할 radio Element를 담는 객체
     * 
     * @private
     */
    private _radio: radio;

    /**
     * validation check에 사용할 정규식을 담은 객체
     * 
     * @private
     */
    private _regex: regex;

    /** 
     * @example
     * <form name="form">
     *   <input type="text" name="text" data-sce-pattern="password" data-sce-input-name="비밀번호" minlength="0" maxlength="10">
     *   <input type="text" name="text" data-sce-pattern="password" minlength="0" maxlength="10" required="비밀번호">
     *   <input type="date" name="sdate1" data-sce-date="date1" data-sce-date-state="S" data-sce-input-name="검색일1">
     *   <input type="date" name="edate1" data-sce-date="date1" data-sce-date-state="E" data-sce-input-name="검색일1">
     *   <input type="date" name="sdate2" data-sce-date="date2" data-sce-date-state="S" required="검색일2">
     *   <input type="date" name="edate2" data-sce-date="date2" data-sce-date-state="E" required="검색일2">
     * </form>
     * <script>
     *   const validation = new Validation({regex: {password: /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/}});
     *   
     *   validation.run(form);
     *   
     *   if (validation.result.flag) {
     *     form.submit();
     *   } else {
     *     alert(validation.result.alertMsg);
     *     validation.result.el.focus();
     *   }
     * </script>
     */
    constructor(config?: config): SceValidation;

    /** 객체 초기화 */
    init(config?: config): void;

    /** @private */
    private _resultInit(): void;

    /** @private */
    private _elInit(): void;

    /** @private */
    private _radioInit(): void;

    /** @private */
    private _regexInit(regex?: regex): void;

    /**
     * radio에 type이 'radio'인 Element를 담는다.
     * 
     * @private
     */
    private _setRadio(el: InputElement): void;

    /**
     * el에 Element를 담는다.
     * 
     * @private
     */
    private _setEl(el: InputElement): void;

    /**
     * el에 있는 Element들을 required check한다.
     * 
     * @private
     */
    private _required(el: InputElement): void;

    /**
     * radio에 있는 Element들을 required check한다.
     * 
     * @private
     */
    private _requiredRadio(): void;

    /**
     * Element들을 validation check 한다.
     * ```
     * -----------------------
     * date : isDate
     * -----------------------
     * el : isPattern
     * ```
     * 
     * @private
     */
    private _match(): void;

    /**
     * date check
     * 
     * @private
     */
    private _isDate(el: el['date']): void;

    /**
     * regex check
     * 
     * @private
     */
    private _isPattern(el: el['el'] | InputElement): void;

    /**
     * Element value의 length를 check 한다.
     * 
     * @private
     */
    private _length(): void;

    /** validation을 실행한다. */
    run(form: HTMLFormElement): void;
  }

  interface Constructor {
    /** 
     * @example
     * <form name="form">
     *   <input type="text" name="text" data-sce-pattern="password" data-sce-input-name="비밀번호" minlength="0" maxlength="10">
     *   <input type="text" name="text" data-sce-pattern="password" minlength="0" maxlength="10" required="비밀번호">
     *   <input type="date" name="sdate1" data-sce-date="date1" data-sce-input-name="검색일1" data-sce-date-state="S">
     *   <input type="date" name="edate1" data-sce-date="date1" data-sce-input-name="검색일1" data-sce-date-state="E">
     *   <input type="date" name="sdate2" data-sce-date="date2" data-sce-date-state="S" required="검색일2">
     *   <input type="date" name="edate2" data-sce-date="date2" data-sce-date-state="E" required="검색일2">
     * </form>
     * <script>
     *   const validation = new Validation({regex: {password: /^[\S!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`]{6,10}$/}});
     *   
     *   validation.run(form);
     *   
     *   if (validation.result.flag) {
     *     form.submit();
     *   } else {
     *     alert(validation.result.alertMsg);
     *     validation.result.el.focus();
     *   }
     * </script>
     */
    (config?: config): SceValidation;
  }
}