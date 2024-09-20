/** 字典对象属性
 * @typedef {Object} dictObj
 * @property {number} index 下标
 * @property {string|number} key 键值
 * @property {string} value 值
 */

/** 工具属性
 * @typedef {Object} util_options
 * @property {number} refresh_time 刷新动画关闭时间单位毫秒 默认3000
 *
 */

/** atom可初始化属性
 * @typedef {Object} atom_options
 * @property {string} apiName 列表接口名 注: http/api.js 文件里导出名
 * @property {util_options} atom_options 内置属性
 */

/** 通过值获取下标
 * @callback getIndexByKey
 * @param {string} dict_key 字典中的键值
 * @param {string | number} key 值的键值 如：templateObject:{0101:'农产品批发'} 就传0101
 * @return {number} 下标
 */
/** 通过键值获取值
 * @callback getValueByKey
 * @param {string} dict_key 字典中的键值
 * @param {string | number} key 值的键值 如：templateObject:{0101:'农产品批发'} 就传0101 如果是['成功','失败'] 就传下标
 * @return {string} 值
 */
/** 获取当前对象
 * @callback getObject
 * @param {string} dict_key 字典中的键值
 * @param {string | number} key 值的键值 如：templateObject:{0101:'农产品批发'} 就传0101
 * @return {dictObj} 当前对象
 */
/** 根据index获取对象
 * @callback getObjectByIndex
 * @param {string} dict_key 字典中的键值
 * @param {number} index 对应的下标
 * @return {dictObj} 当前对象
 */

/** 字典工具属性
 * @typedef dict_type
 * @property {Object} label 字典对象
 * @property {getIndexByKey} getIndexByKey 通过值获取下标
 * @property {getValueByKey} getValueByKey 通过键值获取值
 * @property {getObject} getObject 获取当前对象
 * @property {getObjectByIndex} getObjectByIndex 根据index获取对象
 */
/**
 * @typedef {Object} page_options
 * @property {number} page 页码
 * @property {number} size 每页数据条数
 * @property {number} total 总数据条数
 */
/**
 * @typedef {Object} init_options
 * @property {string[]} dicts 初始化字典值 enum.js里的键值 (可多个)
 * @property {string} init_triggered_key 字典中的那个值作为列表类型enum.js里的键值 单个
 * @property {string} key 字典中自定义键值
 */
/** atom属性和方法
 * @typedef {Object} atom
 * @property {(param?: any)=>Promise<any>} apiMethod 列表接口方法 注: http/api.js里的方法
 * @property {util_options} util_options 内置属性
 * @property { globalThis.Ref<page_options>} page 表单
 * @property {globalThis.Ref<{}>} query 查询参数
 * @property {globalThis.Ref<number>} current 多列表时当前选中列表的关键值
 * @property {globalThis.Ref<{}>} from 表单
 * @property {globalThis.Ref<{}>} init_options 表单
 * @property {gloalThis.Ref<any[]>} dataArray 数据列表
 * @property {globalThis.Ref<Map<any, any>>} dataArrayMap 数据列表Map
 * @property {globalThis.Ref<{}>} triggered 滚动列表下拉状态
 * @property {dict_type} dict 字典值
 * @property {(keys:string[])=>viod} dicts 初始化字典值 enum.js里的键值 (可多个)
 * @property {(list: any[], key: (string|number))=>void} initTriggered 初始化刷新状态 多个类型列表时使用
 * @property {(current: (string|number))=>Promise<void>} refresherrefresh 列表刷新
 * @property {(current: (string|number))=>Promise<void>} scrolltolower 列表加载
 * @property {()=>boolean} isMore 是否多个列表
 * @property {()=>Object} getParams 获取请求参数 atom.query+atom.page里的所有参数
 *
 */

/** 这样写不会有描述暂时不知道怎么解决
 * @typedef {{ label: {};
 * getIndexByKey(dict_key: string, key: string | number): number;
 * getValueByKey(dict_key: string, key: string | number): string;
 * getObject(dict_key: string, key: string | number): dictObj;
 * getObjectByIndex(dict_key: string, index: number): dictObj;
 * }} demo_test
 */

/**
 * @typedef {Object} AtomClass
 * @property {string} name - The name of the class.
 * @property {number} age - The age of the class.
 * @method sayHello - A method that says hello.
 */
