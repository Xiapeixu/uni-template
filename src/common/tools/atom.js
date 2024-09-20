import { ref } from "vue";
import _enum from "./atom-enum";
import { isEmpty } from "./util";

/**
 * @param {atom_options} options 字典中的键值
 */
export default (options = {}) => {
  const unref = ["apiMethod", "util_options", "init_options"];
  Object.keys(options).map((item) => {
    if (unref.includes(item)) return;
    options[item] = isRef(options[item]) ? options[item] : ref(options[item]);
  });
  const data = {
    /**
     * @type {(param?: any)=>Promise<any>}
     */
    apiMethod: null,
    // 属性
    util_options: {
      refresh_time: 3000,
    },
    page: ref({
      // 页码
      page: 1,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
    }),
    // 查询参数
    query: ref({}),
    // 多列表时当前选中列表的关键值
    current: ref(0),
    // 表单
    form: ref({}),
    // 列表类型 用于初始化多个列表的下拉状态
    init_options: {
      dicts: [],
      key: "",
      init_triggered_key: "",
    },
    // 初始化参数 上面是可初始化 下面是不可初始化
    ...options,
    // 数据列表
    dataArray: ref([]),
    // 数据列表Map
    dataArrayMap: ref(new Map()),
    // 滚动列表下拉状态
    triggered: ref({}),
    // 字典值
    dict: {
      label: {},
      /**
       * 通过值获取下标
       * @type {getIndexByKey}
       */
      getIndexByKey(dict_key, key) {
        const obj = data.dict.label[dict_key][key];
        return obj ? obj.index : "";
      },
      /**
       * 通过键值获取值
       * @type {getValueByKey}
       */
      getValueByKey(dict_key, key) {
        const obj = data.dict.label[dict_key][key];
        return obj ? obj.value : "";
      },
      /**
       * 获取当前对象
       * @type {getObject}
       */
      getObject(dict_key, key) {
        return data.dict.label[dict_key][key];
      },
      /**
       * 根据index获取对象
       * @type {getObjectByIndex}
       */
      getObjectByIndex(dict_key, index) {
        return Object.values(data.dict.label[dict_key]).filter((item) => {
          return item.index == index;
        })[0];
      },
    },
  };
  const methods = {
    /** 初始化字典值
     * @param {string[]} keys enum.js里的键值 (可多个)
     */
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
    /** 初始化刷新状态 多个类型列表时使用
     * @param {any[]} list 多个类型列表
     * @param {string|number} key 列表绑定键值
     */
    initTriggered(list = [], key) {
      list.forEach((item, index) => {
        if (key) {
          data.triggered.value[item.key] = false;
        } else {
          data.triggered.value[index] = false;
        }
      });
    },
    // 刷新
    async refresherrefresh() {
      const current = data.current.value;
      data.triggered.value[current] = true;
      setTimeout(() => {
        data.triggered.value[current] = false;
      }, data.util_options.refresh_time);
      const res = await data.apiMethod(methods.getParams());
      data.triggered.value[current] = false;
      if (res.code != 200) return;
      methods.isMore() ? data.dataArrayMap.value.set(current, res.data) : (data.dataArray.value = res.data);
    },
    // 加载
    async scrolltolower() {
      const current = data.current.value;
      data.page.value.page++;
      const res = await data.apiMethod(methods.getParams());
      if (res.code != 200) return;
      if (res.data.length) {
        const list = (() => {
          const temp_list = methods.isMore() ? data.dataArrayMap.value.get(current) : data.dataArray.value;
          return temp_list.concat(res.data);
        })();
        methods.isMore() ? data.dataArrayMap.value.set(current, list) : (data.dataArray.value = list);
      } else {
        data.page.value.page--;
      }
    },
    // 是否多个列表
    isMore() {
      return Object.keys(data.triggered.value).length > 1;
    },
    // 获取列表请求参数
    getParams() {
      return { ...data.page.value, ...data.query.value };
    },
    // ...util,
  };
  const atom = Object.assign(data, methods);
  Object.freeze(atom);
  if (!isEmpty(atom.init_options.dicts)) {
    atom.dicts(atom.init_options.dicts);
  }
  if (atom.init_options.init_triggered_key) {
    atom.initTriggered(atom.dict[atom.init_options.init_triggered_key], atom.init_options.key);
  }
  return atom;
};
