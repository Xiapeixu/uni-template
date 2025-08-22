<template>
  <uv-tabs
    :list="list"
    :keyName="keyName"
    :current="options.current"
    :lineColor="_mixinsStyle.color"
    :scrollable="scrollable"
    @click="clickHandler"
  ></uv-tabs>
</template>

<script setup>
const _mixinsStyle = mixinsStyle;
/**
 * @typedef {import('@/common/tools/types').scrollMixins} scrollMixins
 */

/**
 * 组件参数
 * @typedef {Object} Props
 * @property {scrollMixins} mixins
 */
/** @type {Props} */
const { mixins } = defineProps({
  mixins: { type: Object, required: true },
  scrollable: { type: Boolean, required: false, default: false },
  keyName: { type: String, required: false, default: "label" },
});
const options = unref(mixins.options);
const list = ref(options.typeList);
function clickHandler({ index }) {
  mixins.setCurrent(index);
}
</script>

<style lang="scss" scoped></style>
