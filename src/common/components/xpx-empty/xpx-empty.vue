<template>
  <view class="center flex-c" :style="[addStyle(customStyle)]">
    <image :src="icon" :style="[{ width: '160rpx', height: '160rpx' }, addStyle(iconStyle)]" mode="scaleToFill" />
    <view class="m-t text28 t-c-g">{{ emptyLabel }}</view>
  </view>
</template>

<script setup>
import { addStyle } from "@/common/tools/util";
defineProps({
  icon: { type: String, required: true },
  iconStyle: { type: Object, default: {}, required: false },
  customStyle: { type: Object, default: { height: "70%" }, required: false },
  emptyLabel: { type: String, default: "暂无数据", required: false },
});
</script>

<style lang="scss" scoped></style>
