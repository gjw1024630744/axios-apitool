import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import {
  Options,
  Methods,
  Datas,
  GetOptions,
  RequestOtherConfig,
} from "./domin";

class HttpRequest {
  InterceptorsRequestHook: Function;
  InterceptorsResponseHook: Function;
  constructor() {
    this.InterceptorsRequestHook = () => {};
    this.InterceptorsResponseHook = () => {};
  }
  public setInterceptorsRequest(InterceptorsRequestHook: Function) {
    this.InterceptorsRequestHook = InterceptorsRequestHook;
  }
  public setInterceptorsResponse(InterceptorsResponseHook: Function) {
    this.InterceptorsResponseHook = InterceptorsResponseHook;
  }
  interceptors(
    instance: AxiosInstance,
    other_config: RequestOtherConfig,
    key: string,
    url?: string
  ) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.InterceptorsRequestHook(config, key, other_config);
        // 合并请求头
        config.headers = Object.assign(config.headers, other_config.headers);
        return config;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 响应成功
        this.InterceptorsResponseHook(response, key, other_config);
        return response;
      },
      (error: any) => {
        // 未响应
        if (url) {
          // 状态码错误
          if (error.response) {
            switch (error.response.status) {
              case 400:
                error.response.message = "请求错误(400)";
                break;
              case 401:
                error.response.message = "未授权，请重新登录(401)";
                break;
              case 403:
                error.response.message = "拒绝访问(403)";
                break;
              case 404:
                error.response.message = "请求出错(404)";
                break;
              case 408:
                error.response.message = "请求超时(408)";
                break;
              case 500:
                error.response.message = "服务器错误(500)";
                break;
              case 501:
                error.response.message = "服务未实现(501)";
                break;
              case 502:
                error.response.message = "网络错误(502)";
                break;
              case 503:
                error.response.message = "服务不可用(503)";
                break;
              case 504:
                error.response.message = "网络超时(504)";
                break;
              case 505:
                error.response.message = "HTTP版本不受支持(505)";
                break;
              default:
                error.response.message = `连接出错(${error.response.status})!`;
            }
            this.InterceptorsResponseHook(error.response, key);
          } else {
            this.InterceptorsResponseHook(
              { status: -200, message: "连接服务器失败!" },
              key
            );
          }
          throw new Error(error);
        }
      }
    );
  }
  async request(
    options: AxiosRequestConfig,
    config: RequestOtherConfig,
    key: string
  ) {
    const instance = axios.create();
    await this.interceptors(instance, config, key, options.url);
    return instance(options);
  }
}

const HTTP: HttpRequest = new HttpRequest();

class axiosTool {
  public options: Options = {
    baseURL: "",
    api: {},
    InterceptorsRequest: (config: AxiosRequestConfig) => {},
    InterceptorsResponse: (response: AxiosResponse) => {},
  };
  /**拦截方法-拦截前 */
  private InterceptorsRequest?: Function;
  /**拦截方法-拦截后 */
  private InterceptorsResponse?: Function;
  /**api方法 */
  public api: any = {};
  /**队列 */
  public queue: { [key: string]: AxiosRequestConfig<any> } = {};
  constructor() {}
  // 合并axios参数
  private conbineOptions(
    _opts: any,
    data: Datas,
    method: Methods
  ): AxiosRequestConfig {
    let opts = _opts;
    if (typeof opts === "string") {
      opts = { url: opts };
    }
    const _data = { ...opts.data, ...data };
    const options = {
      method: opts.method || data.method || method || "GET",
      url: opts.url,
      baseURL: this.options.baseURL,
    };
    return options.method !== "GET"
      ? Object.assign(options, { data: _data })
      : Object.assign(options, { params: _data });
  }
  // 抛出API方法
  private Api() {
    const fun = (key: string) => {
      return async (
        data = {},
        method: Methods = "GET",
        config: RequestOtherConfig = { headers: {} }
      ) => {
        const newOpts = this.conbineOptions(
          this.options.api[key],
          data,
          method
        );
        // 发起请求
        const res = await HTTP.request(newOpts, config, key);
        if (res == undefined) {
          throw new Error(res);
        }
        return res;
      };
    };
    Object.keys(this.options.api).forEach((key) => {
      this.api[key] = fun(key);
    });
  }
  /**设置 */
  public setting(options: GetOptions) {
    /**合并配置选项 */
    this.options = Object.assign(this.options, options);
    /**注入拦截器 */
    this.InterceptorsRequest = (
      config: AxiosRequestConfig,
      key: string,
      other_config: RequestOtherConfig
    ) => {
      /**加入队列 */
      this.queue[key] = config;
      /**执行自定义拦截 */
      this.options.InterceptorsRequest(config, other_config);
    };
    this.InterceptorsResponse = (
      response: AxiosRequestConfig,
      key: string,
      other_config: RequestOtherConfig
    ) => {
      /**移除队列 */
      delete this.queue[key];
      /**执行自定义拦截器 */
      this.options.InterceptorsResponse(response, other_config);
    };
    HTTP.setInterceptorsRequest(this.InterceptorsRequest);
    HTTP.setInterceptorsResponse(this.InterceptorsResponse);
    /**生成API */
    this.Api();
  }
}

const axiosApiTool = new axiosTool();

export default axiosApiTool;
