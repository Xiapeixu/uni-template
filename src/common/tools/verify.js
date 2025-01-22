/**
 * 验证电子邮箱格式
 */
export function isEmail(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
export function isMobile(value) {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
}
/**
 * 是否固定电话
 */
export function isLandline(value) {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}
/**
 * 验证URL格式
 */
export function isUrl(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(
    value
  );
}

/**
 * 验证日期格式
 */
export function isDate(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (isNumber(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证身份证号码
 */
export function isIdCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
export function isCarNo(value) {
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
 * 金额,只允许2位小数
 */
export function isAmount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
export function isChinese(value) {
  const reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 验证十进制数字
 */
export function isNumber(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

// 判断是否为空
export function isEmpty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0) return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (value === 0 || isNaN(value)) return true;
      break;
    case "object":
      if (value === null || value.length === 0) return true;
      for (const i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
export function jsonString(value) {
  if (typeof value === "string") {
    try {
      const obj = JSON.parse(value);
      if (typeof obj === "object" && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}
