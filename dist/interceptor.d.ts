import { interceptor } from "@nuka9510/simple-custom-element/@types/interceptor";
export default class Interceptor {
    #private;
    /** `simple-custome-element`에 사용할 `interceptor` 배열 객체 */
    static get interceptor(): interceptor[];
    /** `simple-custome-element`에 사용할 `interceptor`을 추가 한다.  */
    static append(interceptor: interceptor | interceptor[]): void;
}
