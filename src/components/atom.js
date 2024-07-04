import { ref } from "vue";
import _enum from "./enum";
import * as a_calc from "a-calc";

export default () => {
  const data = {
    // 分页
    page: ref({
      // 页码
      page: 1,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
    }),
    // 数据列表
    dataArray: ref([]),
    // 滚动列表下拉状态
    triggered: ref(false),
    // 查询参数
    query: ref({}),
    // 提交参数
    form: ref({}),
    // 字典值
    dict: {
      label: {},
      // 根据index获取对象
      indexByObj(key, index) {
        return Object.values(data.dict.label[key]).filter((item) => {
          return item.index == index;
        })[0];
      },
      // 获取对象
      getObject(key, value) {
        return data.dict.label[key][value];
      },
      // 获取下标
      getIndex(key, value) {
        const obj = data.dict.label[key][value];
        return obj ? obj.index : "";
      },
      // 获取内容
      getValue(key, value) {
        const obj = data.dict.label[key][value];
        return obj ? obj.value : "";
      },
    },
  };
  const methods = {
    // 字典
    dicts(keys = []) {
      keys.forEach((item) => {
        const label = (() => {
          let obj = {};
          // 一种是下标就是key 另一种是自定义key
          if (Array.isArray(_enum[item])) {
            _enum[item].forEach((value, index) => {
              obj[index] = getObj(index, value, index);
            });
            data.dict[item] = _enum[item];
            return obj;
          } else {
            const dict = [];
            Object.keys(_enum[item]).forEach((key, index) => {
              dict.push(_enum[item][key]);
              obj[key] = getObj(key, _enum[item][key], index);
            });
            data.dict[item] = dict;
            return obj;
          }
        })();
        data.dict.label[item] = label;
        // 获取对象
        function getObj(key, value, index) {
          return { key, value, index };
        }
      });
    },
    // 弹框
    showtoast,
    // 获取当前年月日
    getCurrentDate,
    // 刷新
    refresherrefresh() {
      console.log("刷新");
      data.triggered.value = true;
      setTimeout(() => {
        data.triggered.value = false;
      }, 1000);
    },
    // 加载
    scrolltolower() {
      let page = data.page.value.page;
      page++;
      const res = {
        data: page <= 3 ? [1, 2] : [],
      };
      if (res.data.length) {
        data.page.value.page = page;
      }
      console.log(data.page.value.page);
    },
    // // 计算
    calc,
    fmt,
  };
  const atom = Object.assign(data, methods);
  Object.freeze(atom);
  return atom;
};

// 获取当前年月日
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
// 标题
export function showtoast(title) {
  uni.showToast({
    title: title || "标题",
    icon: "none",
    duration: 2000,
  });
}

// 计算
export const calc = a_calc.calc;
// 数字格式化
export const fmt = a_calc.fmt;
