<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: async () => {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
  background: #f8f8f8;
  padding: $spacing;
}
</style>
