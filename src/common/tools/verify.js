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
 * 验证身份证号码 假校验
 */
export function isIdCardFalse(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 校验中国大陆身份证号码 真校验
 * @param {string} idCard 身份证号码
 * @returns {boolean} 是否有效
 */
export function isIdCard(idCard) {
  // 基本校验
  if (typeof idCard !== "string") return false;

  // 18位和15位身份证号码正则
  const reg18 = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  const reg15 = /^[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/;

  // 校验格式
  if (!reg18.test(idCard) && !reg15.test(idCard)) {
    return false;
  }

  // 如果是15位，可以在这里转换为18位进行校验（可选）
  if (idCard.length === 15) {
    // 这里可以添加15位转18位的逻辑
    // 但通常15位身份证已经不再使用，直接返回false
    return false;
  }

  // 18位身份证校验码校验
  if (idCard.length === 18) {
    // 前17位
    const str = idCard.substring(0, 17);
    // 校验码
    const checkCode = idCard.substring(17).toUpperCase();

    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码对应值
    const checkCodeMap = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(str.charAt(i), 10) * factor[i];
    }

    const mod = sum % 11;
    const expectedCheckCode = checkCodeMap[mod];

    if (checkCode !== expectedCheckCode) {
      return false;
    }

    // 校验日期是否有效
    const year = parseInt(idCard.substring(6, 10), 10);
    const month = parseInt(idCard.substring(10, 12), 10) - 1; // 月份是0-11
    const day = parseInt(idCard.substring(12, 14), 10);
    const date = new Date(year, month, day);

    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      return false;
    }
  }

  return true;
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
