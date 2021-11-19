import { AxiosResponse, AxiosRequestConfig } from "axios";

export interface Options {
  /**域名 */
  baseURL: string;
  /**接口API */
  api: { [key: string]: string };
  /**拦截器-请求前 */
  InterceptorsRequest: Function;
  /**拦截器-请求后 */
  InterceptorsResponse: Function;
}

export interface GetOptions {
  /**域名 */
  baseURL?: string;
  /**接口API */
  api: { [key: string]: string };
  /**拦截器-请求前 */
  InterceptorsRequest?: Function;
  /**拦截器-请求后 */
  InterceptorsResponse?: Function;
}

export interface RequestOtherConfig {
  [key: string]: any;
  /**配置单条请求-请求头 */
  headers: { [key: string]: string };
}

export declare type Methods =
  | "GET"
  | "OPTIONS"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";

export declare interface Datas {
  method?: Methods;
  [key: string]: any;
}
