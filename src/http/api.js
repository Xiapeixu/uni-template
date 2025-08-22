import http from "@/http/config.js";

// post模板
export function post(data) {
  return http.post(`/xxx`, { data });
}

//get模板
export function get(merchantId) {
  return http.get(`/xxx/${merchantId}`);
}
