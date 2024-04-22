import http from "@/http/config.js";

// post模板
export function post(data) {
  return http.post(`/xxx`, data);
}

//get模板
export function get(merchantId) {
  return http.get(`/xxx/${merchantId}`);
}

// 解析URL 参数
export function getUrlParam(name) {
  const reg = new RegExp("[?&]" + name + "=([^?&]*)(&?)");
  const str = window.location.href.match(reg);
  if (str) {
    return str[1];
  }
}
