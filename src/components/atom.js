export default function atom() {
  const data = {
    page: {
      // 页码
      page: 1,
      // 每页数据条数
      size: 10,
      // 总数据条数
      total: 0,
    },
    // 查询参数
    query: {},
    // 提交参数
    form: {},
  };
  const methods = {
    showtoast(title) {
      uni.showToast({
        title: title || "标题",
        icon: "none",
        duration: 2000,
      });
    },
  };
  const atom = Object.assign(data, methods);
  Object.freeze(atom);
  return atom;
}
