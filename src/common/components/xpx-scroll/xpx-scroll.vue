<template>
  <view>
    <!-- 列表 -->
    <xpx-tabs v-if="tempIsShowTab" :mixins="mixins" :style="{ height: tabHeight }"></xpx-tabs>
    <swiper :current-item-id="`swiper-item-${componentsOptions.current}`" @change="onChange" :style="{ height: `calc(100% - ${tabHeight})` }">
      <swiper-item
        class="padding-lr box-s"
        v-for="(type_item, index) in componentsOptions.typeKey ? dict[componentsOptions.typeKey] : 1"
        :key="index"
        :item-id="`swiper-item-${index}`"
      >
        <scroll-view
          scroll-with-animation
          refresher-default-style="none"
          :refresher-enabled="refresherEnabled"
          refresher-background="transparent"
          scroll-y
          class="scrollView bg-c-f"
          :refresher-triggered="componentsOptions.triggered[type_item.value]"
          @refresherrefresh="mixins.refresherrefresh"
          @scrolltolower="mixins.scrolltolower()"
        >
          <view class="topBox rela center m-b-c">
            <view class="m-l-c loading-text">{{ refreshLoadingText }}</view>
            <image class="svg-loading" src="../static/loading.svg" mode="scaleToFill" />
          </view>
          <template v-if="!isEmpty(componentsOptions.dataArray[type_item.value])">
            <view class="m-b-c" v-for="(item, i) in componentsOptions.dataArray[type_item.value]" :key="i">
              <slot name="item" :row="item" :i="i">
                <view class="bg-c-g padding border-r-16">
                  <view>{{ item.subMerchantShortName }}</view>
                  <view>{{ item.contactName }}</view>
                  <view>{{ item.frResidence }}</view>
                  <view>{{ item.bankName }}</view>
                  <image :src="item.settleCertFrontPic" mode="scaleToFill" />
                  <view>我的id是：{{ item.id }}</view>
                </view>
              </slot>
            </view>
            <view>
              <view class="rela center m-b-c" v-if="componentsOptions.loadMoreTriggered[type_item.value]">
                <view class="m-l-c loading-text">{{ loadMoreLoadingText }}</view>
                <image class="svg-loading" src="../static/loading.svg" mode="scaleToFill" />
              </view>
              <view class="loading-text t-c center" v-else @click="mixins.scrolltolower(true)">
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
import xpxTabs from "@/common/components/xpx-tabs/xpx-tabs.vue";
import { isEmpty } from "@/common/tools/verify";
import { onLoad } from "@dcloudio/uni-app";

const { mixins, isShowTab } = defineProps({
  mixins: { type: Object, required: true },
  isShowTab: { type: Boolean, default: true, required: false },
  tabHeight: { type: String, default: "90rpx", required: false },
  refreshLoadingText: { type: String, default: "正在刷新...", required: false },
  loadMoreLoadingText: { type: String, default: "正在加载...", required: false },
  loadCompleteText: { type: String, default: "已经到底了", required: false },
  refresherEnabled: { type: Boolean, default: true, required: false },
  emptyIcon: { type: String, required: true },
  emptyIconStyle: { type: String, default: "", required: false },
  emptyStyle: { type: String, default: "", required: false },
});

const { dict, componentsOptions } = mixins;
// 是否展示标签选项卡
// 没有设置typeKey就永远不展示
// 设置了typeKey就通过标签的isShowTab控制是否展示
let tempIsShowTab = (() => {
  if (isEmpty(unref(componentsOptions).typeKey)) {
    return false;
  } else {
    return isShowTab;
  }
})();
function onChange(event) {
  unref(componentsOptions).current = event.detail.current;
}
</script>

<style lang="scss" scoped>
.scrollView {
  height: 100%;
}
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
