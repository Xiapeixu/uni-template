import http from "@/http/config.js";
import { data1, data2, data3 } from "./data";
// 获取商铺列表
export function gettakeDineAndDash(data) {
  // return new Promise((resolve) => {
  //   setTimeout(async () => {
  //     const res = await http.post(`/user/student-wallet/listRecharge`, { data });
  //     resolve(res);
  //   }, 300);
  // });
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      let res = {
        data: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 1,
          total: 5,
          list: [],
        },
        code: 200,
        msg: "success",
      };
      if (data.search) {
        res.data.list = [];
      } else {
        switch (data.pageNum) {
          case 1:
            res.data.list = data1;
            break;
          case 2:
            if (data.name) {
              res.data.list = data3;
            } else {
              res.data.list = data2;
            }
            break;
          default:
            res.data.list = [];
        }
      }
      resolve(res);
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
