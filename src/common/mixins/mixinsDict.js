import atomEnum from "@/common/tools/dict";

export default (keys = [], { valueKey = "value", labelKey = "label" } = {}) => {
  let dicts = {
    label: {},
  };
  keys.forEach((key) => {
    dicts[key] = atomEnum[key];
    atomEnum[key].forEach((item) => {
      dicts.label[key] = {
        ...dicts.label[key],
        [item[valueKey]]: item[labelKey],
      };
    });
  });
  return Object.freeze(dicts);
};
