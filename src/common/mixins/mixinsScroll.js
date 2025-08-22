// 混入
export default ({
  createdRequest = true, // 是否初始化请求数据
  apiMethod = () => {}, // 接口
  query = {}, // 查询参数
  current = null, // 当前选中
  // 分页参数 默认值
  pageKey: { num = 1, numKey = "pageNum", size = 10, sizeKey = "pageSize" } = {},
  typeList = [], // 多个列表类型
  dataKey = "list", // 接口返回的结构
  onlyValue = "id", // 对象中的唯一值
} = {}) => {
  // 属性
  const data = {
    options: ref({
      createdRequest, // 是否初始化请求数据
      apiMethod, // 接口
      query, // 查询参数
      typeList, // 多个列表类型
      dataKey, // 接口返回的结构
      onlyValue, // 对象中的唯一值
      current, // 当前选中
      currentItem: {}, // 当前选中
      // 分页参数 默认值
      pageKey: { num, numKey, size, sizeKey },
      pageParams: {}, // 分页参数
      // 列表数据
      dataArray: {},
      // 刷新状态
      refresherTriggered: {},
      // 加载状态
      loadMoreStatus: {},
      // 是否需要去重
      isDuplicate: {},
    }),
  };
  const ref_data = unref(data.options);
  // 方法
  const methods = {
    /**
     * 获取列表
     * @param {*} flag 是否重置列表
     */
    async getList(flag = false) {
      let isReset = flag;
      try {
        const { data } = await ref_data.apiMethod({ ...ref_data.query, ...ref_data.pageParams[ref_data.current] });
        // 有些接口可能是不同的结构
        const _data = ref_data.dataKey ? data[ref_data.dataKey] : data;
        // 请求数据为空时
        if (isEmpty(_data)) {
          if (isReset) {
            methods.operationLoadMoreStatus(0);
            ref_data.dataArray[ref_data.current] = _data;
          } else {
            methods.operationPage(1);
            methods.operationLoadMoreStatus(2);
          }
        } else {
          // 直接赋值时要用的数据
          let assignList = _data;
          // 需要去重
          if (ref_data.isDuplicate[ref_data.current]) {
            // 将列表数据和请求数据的合并去重
            const map = new Map(ref_data.dataArray[ref_data.current].map((item) => [item[ref_data.onlyValue], item]));
            assignList.forEach((item) => {
              map.set(item[ref_data.onlyValue], { ...(map.get(item[ref_data.onlyValue]) || {}), ...item });
            });
            // 排序?
            assignList = [...map.values()];
            isReset = true;
          }
          // 列表数据为空或者是刷新时 直接赋值
          if (isEmpty(ref_data.dataArray[ref_data.current]) || isReset) {
            ref_data.dataArray[ref_data.current] = assignList;
          } else {
            // 列表数据有值时就是合并
            ref_data.dataArray[ref_data.current] = ref_data.dataArray[ref_data.current].concat(_data);
          }
          // 请求数据长度小于分页大小时
          if (_data.length < ref_data.pageParams[ref_data.current][ref_data.pageKey.sizeKey]) {
            methods.operationLoadMoreStatus(2);
            methods.operationPage(1);
            // 去重
            ref_data.isDuplicate[ref_data.current] = true;
          } else {
            ref_data.isDuplicate[ref_data.current] = false;
          }
        }
      } catch (error) {
        // 请求失败
        console.error(msg);
      }
    },
    // 初始化
    async init() {
      // 跳转到第一页 并重置列表
      methods.operationPage(2, 1);
      ref_data.dataArray[ref_data.current] = [];
      methods.getList();
    },
    // 刷新
    async refresherrefresh() {
      try {
        methods.operationRefresherTriggered(true);
        // 跳转到第一页 并重置列表
        methods.operationPage(2, 1);
        // 取消去重
        ref_data.isDuplicate[ref_data.current] = false;
        // 可以加载更多
        methods.operationLoadMoreStatus(1);
        await methods.getList(true);
      } catch (error) {
        console.error(error);
      } finally {
        methods.operationRefresherTriggered(false);
      }
    },
    // 加载
    async scrolltolower() {
      if (ref_data.loadMoreStatus[ref_data.current] === 2) {
        return;
      }
      methods.operationPage(0);
      methods.operationLoadMoreStatus(1);
      methods.getList();
    },
    // 没有更多数据时，再次加载
    async reScrolltolower() {
      methods.operationLoadMoreStatus(1);
      methods.scrolltolower();
    },
    // 搜索
    async searchList() {
      // 跳转到第一页 并重置列表
      methods.operationPage(2, 1);
      // 取消去重
      ref_data.isDuplicate[ref_data.current] = false;
      methods.getList(true);
    },
    /**
     * 操作分页
     * @param {*} status - 操作类型  0:加1、1:减1、2:跳转某个页面
     * @param {*} num - 要跳转的页码,当status是2的时候需要传入
     */
    operationPage(status, num) {
      switch (status) {
        case 0:
          // 页码加1
          ++ref_data.pageParams[ref_data.current][ref_data.pageKey.numKey];
          break;
        case 1:
          // 页码最小为1
          if (ref_data.pageParams[ref_data.current][ref_data.pageKey.numKey] > 1) {
            --ref_data.pageParams[ref_data.current][ref_data.pageKey.numKey];
          }
          break;
        case 2:
          // 跳转某个页
          ref_data.pageParams[ref_data.current][ref_data.pageKey.numKey] = num;
          break;
      }
    },
    /**
     * 操作加载状态
     * @param {*} status  - 加载状态0:首次进来不显示、1:加载中、2:没有更多数据
     */
    operationLoadMoreStatus(status) {
      ref_data.loadMoreStatus[ref_data.current] = status;
    },
    /**
     * 操作刷新状态
     * @param {*} status - 操作类型 true:正在刷新、false:没有刷新
     */
    operationRefresherTriggered(status) {
      ref_data.refresherTriggered[ref_data.current] = status;
    },
    // 设置当前选中
    setCurrent(current) {
      ref_data.current = current;
    },
    /**
     * 初始化分页参数
     * @param {*} current 某个类型的下标
     */
    initPageParams(current) {
      ref_data.pageParams = {
        ...ref_data.pageParams,
        [current]: {
          [ref_data.pageKey.numKey]: ref_data.pageKey.num,
          [ref_data.pageKey.sizeKey]: ref_data.pageKey.size,
        },
      };
    },
    // 设置分页参数
    setPageKey(current, options = {}) {
      const { numKey, sizeKey } = ref_data.pageKey;
      const { numKey: newNumKey, sizeKey: newSizeKey } = options;
      if (!ref_data.pageParams[current][newNumKey]) {
        ref_data.pageParams[current] = {
          [newNumKey]: ref_data.pageParams[current][numKey],
          [newSizeKey]: ref_data.pageParams[current][sizeKey],
        };
      }
      ref_data.pageKey = { ...ref_data.pageKey, ...options };
    },
    // 获取分页参数
    getPageParams() {
      const pageParams = ref_data.pageParams[ref_data.current];
      const { numKey, sizeKey } = ref_data.pageKey;
      return { [numKey]: pageParams[numKey], [sizeKey]: pageParams[sizeKey] };
    },
    /**
     * 设置搜索条件
     * @param {Object} query 搜索条件
     * @param {Boolean} isQuery 是否立即搜索 默认false
     */
    setQuery(query, isQuery = false) {
      ref_data.query = { ...ref_data.query, ...query };
      if (isQuery) {
        methods.searchList();
      }
    },
    /**
     * 删除搜索条件
     * @param {*} keys 要删除的健值
     */
    delQuery(keys = []) {
      keys.forEach((key) => {
        delete ref_data.query[key];
      });
    },
  };
  // 监听
  watch(
    () => ref_data.current,
    () => {
      ref_data.currentItem = ref_data.typeList[ref_data.current];
    }
  );
  // 如有多个列表current默认为类型数组中的第一个
  ref_data.current = 0;
  if (!isEmpty(ref_data.typeList)) {
    ref_data.typeList.forEach((_item, index) => {
      methods.initPageParams(index);
    });
  } else {
    methods.initPageParams(ref_data.current);
  }
  // 导出属性
  const mixins = Object.assign(data, methods);
  Object.freeze(mixins);
  if (ref_data.createdRequest) {
    // 初始化请求数据
    methods.init();
  }
  return mixins;
};
