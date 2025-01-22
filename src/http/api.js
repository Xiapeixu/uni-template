import http from "@/http/config.js";
import _data from "./data";
// 获取商铺列表
export function gettakeDineAndDash(data, isLoading = false) {
  // return new Promise((resolve) => {
  //   setTimeout(async () => {
  //     const res = await http.post(`/user/student-wallet/listRecharge`, { data });
  //     resolve(res);
  //   }, 300);
  // });
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve({
        data: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 1,
          total: 5,
          list: _data.slice((data.current - 1) * data.size, data.current * data.size),
        },
        code: 200,
        msg: "success",
      });
    }, 300);
  });
  // return http.get(`/user/home/listMenus/44`, { data, isLoading });
}

// post模板
export function post(data) {
  return http.post(`/xxx`, { data });
}

//get模板
export function get(merchantId) {
  return http.get(`/xxx/${merchantId}`);
}
