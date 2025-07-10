import { h, render } from "vue";

// 提示框
export function openModal({
  // 图标类型 "warning" | "success" | "fail" | "none"
  type = "warning",
  // 图标
  icon = "",
  // 是否自动隐藏
  isAutoHide = false,
  // 自动隐藏时间
  hideTime = 2000,
  // 标题
  title = "提示",
  // 标题样式
  titleStyle = {},
  // 内容
  content = "",
  // 是否显示标题
  titleShow = false,
  // 是否显示内容
  contentShow = false,
  // 取消按钮显示
  cancelShow = true,
  // 确认按钮显示
  confirmShow = true,
  // 取消按钮文本
  cancelLabel = "取消",
  // 确认按钮文本
  confirmLabel = "确认",
  // 取消按钮样式
  cancelStyle = {},
  // 确认按钮样式
  confirmStyle = {},
  onCancel = () => {},
  onConfirm = () => {},
} = {}) {
  const imgUrl = `../../static/modalIcon/${type}.png`;
  // 节点
  let nodes = {
    btnNodes: [], // 按钮
    textNodes: [], // 标题
    componentsNodes: [], // 组件
  };
  // 一定要按顺序添加
  // 标题节点
  add(titleShow, "textNodes", h("uni-view", { class: "text32 f-w-b t-c m-b", style: titleStyle }, title));
  // 内容节点
  add(contentShow, "textNodes", h("uni-view", { class: "text26 f-w-b w-s-p" }, content));
  // 取消按钮节点
  add(
    cancelShow,
    "btnNodes",
    h(
      "uni-view",
      {
        class: "xpx-modal-btn xpx-modal-cancel-btn f1",
        style: cancelStyle,
        onClick: async () => {
          await onCancel();
          rootNode.remove();
        },
      },
      cancelLabel
    )
  );
  // 按钮间距节点
  add(cancelShow && confirmShow, "btnNodes", h("uni-view", { style: { width: "32rpx" } }));
  // 确认按钮节点
  add(
    confirmShow,
    "btnNodes",
    h(
      "uni-view",
      {
        class: "xpx-modal-btn xpx-modal-confirm-btn f1",
        style: confirmStyle,
        onClick: async () => {
          await onConfirm();
          rootNode.remove();
        },
      },
      confirmLabel
    )
  );
  // 添加图片节点
  // 图片地址
  const src = icon || new URL(imgUrl, import.meta.url).href;
  add(type != "none", "componentsNodes", h("img", { class: "xpx-modal-icon", src }));
  add(true, "componentsNodes", h("uni-view", { class: "xpx-modal-slot" }, nodes.textNodes));
  add(true, "componentsNodes", h("uni-view", { class: "w100 flex-ac justify-b text28 f-w-b t-c" }, nodes.btnNodes));

  // 创建弹框
  const vnode = h("uni-view", { class: "center flex-c bg-c-f border-r xpx-modal" }, nodes.componentsNodes);
  // 根节点
  const rootNode = document.createElement("uni-view");
  rootNode.className = "fixed w100 h100 center xpx-modal-mask";
  document.body.appendChild(rootNode);
  render(vnode, rootNode);
  if (isAutoHide) {
    setTimeout(() => {
      rootNode.remove();
    }, hideTime);
  }
  // 根据条件添加节点
  function add(flag, nodeKey, VNode) {
    if (!flag) return;
    nodes[nodeKey].push(VNode);
  }
}
