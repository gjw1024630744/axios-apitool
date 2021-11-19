# axios-apitool

### 安装

Using npm:

```bash
$ npm install axios-apitool
```

### 使用

#### main.js // 设置 api 参数

```javascript
import axiosApiTool from "axios-apitool";

axiosApiTool.setting({
  baseURL:string
  api: {
    login: "./login",
  },
  InterceptorsRequest: (config:AxiosRequestConfig,otherConfig:RequestOtherConfig) => {
    //-- config => AxiosRequestConfig
  },
  InterceptorsResponse: (response:AxiosResponse,otherConfig:RequestOtherConfig) => {
    //-- response => AxiosResponse
  },
});
```

OtherConfig

```javascript
interface OtherConfig {
  [key: string]: any;
  headers: { [key: string]: string };
}
```

| key                  |                                        type | description  |
| -------------------- | ------------------------------------------: | :----------: |
| baseURL              |                                      string |     域名     |
| api                  |                       {[key:string:string]} | 所有接口 API |
| InterceptorsRequest  | (config:AxiosRequestConfig,otherConfig)=>{} |  拦截响应前  |
| InterceptorsResponse | (response:AxiosResponse,otherConfig) => {}, |  拦截响应后  |

<font color=#0099ff>InterceptorsRequest</font> 与 <font color=#0099ff>InterceptorsResponse</font> 方法中第二参数 <font color=#0099ff>OtherConfig</font> 拦截单独请求中配置的自定义 config 方便在特殊接口中做出特殊处理 （下面有示例）

#### Page.vue|js // 页面中使用

配置好 axiosApiTool.Setting 可以在页面或 js 文件中 直接 import 使用。
比如 VUE2 可以挂载到 Vue.prototype.$axiosApiTool = axiosApiTool
一般在仓库做异步处理直接 import 就可以

```javascript
axiosApiTool.api
  .login(data, "GET", { option })
  .then((res) => {})
  .catch((err) => {});
```

axiosApiTool 将会根据 <font color=#0099ff>axiosApiTool.setting</font> 中设置的 <font color=#0099ff>api</font> 对象中的 <font color=#0099ff>key</font> 生成请求方法,返回 <font color=#0099ff>Promise</font> 对象。 方法中第三个参数可以设置本次请求的单独 <font color=#0099ff>headers</font> 请求头配置, 也可以设置自定义其他的对象, 在拦截器中 <font color=#0099ff>OtherConfig</font> 参数获取，做出处理

方法参数描述 —— 对应示例中的 login

| key    |                                                                 type | description |
| ------ | -------------------------------------------------------------------: | :---------: |
| 参数一 |                                                                   {} |    参数     |
| 参数二 | 可选: "GET"/"OPTIONS"/"HEAD"/"POST"/"PUT"/"DELETE"/"TRACE"/"CONNECT" |  请求方式   |
| 参数三 |                                     {[key:string:string],headers:{}} | 自定义选项  |
