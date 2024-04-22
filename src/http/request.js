import HTTP_REQUEST_URL from "@/http/base.js";

import http from "@/http/config";

//设置baseUrl
http.config.baseUrl = HTTP_REQUEST_URL;
//设置请求前拦截器
http.interceptor.request = (config) => {
  //添加通用参数
  uni.showLoading({
    title: "加载中……",
    mask: true,
  });
  if (uni.getStorageSync("token")) {
    config.header = {
      Authorization: uni.getStorageSync("token") ? uni.getStorageSync("token") : "",
    };
  }
};
//设置请求结束后拦截器
http.interceptor.response = async (response) => {
  if (!response.data) {
    uni.hideLoading();
    return;
  }
  if (response.data.code == 401) {
    // token过期;
    uni.hideLoading();
  } else if (response.data.code == 200) {
    // 请求成功;
    uni.hideLoading();
    return response.data;
  } else {
    // 请求失败;
    uni.hideLoading();
    uni.showToast({
      title: response.data.msg,
      icon: "none",
      duration: 2000,
    });
    return response.data;
  }

  //判断返回状态 执行相应操作
};

export default http;
