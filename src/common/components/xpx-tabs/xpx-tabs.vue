<template>
  <scroll-view class="xpx_tabs" :scroll-x="true" :scroll-left="moveInfo.scrollLeft" scroll-with-animation :show-scrollbar="false">
    <view class="flex rela">
      <view
        ref="nodeRefs"
        class="xpx_tab_item f1 t-c"
        :class="[`xpx_tab_item-${index}`]"
        v-for="(item, index) in list"
        :key="index"
        @tap="clickHandler(item, index)"
      >
        <view class="f1">{{ item.label }}</view>
      </view>
      <view
        class="xpx_tab_item__line abso"
        :style="[
          {
            transform: `translate(${moveInfo.lineOffsetLeft}px)`,
          },
        ]"
      ></view>
    </view>
  </scroll-view>
</template>

<script setup>
const props = defineProps(["atom"]);
// 公共属性
/**
 * @type {atom}
 */
const atom = props.atom;
const unit = "px";
const list = ref(atom.dict[atom.typeKey]);
// 所有tab节点
const nodeRefs = ref([]);
// 关于移动
const moveInfo = ref({
  lineWidth: 30,
  duration: 200,
  firstTime: true,
  scrollLeft: 0,
  scrollViewWidth: 0,
  lineOffsetLeft: 0,
  tabsRect: {
    left: 0,
  },
});

const innerCurrent = computed(() => {
  return atom.current;
});

watch([innerCurrent], () => {
  nextTick(() => {
    resize();
  });
});

onMounted(async () => {
  init();
});

function onTabItemClick(index) {
  console.log(nodeRefs.value[index]);
}

// 初始化
function init() {
  setTimeout(() => {
    resize();
  }, 0);
}

// 获取所有标签的尺寸
async function resize() {
  // 如果不存在list，则不处理
  if (list.value.length === 0) {
    return;
  }
  getTabsRect();
  try {
    const [tabsRect, itemRect = []] = await Promise.all([getTabsRect(), getAllItemRect()]);
    moveInfo.value.tabsRect = tabsRect;
    console.log(tabsRect);
    moveInfo.value.scrollViewWidth = 0;
    itemRect.forEach((item, index) => {
      moveInfo.value.scrollViewWidth += item.width;
      list.value[index].rect = item;
    });
    setLineLeft();
    setScrollLeft();
  } catch (error) {
    console.error("获取节点属性错误", error);
  }
}
// 点击某一个标签
function clickHandler(item, index) {
  // 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
  // this.$emit("click", {
  //   ...item,
  //   index,
  // });
  // 如果disabled状态，返回
  if (item.disabled) return;
  if (innerCurrent.value != index) {
    // this.$emit("change", {
    //   ...item,
    //   index,
    // });
  }
  atom.current = index;
}
// 设置线的位置
function setLineLeft() {
  const tabItem = list.value[innerCurrent.value];
  if (!tabItem) {
    return;
  }
  // 获取滑块该移动的位置
  let lineOffsetLeft = list.value.slice(0, innerCurrent.value).reduce((total, curr) => total + curr.rect.width, 0);
  // 获取下划线的数值px表示法
  let lineWidth = getPx(moveInfo.value.lineWidth);
  // 如果传的值未带单位+设置了全局单位，则带上单位计算，这样才没有误差
  if (number(lineWidth) && unit) {
    lineWidth = getPx(`${lineWidth}${unit}`);
  }
  moveInfo.value.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2;
  // // #ifdef APP-NVUE
  // // 第一次移动滑块，无需过渡时间
  // this.animation(moveInfo.value.lineOffsetLeft, moveInfo.value.firstTime ? 0 : parseInt(duration));
  // // #endif

  // 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
  // 这里需要一个定时器，因为在非nvue下，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
  if (moveInfo.value.firstTime) {
    setTimeout(() => {
      moveInfo.value.firstTime = false;
    }, 20);
  }
}
// 设置滚动位置
function setScrollLeft() {
  // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
  const tabRect = list.value[innerCurrent.value];
  // 累加得到当前item到左边的距离
  const offsetLeft = list.value.slice(0, innerCurrent.value).reduce((total, curr) => {
    return total + curr.rect.width;
  }, 0);
  // 此处为屏幕宽度
  const windowWidth = sys().windowWidth;
  // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
  let scrollLeft =
    offsetLeft -
    (moveInfo.value.tabsRect.width - tabRect.rect.width) / 2 -
    (windowWidth - moveInfo.value.tabsRect.right) / 2 +
    moveInfo.value.tabsRect.left / 2;
  console.log(offsetLeft);
  console.log(moveInfo.value.tabsRect.width);
  console.log(tabRect.rect.width);
  console.log(windowWidth);
  console.log(moveInfo.value.tabsRect.right);
  console.log(moveInfo.value.tabsRect.left);
  console.log("----------------------------------------");
  // 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
  scrollLeft = Math.min(scrollLeft, moveInfo.value.scrollViewWidth - moveInfo.value.tabsRect.width);
  moveInfo.value.scrollLeft = Math.max(0, scrollLeft);
}
// 获取导航菜单的尺寸
function getTabsRect() {
  return new Promise((resolve) => {
    queryRect("xpx_tabs").then((size) => resolve(size));
  });
}
// 获取所有标签的尺寸
function getAllItemRect() {
  return new Promise(async (resolve, reject) => {
    try {
      const promiseAllArr = list.value.map((item, index) => queryRect(`xpx_tab_item-${index}`, true));
      const sizes = await Promise.all(promiseAllArr);
      resolve(sizes);
    } catch (error) {
      reject(error);
    }
  });
}
// 获取各个标签的尺寸
function queryRect(el, item) {
  return new Promise((resolve) => {
    getRect(`.${el}`).then((size) => {
      resolve(size);
    });
  });
}
// 查询节点信息
// 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
// 解决办法为在组件根部再套一个没有任何作用的view元素
function getRect(selector, all) {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(this)
      [all ? "selectAll" : "select"](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        }
        if (!all && rect) {
          resolve(rect);
        }
      })
      .exec();
  });
}

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
function getPx(value, unit = false) {
  if (number(value)) {
    return unit ? `${value}px` : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
  }
  return unit ? `${parseInt(value)}px` : parseInt(value);
}
/**
 * 验证十进制数字
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}
/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
function sys() {
  return uni.getSystemInfoSync();
}
</script>

<style lang="scss" scoped>
.xpx_tab_item {
  min-width: 150rpx;
  line-height: 80rpx;
  &__line {
    height: 3px;
    background: $primary-color;
    width: 30px;
    position: absolute;
    bottom: 2px;
    border-radius: 100px;
    transition-property: transform;
    transition-duration: 300ms;
  }
}
</style>
