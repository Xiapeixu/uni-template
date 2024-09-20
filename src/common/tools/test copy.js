import * as api from "@/http/api";
import _enum from "./atom-enum";

export default class Atom {
  // 设置默认值
  apiMethod = ""; // 请求接口
  current = Atom.current_in.value; // 当前列表
  dataArray = []; // 展示列表
  triggered = {}; // 多类型加载状态
  dict = {}; // 字典
  typeKey = ""; // 多列表字典key
  /**
   * @param {atom_options} optison
   */
  constructor(options) {
    // atom 实例 需要暂存 解决私有方法中无法调用私有属性
    const _this = this;
    // 获取所有key
    const keys = { ...this, ...options };
    for (const key in keys) {
      Atom.addGetSetMethod(_this, key, options[key]);
    }
    _this.init(options);
  }
  async init(options) {
    if (options.dicts) {
      this.dicts(options.dicts);
    }
  }
  // 初始化字典
  dicts(keys) {
    keys.forEach((key) => {
      const enumObj = _enum[key];
      const type = Object.prototype.toString.call(enumObj);
      let list = [];
      switch (type) {
        case "[object Array]":
          break;
        case "[object Map]":
          for (const [key, value] of enumObj) {
            list.push({
              label: value,
              value: key,
            });
          }
          break;
        case "[object Object]":
          break;
        default:
          console.error(key, "在 src/compoents/enum.js 文件中,数据格式错误！只支持Array、Object、Map");
          break;
      }
      this.dict[key] = list;
    });
  }
  static addGetSetMethod(_this, key, value) {
    if (!Atom[`${key}_in`]) {
      if (typeof _this[key] == "function") {
        _this[key](value);
      } else if (!isEmpty(value)) {
        _this[key] = value;
      }
    } else {
      switch (key) {
        case "dataArray":
          Object.defineProperty(_this, key, {
            get() {
              return Atom.dataArray_in.value.get(Atom.current);
            },
            set(val) {
              Atom.dataArray_in.value.set(Atom.current, val);
            },
          });
          break;
        default:
          console.log(key, "==========", value);
          Object.defineProperty(_this, key, {
            get() {
              return Atom[`${key}_in`].value;
            },
            set(val) {
              Atom[`${key}_in`].value = val;
            },
          });
          break;
      }
    }
  }
}
Atom.current_in = ref(0);
Atom.query_in = ref({});
Atom.dataArray_in = ref(new Map());
Atom.triggered_in = ref({});
// Atom.dict_in = ref({});
