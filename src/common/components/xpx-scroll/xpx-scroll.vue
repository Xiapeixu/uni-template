<template>
  <view>
    <!-- 列表 -->
    <xpx-tabs v-if="atom.typeKey" :atom="atom"></xpx-tabs>
    <swiper class="h100" :current-item-id="`swiper-item-${atom.current}`" @change="onChange">
      <swiper-item
        class="padding box-s"
        v-for="(type_item, index) in atom.typeKey ? atom.dict[atom.typeKey] : 1"
        :key="index"
        :item-id="`swiper-item-${index}`"
      >
        <scroll-view
          scroll-with-animation
          refresher-default-style="none"
          :refresher-enabled="refresherEnabled"
          :refresher-triggered="atom.triggered[index]"
          refresher-background="#fff"
          scroll-y
          class="scrollView bg-c-f"
          :style="{
            height: props.height,
          }"
          @refresherrefresh="atom.refresherrefresh()"
          @scrolltolower="atom.scrolltolower()"
        >
          <view class="topBox rela center m-b-c">
            <view class="center">
              <image class="svg-loading" src="../static/loading.svg" mode="scaleToFill" style="width: 40rpx; height: 40rpx" />
            </view>
            <view class="m-l-c" style="color: #848c9a">{{ loadingText }}</view>
          </view>
          <view style="margin-bottom: 20rpx" v-for="(item, i) in atom.dataArray[index]" :key="i">
            <slot name="item" :row="item" :i="i"></slot>
          </view>
          <!-- <uv-empty :icon="emptyIcon" mode="data" :show="list.length == 0" :marginTop="emptyTop"></uv-empty> -->
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import xpxTabs from "@/common/components/xpx-tabs/xpx-tabs.vue";
import { onLoad } from "@dcloudio/uni-app";

const props = defineProps(["atom", "height", "loadingText", "refresherEnabled", "emptyTop", "emptyIcon"]);
// 公共属性
/**
 * @type {atom}
 */
const atom = props.atom;
// 加载文本
const loadingText = props.loadingText || "加载中";
// 是否刷新
const refresherEnabled = props.refresherEnabled ?? true;
// 空数据边距
const emptyTop = props.emptyTop ?? "0";
// 空数据图标
const emptyIcon = props.emptyIcon ?? "";
onLoad(() => {});
function onChange({ currentTarget, detail, target, timeStamp, type }, source) {
  atom.current = detail.current;
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
