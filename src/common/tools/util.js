/**
 * 获取当前年月日
 * @returns 当前年月日
 */
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
/**
 * 弹框
 * @param {*} title 标题
 */
export function showtoast(title) {
  uni.showToast({
    title: title || "标题",
    icon: "none",
    duration: 2000,
  });
}
/**
 * js计算精准度问题
 * @param {number} num 精确识别的数
 * @param {number} digit 乘以10的n次幂
 * @return 精准计算后的值
 */
export function formatNum(num, digit = 2) {
  const pow = Math.pow(10, digit);
  return parseInt(num * pow, 10) / pow;
}
// 解析URL 参数
export function getUrlParam(name) {
  const reg = new RegExp("[?&]" + name + "=([^?&]*)(&?)");
  const str = window.location.href.match(reg);
  if (str) {
    return str[1];
  }
}
// 判断是否为空
export function isEmpty(data) {
  let flag = false;
  if (data === undefined || data === null) {
    return true;
  }
  const type = Object.prototype.toString.call(data);
  switch (type) {
    case "[object Array]":
      flag = !!!data.length;
      break;
    case "[object Object]":
      flag = !!!Object.keys(data).length;
      break;
    // default:
    //   flag = false;
    //   break;
  }
  return flag;
}
// 是否未定义
export function isUndefined(data) {
  return data === undefined || data === null ? true : false;
}

// 获取节点属性
export function getDocument(component) {
  return new Promise((reslove, reject) => {
    try {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(component)
        .boundingClientRect((data) => {
          reslove(data);
        })
        .exec();
    } catch (error) {
      reject(error);
    }
  });
}

// 获取token
export function getToken() {
  return uni.getStorageSync("token") ?? "";
}
