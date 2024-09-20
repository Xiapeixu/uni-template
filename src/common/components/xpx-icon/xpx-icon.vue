<template>
  <view class="flex">
    <view class="xpx-icon-transition">
      <text class="xpx-icon">{{ code }}</text>
    </view>
  </view>
</template>

<script setup>
import icons from "./icons";

const code = unescape(`%u${icons["xpx-caretdown"]}`);

// 废弃
// const icon_transform = ref("rotate(0deg)");
// function upd() {
//   icon_transform.value = "rotate(180deg)";
// }
</script>

<style lang="scss" scoped>
@import "./icons.scss";
.xpx-icon-transition {
  transition: transform 0.2s;
  display: flex;
  align-items: center;
}
</style>
