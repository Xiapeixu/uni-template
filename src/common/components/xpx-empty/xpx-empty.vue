<template>
  <view class="center flex-c" :style="[addStyle(customStyle)]">
    <image :src="icon" :style="[{ width: '160rpx', height: '160rpx' }, addStyle(iconStyle)]" mode="scaleToFill" />
    <text class="m-t">暂无数据</text>
  </view>
</template>

<script setup>
import { addStyle } from "@/common/tools/util";
defineProps({
  icon: { type: String, required: true },
  iconStyle: { type: String, default: "", required: false },
  customStyle: { type: String, default: "", required: false },
});
</script>

<style lang="scss" scoped></style>
