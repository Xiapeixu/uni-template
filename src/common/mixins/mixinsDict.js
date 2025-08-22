import atomEnum from "@/common/tools/dict";

export default (keys = [], { valueKey = "value", labelKey = "label" } = {}) => {
  let dicts = {
    label: {},
    value: {},
  };
  keys.forEach((key) => {
    dicts[key] = atomEnum[key];
    atomEnum[key].forEach((item) => {
      dicts.label[key] = {
        ...dicts.label[key],
        [item[valueKey]]: item[labelKey],
      };
      dicts.value[key] = {
        ...dicts.value[key],
        [item[valueKey]]: item,
      };
      // 页面初始化有些类型值是异步获取的，给一个默认值，避免页面初始化报错
      setDefault("");
      setDefault(null);
      setDefault(undefined);
      function setDefault(key2) {
        dicts.label[key][key2] = {};
        dicts.value[key][key2] = {};
      }
    });
  });
  return Object.freeze(dicts);
};
