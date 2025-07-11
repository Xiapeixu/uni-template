<template>
  <view>
    <xpx-tabs v-if="!isEmpty(options.typeList)" :mixins="mixins" :style="{ height: tabHeight }"></xpx-tabs>
    <view class="padding-lr">
      <slot name="search"></slot>
    </view>
    <swiper class="h100" @change="swiperChange" :current-item-id="`swiper-item-${options.current}`">
      <swiper-item
        class="padding-lr box-s"
        v-for="(_type_item, type_index) in isEmpty(options.typeList) ? 1 : options.typeList"
        :key="type_index"
        :item-id="`swiper-item-${type_index}`"
      >
        <scroll-view
          :show-scrollbar="false"
          scroll-with-animation
          refresher-default-style="none"
          :refresher-enabled="true"
          refresher-background="transparent"
          scroll-y
          class="h100"
          :refresher-triggered="options.refresherTriggered[type_index]"
          @refresherrefresh="mixins.refresherrefresh"
          @scrolltolower="mixins.scrolltolower"
        >
          <view class="topBox rela center m-b-c">
            <view class="m-l-c loading-text">{{ refreshLoadingText }}</view>
            <image class="svg-loading" src="../static/loading.svg" mode="scaleToFill" />
          </view>
          <template v-if="!isEmpty(options.dataArray[type_index])">
            <view class="m-b-c" v-for="(item, index) in options.dataArray[type_index]" :key="index">
              <slot :item="item" :index="index"> </slot>
            </view>
            <view class="p-b">
              <view class="rela center" v-if="options.loadMoreStatus[type_index] === 1">
                <view class="m-l-c loading-text">{{ loadMoreLoadingText }}</view>
                <image class="svg-loading" src="../static/loading.svg" mode="scaleToFill" />
              </view>
              <view class="loading-text t-c center" v-else-if="options.loadMoreStatus[type_index] === 2" @click="mixins.reScrolltolower">
                <view class="bottom-line"></view>
                <view style="margin: 0 20rpx">{{ loadCompleteText }}</view>
                <view class="bottom-line"></view>
              </view>
            </view>
          </template>
          <xpx-empty :customStyle="emptyStyle" :icon="emptyIcon" v-else />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { isEmpty } from "@/common/tools/verify";

/**
 * @typedef {import('@/common/tools/types').scrollMixins} scrollMixins
 */

/**
 * 组件参数
 * @typedef {Object} Props
 * @property {scrollMixins} mixins
 */

/** @type {Props} */
const { mixins } = defineProps({
  mixins: { type: Object, required: true },
  dict: { type: Array, default: [], required: false },
  isShowTab: { type: Boolean, default: true, required: false },
  tabHeight: { type: String, default: "90rpx", required: false },
  refreshLoadingText: { type: String, default: "正在刷新...", required: false },
  loadMoreLoadingText: { type: String, default: "正在加载...", required: false },
  loadCompleteText: { type: String, default: "已经到底了", required: false },
  refresherEnabled: { type: Boolean, default: true, required: false },
  emptyIcon: { type: String, default: "", required: false },
  emptyIconStyle: { type: String, default: "", required: false },
  emptyStyle: { type: String, default: "", required: false },
});
const options = unref(mixins.options);

// 多个列表修改时
function swiperChange({ detail }) {
  options.current = detail.current;
}
// 事件
const emits = defineEmits(["change"]);
// 监听类型改变时
watch(
  () => options.current,
  async () => {
    emits("change", { item: options.currentItem, index: options.current });
    if (isEmpty(options.dataArray[options.current])) {
      mixins.init();
    }
  }
);
</script>

<style lang="scss" scoped>
.topBox {
  margin-top: -80rpx;
  width: 100%;
  height: 80rpx;
}
.svg-loading {
  width: 40rpx;
  height: 40rpx;
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
.loading-text {
  color: #848c9a;
}
.bottom-line {
  width: 100rpx;
  background: #848c9a;
  border-bottom: 1px solid #848c9a;
  transform: scaleY(0.5);
}
</style>
