<template>
  <!-- 列表 -->
  <!-- <scroll-view scroll-y scroll-with-animation refresher-enabled refresher-default-style="none" :refresher-triggered="atom.triggered.value"> -->
  <scroll-view
    scroll-with-animation
    refresher-default-style="none"
    refresher-enabled
    :refresher-triggered="atom.triggered.value"
    refresher-background="#fff"
    scroll-y
    class="scrollView"
    @refresherrefresh="atom.refresherrefresh"
    @scrolltolower="atom.scrolltolower"
  >
    <view class="topBox rela center">
      <view class="center">
        <image class="svg-loading" src="./static/loading.svg" mode="scaleToFill" style="width: 40rpx; height: 40rpx" />
      </view>
      <view class="m-l-c" style="color: #848c9a">
        {{ "测试文字" }}
      </view>
    </view>
    <view style="margin-bottom: 20rpx" v-for="(item, i) in atom.dataArray.value" :key="i">
      <slot name="item" :row="item" :i="i"></slot>
    </view>
  </scroll-view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";

const props = defineProps(["atom"]);
const atom = props.atom;

onLoad(() => {});
function onclick() {
  atom.refresherrefresh();
  console.log(atom.triggered);
}
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
