<template>
  <swiper class="swiper" circular :indicator-dots="props.indicatorDots" :autoplay="true" :interval="props.interval" :duration="props.duration">
    <swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index">
      <image
        class="swiper-img"
        :src="item"
        mode="scaleToFill"
        :style="{
          'background-color': index == 0 ? 'red' : index == 1 ? 'green' : 'orange',
        }"
      />
    </swiper-item>
  </swiper>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  // 图片数组
  list: {
    type: Array,
    required: true,
  },
  // 数组中的key
  key: {
    type: String,
    default: "url",
    required: false,
  },
  // 是否显示面板指示点
  indicatorDots: {
    type: Boolean,
    default: false,
    required: false,
  },
  // 自动切换时间间隔
  interval: {
    type: Number,
    default: 3000,
    required: false,
  },
  // 滑动动画时长
  duration: {
    type: Number,
    default: 500,
    required: false,
  },
});
// 重新获取图片列表
const imgList = ref([]);
imgList.value = props.list.map((item) => {
  return item[props.key];
});
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;

  &-item {
    width: 100%;
  }

  &-img {
    width: 100%;
    height: 100%;
  }
}
</style>
