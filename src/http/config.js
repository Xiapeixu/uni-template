import baseUrl from "@/http/base.js";
import { getToken, showtoast } from "@/common/tools/util";
let config = {
  baseUrl,
  header: {},
  dataType: "json",
  responseType: "text",
  // timeout: 1,
};
const interceptor = {
  request(options) {
    if (options.isLoading) {
      //添加通用参数
      uni.showLoading({
        title: "加载中…",
        mask: true,
      });
    }
    if (uni.getStorageSync("token")) {
      config.header.Authorization = getToken();
    }
  },
  responseSuccess(response) {
    const data = response.data;
    if (data.code !== 200) {
      console.error(data.msg);
      showtoast(data.msg);
    }
    return data;
  },
  responseFail(response) {
    showtoast(response.errMsg);
    return { code: 101, msg: response.errMsg };
  },
};
export default {
  request(options) {
    return new Promise((resolve, reject) => {
      // 请求开始
      interceptor.request(options);
      options.url = config.baseUrl + options.url;
      // 请求属性
      const requestOptions = Object.assign(config, options);
      // if (process.env.NODE_ENV === "development") {}
      uni.request({
        ...requestOptions,
        success(requestSuccess) {
          resolve(interceptor.responseSuccess(requestSuccess));
        },
        fail(requestFail) {
          reject(interceptor.responseFail(requestFail));
        },
        complete(requestComplete) {
          // console.log("请求结果", requestComplete);
          if (options.isLoading) {
            uni.hideLoading();
          }
        },
      });
    });
  },
  get(url, { data = {}, options = {}, isLoading = true }) {
    return this.request({ ...options, method: "GET", url, data, isLoading });
  },
  post(url, { data = {}, options = {}, isLoading = true }) {
    return this.request({ ...options, method: "POST", url, data, isLoading });
  },
  put(url, { data = {}, options = {}, isLoading = true }) {
    return this.request({ ...options, method: "PUT", url, data, isLoading });
  },
  delete(url, { data = {}, options = {}, isLoading = true }) {
    return this.request({ ...options, method: "DELETE", url, data, isLoading });
  },
};
