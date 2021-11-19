var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from "axios";
var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
        this.InterceptorsRequestHook = function () { };
        this.InterceptorsResponseHook = function () { };
    }
    HttpRequest.prototype.setInterceptorsRequest = function (InterceptorsRequestHook) {
        this.InterceptorsRequestHook = InterceptorsRequestHook;
    };
    HttpRequest.prototype.setInterceptorsResponse = function (InterceptorsResponseHook) {
        this.InterceptorsResponseHook = InterceptorsResponseHook;
    };
    HttpRequest.prototype.interceptors = function (instance, other_config, key, url) {
        var _this = this;
        // 请求拦截
        instance.interceptors.request.use(function (config) {
            _this.InterceptorsRequestHook(config, key, other_config);
            // 合并请求头
            config.headers = Object.assign(config.headers, other_config.headers);
            return config;
        }, function (error) {
            throw new Error(error);
        });
        // 响应拦截
        instance.interceptors.response.use(function (response) {
            // 响应成功
            _this.InterceptorsResponseHook(response, key, other_config);
            return response;
        }, function (error) {
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
                            error.response.message = "\u8FDE\u63A5\u51FA\u9519(" + error.response.status + ")!";
                    }
                    _this.InterceptorsResponseHook(error.response, key);
                }
                else {
                    _this.InterceptorsResponseHook({ status: -200, message: "连接服务器失败!" }, key);
                }
                throw new Error(error);
            }
        });
    };
    HttpRequest.prototype.request = function (options, config, key) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = axios.create();
                        return [4 /*yield*/, this.interceptors(instance, config, key, options.url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, instance(options)];
                }
            });
        });
    };
    return HttpRequest;
}());
var HTTP = new HttpRequest();
var axiosTool = /** @class */ (function () {
    function axiosTool() {
        this.options = {
            baseURL: "",
            api: {},
            InterceptorsRequest: function (config) { },
            InterceptorsResponse: function (response) { }
        };
        /**api方法 */
        this.api = {};
        /**队列 */
        this.queue = {};
    }
    // 合并axios参数
    axiosTool.prototype.conbineOptions = function (_opts, data, method) {
        var opts = _opts;
        if (typeof opts === "string") {
            opts = { url: opts };
        }
        var _data = __assign(__assign({}, opts.data), data);
        var options = {
            method: opts.method || data.method || method || "GET",
            url: opts.url,
            baseURL: this.options.baseURL
        };
        return options.method !== "GET"
            ? Object.assign(options, { data: _data })
            : Object.assign(options, { params: _data });
    };
    // 抛出API方法
    axiosTool.prototype.Api = function () {
        var _this = this;
        var fun = function (key) {
            return function (data, method, config) {
                if (data === void 0) { data = {}; }
                if (method === void 0) { method = "GET"; }
                if (config === void 0) { config = { headers: {} }; }
                return __awaiter(_this, void 0, void 0, function () {
                    var newOpts, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newOpts = this.conbineOptions(this.options.api[key], data, method);
                                return [4 /*yield*/, HTTP.request(newOpts, config, key)];
                            case 1:
                                res = _a.sent();
                                if (res == undefined) {
                                    throw new Error(res);
                                }
                                return [2 /*return*/, res];
                        }
                    });
                });
            };
        };
        Object.keys(this.options.api).forEach(function (key) {
            _this.api[key] = fun(key);
        });
    };
    /**设置 */
    axiosTool.prototype.setting = function (options) {
        var _this = this;
        /**合并配置选项 */
        this.options = Object.assign(this.options, options);
        /**注入拦截器 */
        this.InterceptorsRequest = function (config, key, other_config) {
            /**加入队列 */
            _this.queue[key] = config;
            /**执行自定义拦截 */
            _this.options.InterceptorsRequest(config, other_config);
        };
        this.InterceptorsResponse = function (response, key, other_config) {
            /**移除队列 */
            delete _this.queue[key];
            /**执行自定义拦截器 */
            _this.options.InterceptorsResponse(response, other_config);
        };
        HTTP.setInterceptorsRequest(this.InterceptorsRequest);
        HTTP.setInterceptorsResponse(this.InterceptorsResponse);
        /**生成API */
        this.Api();
    };
    return axiosTool;
}());
var axiosApiTool = new axiosTool();
export default axiosApiTool;
