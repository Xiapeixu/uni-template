<template>
  <view>{{ page }} </view>
</template>

<script setup>
import atom from "@/components/atom";
const { page, showtoast } = atom();
console.log(page);
showtoast("成功");
</script>

<style scoped lang="scss"></style>
