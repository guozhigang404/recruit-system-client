<template>
  <div class="home-container">
    <div class="main">
      <Header></Header>
      <div class="text" :class="{
        show: textShow
      }">
        <h2>成为我们的一员</h2>
        <p>我们相信，让大家自由地做自己想做的事情会带来最好的结果。 面对的每一个问题都应被视为新的挑战、改进和创新的机会。</p>
      </div>
      <img class="jump-img" :src="jumpImg" alt="加入我们">
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Pager from '@/components/Pager'
import img from '@/assets/images/Home/jump.png'

export default {
  name: "index",
  data() {
    return {
      textShow: false,
      jumpImg: img
    }
  },
  components: {
    Pager,
    Header
  },
  mounted() {
    setTimeout(() => {
      this.textShow = true
    }, 500)
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-image: url("~@/assets/images/Home/bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .main {
    width: 100%;
    height: 100%;
    background-color: rgba(53, 215, 164, 0.8);
    position: relative;

    .text {
      position: absolute;
      width: 500px;
      left: 110px;
      top: 50%;
      opacity: 0;
      transform: translateY(-60%);
      transition: all 0.6s;

      h2 {
        font-size: 32px;
        color: @white;
        font-weight: normal;
        margin-bottom: 15px;
      }

      p {
        color: @white;
        font-size: 20px;
      }

      &.show {
        opacity: 1;
        transform: translateY(-80%);
      }
    }

    .jump-img {
      position: absolute;
      right: 250px;
      top: 200px;
      width: 400px;
      animation: jump 5s infinite;
    }

    @jumpHeight: 15px;
    @keyframes jump {
      0% {
        transform: translateY(-@jumpHeight);
      }
      50% {
        transform: translateY(@jumpHeight);
      }
      100% {
        transform: translateY(-@jumpHeight);
      }
    }


  }
}
</style>
