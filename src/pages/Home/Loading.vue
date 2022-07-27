<template>
  <div class="loading-container">
    <div class="main">
      <h1>正在自动登录，请稍后......</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  created() {
    this.unWatch = this.$watch(
        () => this.$store.getters["user/curStatus"],
        (status) => {
          if (status !== "loading") {
            let target = this.$route.query.origin || "Home"
            this.$router.push({
              name: target
            }).then(r => {
            })
          }
        },
        {
          immediate: true
        }
    )
  },
  destroyed() {
    this.unWatch()
  }
}
</script>

<style scoped lang="less">
.loading-container {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/Home/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .main {
    width: 100%;
    height: 100%;
    background-color: rgba(53, 215, 164, 0.8);
    position: relative;

    h1 {
      width: 500px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #FFF;
    }
  }
}
</style>
