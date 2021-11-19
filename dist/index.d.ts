import { AxiosRequestConfig } from "axios";
import { Options, GetOptions } from "./domin";
declare class axiosTool {
    options: Options;
    /**拦截方法-拦截前 */
    private InterceptorsRequest?;
    /**拦截方法-拦截后 */
    private InterceptorsResponse?;
    /**api方法 */
    api: any;
    /**队列 */
    queue: {
        [key: string]: AxiosRequestConfig<any>;
    };
    constructor();
    private conbineOptions;
    private Api;
    /**设置 */
    setting(options: GetOptions): void;
}
declare const axiosApiTool: axiosTool;
export default axiosApiTool;
