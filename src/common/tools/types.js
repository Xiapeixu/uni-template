/**
 * 分页组件参数定义
 * @typedef {Object} scrollMixins
 * @property {Object} options - 是否初始化请求数据
 * @property {boolean} options.createdRequest - 是否初始化请求数据
 * @property {Function} options.apiMethod - 接口
 * @property {Object} options.query - 查询条件
 * @property {Array} options.typeList - 类型
 * @property {number|string} options.current - 当前选中的
 * @property {Object} options.currentItem - 当前选中的
 * @property {Object} options.pageKey - 分页参数
 * @property {number} options.pageKey.num - 页码
 * @property {number} options.pageKey.size - 数量
 * @property {string} options.pageKey.numKey - 页码键值
 * @property {string} options.pageKey.sizeKey - 数量键值
 * @property {Object} options.refresherTriggered - 刷新状态
 * @property {Object} options.loadMoreStatus - 加载状态
 * @property {Function} refresherrefresh - 刷新函数
 * @property {Function} scrolltolower - 加载函数
 * @property {Function} reScrolltolower - 没有更多数据时，再次加载
 */
export {}; // 必须有导出语句
