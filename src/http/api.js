import http from "@/http/config.js";

// 获取商铺列表
export function gettakeDineAndDash(data) {
  // return http.post(`/user/student-wallet/listRecharge`, {});
  return { data: [1, 2, 3, 4, 5] };
  return http.get(`/user/home/listMenus/44`, { data, isLoading: false });
}

// post模板
export function post(data) {
  return http.post(`/xxx`, data);
}

//get模板
export function get(merchantId) {
  return http.get(`/xxx/${merchantId}`);
}
