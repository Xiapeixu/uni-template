import atomEnum from "./atom-enum";
// 混入
export default (options = { componentsOptions: {} }) => {
  // 属性
  const data = {
    // 查询条件
    query: ref({}),
    // 表单
    form: ref({}),
    // 字典
    dict: ref({}),
    // 关于组件的属性
    componentsOptions: ref({
      typeKey: null, // enum中的key
      current: null, // 当前选中
      apiMethod: () => {}, // 接口请求情
      ...options.componentsOptions, // 上面是允许传入修改的 下面是不允许修改的
      dataArray: {}, // 数据列表
      triggered: {}, // 刷新加载状态
      loadMoreTriggered: {}, // 加载更多状态
      query: {}, // 加载更多状态
    }),
    /**
     * 当前选中的类型对象
     */
    currentObj: computed({
      get() {
        const index = data.componentsOptions.value.current;
        const key = data.componentsOptions.value.typeKey;
        return {
          ...data.dict.value[key][index],
          index,
        };
      },
    }),
  };
  // 方法
  const methods = {
    /** 初始化字典值
     * @param {string[]} keys enum.js里的键值 (可多个)
     */
    dicts(keys = []) {
      keys.forEach((item) => {
        const dataList = atomEnum[item];
        const dataType = Object.prototype.toString.call(dataList);
        let list = [];
        switch (dataType) {
          case "[object Array]":
            list = dataList.map((label, value) => {
              return { label, value };
            });
            break;
          case "[object Object]":
            break;
          case "[object Map]":
            break;
        }
        // 默认选中第一个
        if (!isEmpty(list)) {
          data.componentsOptions.value.current = 0;
        }
        data.dict.value[item] = list;
      });
      // 设置列表默认刷新状态
      const c_o = data.componentsOptions.value;
      if (c_o.typeKey) {
        data.dict.value[c_o.typeKey].forEach((item) => {
          // 初始化数据为空数组
          c_o.dataArray[item.value] = [];
          // 初始化刷新状态为false
          c_o.triggered[item.value] = false;
          // 初始化加载更多
          c_o.loadMoreTriggered[item.value] = true;
          // 初始化分页属性
          c_o.query[item.value] = { size: 1, current: 1 };
        });
      }
    },
    async getData() {
      const c_o = data.componentsOptions.value;
      c_o.query[c_o.current].current = 1;
      const { code, data: _data, msg } = await c_o.apiMethod({ ...data.query.value, ...c_o.query[c_o.current] });
      if (code === 200) {
        c_o.dataArray[c_o.current] = _data.list;
      } else {
        showtoast(msg);
      }
    },
    // scroll刷新事件
    async refresherrefresh() {
      const c_o = data.componentsOptions.value;
      c_o.triggered[c_o.current] = true;
      await methods.getData();
      c_o.triggered[c_o.current] = false;
      c_o.loadMoreTriggered[c_o.current] = true;
    },
    // 加载更多 isAgain是否重新加载最后一页
    // 滚动到下面的就不重新加载，点击底部文字重新加载
    async scrolltolower(isAgain = false) {
      throttle(async () => {
        const c_o = data.componentsOptions.value;
        if (isAgain) {
          c_o.loadMoreTriggered[c_o.current] = true;
        } else {
          if (!c_o.loadMoreTriggered[c_o.current]) return;
        }
        c_o.query[c_o.current].current++;
        const { code, data: _data, msg } = await c_o.apiMethod({ ...data.query.value, ...c_o.query[c_o.current] });
        if (code === 200) {
          if (isEmpty(_data.list)) {
            c_o.loadMoreTriggered[c_o.current] = false;
            c_o.query[c_o.current].current--;
          } else {
            c_o.dataArray[c_o.current] = c_o.dataArray[c_o.current].concat(_data.list);
          }
        } else {
          showtoast(msg);
          c_o.query[c_o.current].current--;
        }
      });
    },
  };
  const mixins = Object.assign(data, methods);
  Object.freeze(mixins);
  watch(
    () => data.componentsOptions.value.current,
    async (newVal) => {
      if (isEmpty(data.componentsOptions.value.dataArray[newVal])) {
        await methods.refresherrefresh();
      }
    }
  );
  return mixins;
};
