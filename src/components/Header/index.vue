<template>
  <div class="header-container">
    <h1>recruit</h1>
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link :to="{
            name: 'RecruitInfo'
          }">招聘信息</router-link>
      <router-link to="/">关于我们</router-link>
      <router-link to="/">联系</router-link>
    </nav>
    <div class="login">
      <template v-if="!userData">
        <router-link :to="{
            name: 'Login'
          }">登录</router-link>

        <router-link :to="{
            name: 'Register'
          }">注册</router-link>
      </template>
      <template v-else-if="userType && userData">
        <router-link  :to="{
        name: userType
      }">
          控制台
        </router-link>
        <a class="logout" @click.prevent="logout">退出</a>
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  computed: {
    ...mapState("user", ["userData", "isLoading"]),
    userType() {
      if(this.userData) {
        let userTypeId = this.userData.userTypeId;
        if(userTypeId === 1 || userTypeId === 2) {
          return 'Admin'
        } else {
          return 'JobList'
        }
      } else {
        return null
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logOut")
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
@import "~@/styles/var.less";
.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height:@headerHeight;
  h1 {
    font-size: @bigFont * 2;
    color: @white;
    font-weight: normal;
    width: 180px;
    line-height: @headerHeight;
    height: 100%;
    text-align: center;
    margin: 0 50px;
  }

  .nav {
    display: flex;
    a {
      display: block;
      line-height: @headerHeight;
      letter-spacing: 1px;
      padding: 0 20px;
      color: @white;
      transition: all 0.4s;
      &:hover {
        color: darken(@lightWords, 15%);
      }
    }
  }

  .login {
    width: 180px;
    margin: 0 50px;
    text-align: center;
    a {
      display: inline-block;
      line-height: @headerHeight;
      letter-spacing: 1px;
      padding: 0 5px;
      color: @white;
      transition: all 0.4s;
      &:hover {
        color: darken(@lightWords, 15%);
      }
    }
  }

  .logout {
    cursor: pointer;
  }
}
</style>
