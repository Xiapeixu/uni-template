<template>
  <view>
    <xpx-scroll :mixins="mixins" class="p-b" style="height: calc(100vh - 100rpx)" emptyIcon="/static/logo.png" v-slot="item">
      <view class="bg-c-f border-r m-b-c padding"> {{ item }} </view>
    </xpx-scroll>
  </view>
</template>

<script setup>
import { gettakeDineAndDash } from "@/http/api";
const dict = mixinsDict(["template"]);
const mixins = mixinsScroll({
  apiMethod: gettakeDineAndDash,
});
</script>

<style scoped lang="scss">
page {
  padding: 0;
}
</style>
