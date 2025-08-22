// 事件池
const eventMap = new Map();
// 事件总线
let eventBus = {};
export function initEvents() {
  // 监听
  function on(event, callback) {
    eventMap.set(event, callback);
  }
  // 移除
  function off(event) {
    eventMap.delete(event);
  }
  // 发送
  function emit(event, ...args) {
    if (!eventMap.get(event)) {
      console.error(`${event}事件不存在`);
      return;
    }
    eventMap.get(event)(...args);
  }
  // 清空
  function clear() {
    eventMap.clear();
  }
  eventBus = { on, off, emit, clear };
}
/**
 *
 * @returns {{on: Function, off: Function,emit: Function,clear: Function}} 事件总线
 */
export function useEvents() {
  return eventBus;
}
