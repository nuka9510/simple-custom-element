export default class State<T extends object> {
    #private;
    /** `target`을 수정한다.  */
    constructor(state: T, callback: () => void);
    /** `target`을 수정한다.  */
    set(...arg: [T] | [keyof T, T[keyof T]]): void;
    /** `target`을 반환한다. */
    get(arg?: keyof T): T | T[keyof T];
}
