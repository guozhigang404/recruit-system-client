<template>
  <div v-if="userData" class="user-detail-container">
    <div class="photo">
      <img :src="userData.photo">
    </div>
    <div class="base-info">
      <div class="item">
        <div class="title">姓名 :</div>
        <div class="data">{{ userData.name }}</div>
      </div>
      <div class="item">
        <div class="title">年龄 :</div>
        <div class="data">{{ userData.age }}</div>
      </div>
      <div class="item">
        <div class="title">性别 :</div>
        <div class="data">{{ userData.sex ? "男" : "女" }}</div>
      </div>
      <div class="item">
        <div class="title">电话 :</div>
        <div class="data">{{ userData.tel }}</div>
      </div>
      <div class="item">
        <div class="title">邮箱 :</div>
        <div class="data">{{ userData.email }}</div>
      </div>
      <div class="item">
        <div class="title">地址 :</div>
        <div class="data">{{ userData.address }}</div>
      </div>
      <div class="item">
        <div class="title">毕业院校 :</div>
        <div class="data">{{ userData.university }}</div>
      </div>
      <div class="item">
        <div class="title">学历 :</div>
        <div class="data">{{ userData.qualifications }}</div>
      </div>
      <div class="item">
        <div class="title">专业 :</div>
        <div class="data">{{ userData.major }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.user-detail-container {
  width: 100%;
  background-color: #FFF;
  height: 500px;
  display: flex;
  box-sizing: border-box;
  padding: 30px;

  .photo {
    flex: 0 0 150px;

    img {
      width: 150px;
    }
  }

  .base-info {
    flex: 1 1 auto;
    margin-left: 20px;

    .item {
      display: flex;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;

      .title {
        width: 120px;
        text-align: center;
        font-weight: bold;
        color: @info;
      }

      .data {
        width: 300px;
        border-bottom: 1px solid darken(#FFF, 10%);
        text-align: center;
      }
    }

  }
}
</style>
