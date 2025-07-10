import atomEnum from "./atom-enum";
// 混入
export default (componentsOptions = {}) => {
  // 属性
  const data = {
    componentsOptions: ref({
      typeKey: null, // enum中的key
      current: 0, // 当前选中
      apiMethod: () => {}, // 接口请求情
      createdRequest: true, // 是否开始就请求数据
      query: {}, // 搜索条件
      ...componentsOptions, // 上面是允许传入修改的 下面是不允许修改的
      dataArray: [], // 数据列表
      scrollStatus: {}, // 刷新和加载 状态
    }),
  };
  const ref_componentsOptions = unref(data.componentsOptions);
  // 方法
  const methods = {
    refresherrefresh() {
      console.log(ref_componentsOptions.query);
      ref_componentsOptions.apiMethod(ref_componentsOptions.query);
      // data.componentsOptions.value.apiMethod
    },
  };
  const mixins = Object.assign(data, methods);
  Object.freeze(mixins);
  // 初始化
  if (data.componentsOptions.createdRequest) {
    methods.refresherrefresh();
  }
  // ref_componentsOptions.typeKey
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
