<template>
  <view>
    <xpx-scroll :mixins="mixins" class="p-b" style="height: calc(100vh - 400rpx)" emptyIcon="/static/logo.png">
      <!-- <template #search>
        <view class="bg-c-f border-r padding">
          <input type="text" v-model="options.query.search" />
          <view @click="mixins.searchList">搜索</view>
        </view>
      </template> -->
      <template #default="item">
        <view class="bg-c-f border-r m-b-c padding"> {{ item }} </view>
      </template>
    </xpx-scroll>
  </view>
</template>

<script setup>
import { gettakeDineAndDash } from "@/http/api";
const dict = mixinsDict(["template"]);
const mixins = mixinsScroll({
  apiMethod: gettakeDineAndDash,
  typeList: dict["template"],
});
const options = unref(mixins.options);
</script>

<style scoped lang="scss">
page {
  padding: 0;
}
</style>
