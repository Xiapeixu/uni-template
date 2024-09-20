<script setup>
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
/** 公共样式 */
@import "@/css/style.scss";
/*每个页面公共css */
page {
  background: #f8f8f8;
  padding: $spacing;
}
</style>
