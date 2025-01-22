<template>
  <view> 123</view>
</template>

<script setup>
import { showtoast } from "@/components/util";
import { createApp, createVNode, defineComponent, Transition } from "vue";

const node = defineComponent({
  setup() {
    return () => createVNode("xpx-loading", {}, "你好");
  },
});
showtoast("123");
const aa = createApp(node);
aa.mount(ensureRoot("x-c-l"));
// aa.mount(ensureRoot("u-a-p"));
function ensureRoot(id2) {
  let rootEl = document.getElementById(id2);
  if (!rootEl) {
    rootEl = document.createElement("div");
    rootEl.id = id2;
    document.body.append(rootEl);
  }
  return rootEl;
}
</script>

<style></style>
<style scoped lang="scss"></style>
