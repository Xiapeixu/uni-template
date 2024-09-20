import * as api from "@/http/api";
import _enum from "./atom-enum";

export default class Atom {
  /**
   * @param {atom_options} optison
   */
  constructor(options) {
    for (const key in Atom.refData.value) {
      this[key] = refData(key);
    }
    // 获取所有key
    const keys = { ...this, ...options };
    for (const key in keys) {
      this.addGetSetMethod(key, options[key]);
    }
    this.init(options);
    watch(
      () => refData("current"),
      () => {
        this.setCurrentDict();
        if (isEmpty(this.dataArray[this.current])) {
          this.setList(this);
        }
      }
    );
  }
  async init(options) {
    // 初始化页码
    this.initPage();
    if (options.dicts) {
      this.dicts(options.dicts);
      this.setCurrentDict();
    }
    this.setList(this);
  }
  // 初始化页码
  initPage() {
    const pageNum = this.pageKey.pageNum;
    const pageSize = this.pageKey.pageSize;
    this.query[pageNum] = 1;
    this.query[pageSize] = 10;
  }
  // 设置当前选中的类型对象
  setCurrentDict() {
    if (this.typeKey) {
      this.currentDict = this.dict[this.typeKey][this.current];
    }
  }
  async refresherrefresh() {
    const current = this.current;
    try {
      this.triggered[current] = true;
      await this.setList();
    } catch (error) {
      console.log(error);
    } finally {
      this.triggered[current] = false;
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
            list.push({ label: value, value: key });
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
  async setList() {
    const data = await this.fetch();
    this.dataArray[this.current] = data;
  }
  // 请求接口
  async fetch() {
    try {
      const { data } = await api[this.apiMethod](this.getParams());
      return data;
    } catch (error) {
      console.log("请求接口出错", error);
    }
  }
  // 初始化参数
  addGetSetMethod(key, value) {
    if (isUndefined(refData(key))) {
      if (typeof this[key] == "function") {
        this[key](value);
      } else if (!isEmpty(value)) {
        this[key] = value;
      }
    } else {
      switch (key) {
        case "dataArray":
          Object.defineProperty(this, key, {
            get() {
              return refData(key);
            },
            set(val) {
              let temp_data = refData(key);
              temp_data = val;
            },
          });
          break;
        default:
          if (!isEmpty(value)) {
            setRefData(key, value);
          }
          Object.defineProperty(this, key, {
            get() {
              return refData(key);
            },
            set(new_value) {
              setRefData(key, new_value);
            },
          });
          break;
      }
    }
  }
  getParams() {
    return this.query;
  }
  // 设置默认值
  apiMethod = ""; // 请求接口
  dict = {}; // 字典
  typeKey = ""; // 多列表字典key
  pageKey = {
    // 分页参数名
    pageNum: "page",
    pageSize: "size",
  };
}
Atom.refData = ref({
  current: 0, // 当前选中的下标
  currentDict: {}, // 当前选中的类型属性
  query: {}, // 查询参数
  dataArray: {}, // 数据列表 多个
  triggered: {}, // 刷新状态
});
function refData(key) {
  return Atom.refData.value[key];
}
function setRefData(key, value) {
  Atom.refData.value[key] = value;
}
