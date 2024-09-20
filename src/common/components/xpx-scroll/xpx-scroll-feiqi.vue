<template>
  <!-- 列表 -->
  <!-- <scroll-view scroll-y scroll-with-animation refresher-enabled refresher-default-style="none" :refresher-triggered="atom.triggered.value"> -->
  <scroll-view
    scroll-with-animation
    refresher-default-style="none"
    :refresher-enabled="refresherEnabled"
    :refresher-triggered="atom.triggered.value[current.value]"
    refresher-background="#fff"
    scroll-y
    class="scrollView"
    :style="{
      height: props.height,
    }"
    @refresherrefresh="atom.refresherrefresh"
    @scrolltolower="atom.scrolltolower"
  >
    <view class="topBox rela center m-b-c">
      <view class="center">
        <image class="svg-loading" src="../static/loading.svg" mode="scaleToFill" style="width: 40rpx; height: 40rpx" />
      </view>
      <view class="m-l-c" style="color: #848c9a">{{ loadingText }}</view>
    </view>
    <view style="margin-bottom: 20rpx" v-for="(item, i) in list" :key="i">
      <slot name="item" :row="item" :i="i"></slot>
    </view>
    <uv-empty :icon="emptyIcon" mode="data" :show="list.length == 0" :marginTop="emptyTop"></uv-empty>
  </scroll-view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";

const props = defineProps(["atom", "height", "loadingText", "refresherEnabled", "emptyTop", "emptyIcon"]);
// 公共属性
/**
 * @type {atom}
 */
const atom = props.atom;
// 加载文本
const loadingText = props.loadingText || "加载中";
// 如有多个标签多个列表时标签的下标或者关键值
const current = computed(() => {
  return atom.current.value;
});
// 是否刷新
const refresherEnabled = props.refresherEnabled ?? true;
// 列表
const list = computed(() => {
  return atom.isMore() ? atom.dataArrayMap.value.get(current.value).value ?? [] : atom.dataArray.value;
});
// 空数据边距
const emptyTop = props.emptyTop ?? "0";
// 空数据图标
const emptyIcon = props.emptyIcon ?? "";
onLoad(() => {});
</script>

<style lang="scss" scoped>
.scrollView {
  height: 50vh;
}
.topBox {
  margin-top: -80rpx;
  width: 100%;
  height: 80rpx;
}
.svg-loading {
  animation: loding-rotate 2s linear infinite;
}
@keyframes loding-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
