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
/**
 * 把错误的数据转正 跟上面用途一样
 * @private
 * @example strip(0.09999999999999998)=0.1
 */
export function strip(num, precision = 15) {
  return +parseFloat(Number(num).toPrecision(precision));
}

// 解析URL 参数
export function getUrlParam(name) {
  const reg = new RegExp("[?&]" + name + "=([^?&]*)(&?)");
  const str = window.location.href.match(reg);
  if (str) {
    return str[1];
  }
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

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
export function getPx(value, unit = false) {
  if (isNumber(value)) {
    return unit ? `${value}px` : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
  }
  return unit ? `${parseInt(value)}px` : parseInt(value);
}

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$uv.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
export function sleep(value = 30) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, value);
  });
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
export function trim(str, pos = "both") {
  str = String(str);
  if (pos == "both") {
    return str.replace(/^\s+|\s+$/g, "");
  }
  if (pos == "left") {
    return str.replace(/^\s*/, "");
  }
  if (pos == "right") {
    return str.replace(/(\s*$)/g, "");
  }
  if (pos == "all") {
    return str.replace(/\s+/g, "");
  }
  return str;
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
export function addStyle(customStyle, target = "object") {
  // 字符串转字符串，对象转对象情形，直接返回
  if (isEmpty(customStyle) || (typeof customStyle === "object" && target === "object") || (target === "string" && typeof customStyle === "string")) {
    return customStyle;
  }
  // 字符串转对象
  if (target === "object") {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    const styleArray = customStyle.split(";");
    const style = {};
    // 历遍数组，拼接成对象
    for (let i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        const item = styleArray[i].split(":");
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  let string = "";
  for (const i in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
    string += `${key}:${customStyle[i]};`;
  }
  // 去除两端空格
  return trim(string);
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
export function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
  let date;
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date();
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
    date = new Date(dateTime * 1000);
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime));
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
    date = new Date(dateTime.replace(/-/g, "/"));
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime);
  }

  const timeSource = {
    y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString().padStart(2, "0"), // 月
    d: date.getDate().toString().padStart(2, "0"), // 日
    h: date.getHours().toString().padStart(2, "0"), // 时
    M: date.getMinutes().toString().padStart(2, "0"), // 分
    s: date.getSeconds().toString().padStart(2, "0"), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
    if (ret) {
      // 年可能只需展示两位
      const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
    }
  }

  return formatStr;
}

/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {Boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
export function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
  const prefix = isPrefix ? "?" : "";
  const _result = [];
  if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1) arrayFormat = "brackets";
  for (const key in data) {
    const value = data[key];
    // 去掉为空的参数
    if (["", undefined, null].indexOf(value) >= 0) {
      continue;
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case "indices":
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`);
          }
          break;
        case "brackets":
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
          break;
        case "repeat":
          // 结果: ids=1&ids=2&ids=3
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`);
          });
          break;
        case "comma":
          // 结果: ids=1,2,3
          let commaStr = "";
          value.forEach((_value) => {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(`${key}=${commaStr}`);
          break;
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
      }
    } else {
      _result.push(`${key}=${value}`);
    }
  }
  return _result.length ? prefix + _result.join("&") : "";
}
