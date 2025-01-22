<template>
  <view>
    <xpx-scroll :mixins="mixins" class="bg-c-f p-b" style="height: 400px" emptyIcon="/static/logo.png"></xpx-scroll>
  </view>
</template>

<script setup>
import { gettakeDineAndDash } from "@/http/api";

const mixins = Mixins({
  componentsOptions: {
    typeKey: "templateArray",
    apiMethod: gettakeDineAndDash,
  },
});
// const mixins = Mixins({ componentsOptions: {  } });
mixins.dicts(["templateArray"]);
const { query, dict, componentsOptions, currentObj } = mixins;
function click() {
  componentsOptions.value.current++;
  // console.log(dict.value);
}
</script>

<style scoped lang="scss">
page {
  padding: 0;
}
</style>
