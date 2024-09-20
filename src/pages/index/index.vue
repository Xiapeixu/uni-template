<template>
  <view>
    <view @click="click" style="width: 100rpx; height: 100rpx; border: 1px solid">点我+1</view>
    <input placeholder="请输入" type="digit" />
    <view>当前选中{{ atom.current }}</view>
    <view>当前选中{{ atom.currentDict }}</view>
    <xpx-scroll :atom="atom" class="m-t" style="height: 80vh" emptyTop="80rpx" emptyIcon="car">
      <template #item="scope" v-slot:item>
        <view class="t-c m-t-c" style="color: red"> -----{{ scope.row }}------ </view>
      </template>
    </xpx-scroll>
  </view>
</template>

<script setup>
import { gettakeDineAndDash } from "@/http/api";

const atom = new test({
  apiMethod: "gettakeDineAndDash",
  current: 0,
  typeKey: "testobj",
  dicts: ["testobj", "templateArray", "templateObject"],
});
watch(
  () => atom.current,
  (val) => {
    // console.log(val, "");
  }
);
async function click() {
  try {
    const { code, data, msg } = await gettakeDineAndDash();
    console.log(code, data, msg);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="scss">
page {
  padding: 0;
}
</style>
