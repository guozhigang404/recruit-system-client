<template>
  <div class="login-container">
    <div class="main">
      <div class="go-home">
        <router-link :to="{
        name: 'Home'
      }">返回首页
        </router-link>
      </div>
      <div class="text">
        <h2>用科技</h2>
        <p>让复杂的世界更简单</p>
      </div>
      <div class="form">
        <h2>欢迎登录</h2>
        <div class="form-body">
          <div class="item">
            <div class="icon">
              <IconFont iconType="user"></IconFont>
            </div>
            <!-- * 清空输入框-->
            <div
                class="close"
                v-show="loginId"
                @click="loginId = null"
            >
              <IconFont iconType="close"></IconFont>
            </div>
            <input
                type="text"
                placeholder="请输入手机号"
                v-model.trim="loginId"
                :class="{
                  focus: focusClassName.user
                }"
                @focus="handleFocus('user', true)"
                @blur="handleFocus('user', false)"
            >
            <div class="error-msg">{{ errorMsg.loginId }}</div>
          </div>
          <div class="item">
            <div class="icon">
              <IconFont iconType="password"></IconFont>
            </div>
            <!-- * 清空输入框-->
            <div
                class="close"
                v-show="loginPwd"
                @click="loginPwd=null"
            >
              <IconFont iconType="close"></IconFont>
            </div>
            <div
                class="show-pwd"
                v-show="loginPwd"
                @click="showPwd = !showPwd"
            >
              <IconFont :icon-type=" showPwd ? 'viewOff' : 'view' "></IconFont>
            </div>
            <input
                :type=" showPwd ? 'text': 'password' "
                :class="{
                  focus: focusClassName.password
                }"
                placeholder="请输入密码"
                v-model.trim="loginPwd"
                @focus="handleFocus('pwd', true)"
                @blur="handleFocus('pwd', false)"
            >
            <div class="error-msg">{{ errorMsg.loginPwd }}</div>
          </div>
          <div class="item btn">
            <button @click="login" :disabled="isLoading"> {{isLoading ? '登录中...' : '登录'}} </button>
          </div>
          <div class="error">
            <p>{{ errorMsg.failMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/IconFont'
import {mapState} from 'vuex'
import {messageBox} from '@/utils'
export default {
  name: "Login",
  data() {
    return {
      loginId: null,
      loginPwd: null,
      showPwd: false,
      errorMsg: {
        loginId: "",
        loginPwd: "",
        failMsg: ""
      },
      // 控制input的focus 类名
      focusClassName: {
        user: false,
        password: false
      }
    }
  },
  components: {
    IconFont
  },
  computed: {
    ...mapState("user", ["isLoading"])
  },
  methods: {
    async login() {
      if (!this.check()) {
        return;
      }
      const resp = await this.$store.dispatch("user/userLogin", {
        loginId: this.loginId,
        loginPwd: this.loginPwd
      })
      if (resp.code === 400) {
        this.errorMsg.failMsg = "账号或用户名错误"
      } else if (resp.code === 406) {
        messageBox(
            "您已被加入黑名单",
            "error",
            2000
        )
      } else {
        if (resp.data) {
          let userTypeId = resp.data.userTypeId;
          if (userTypeId === 1 || userTypeId === 2) {
            // 管理员
            this.$router.push({
              name: "Admin"
            })
          } else {
            // 普通用户
            this.$router.push({
              name: "JobList"
            })
          }
        } else {
          this.errorMsg.failMsg = "账号或用户名错误"
        }
      }
      this.loginPwd = null;
      this.loginId = null;
    },
    check() {
      let isPass = true
      if (!this.loginId) {
        this.errorMsg.loginId = "请填写账号"
        isPass = false;
      } else if (!this.loginPwd) {
        this.errorMsg.loginPwd = "请输入密码"
        isPass = false;
      }
      return isPass
    },

    handleFocus(ipt, isFocus) {
      if (ipt === 'user') {
        if (isFocus) {
          this.focusClassName.user = true
        } else {
          this.focusClassName.user = false
          if (this.loginId) {
            this.errorMsg.loginId = "";
          }
        }
      } else if (ipt === "pwd") {
        if (isFocus) {
          this.focusClassName.password = true
        } else {
          this.focusClassName.password = false
          if (this.loginId) {
            this.errorMsg.loginPwd = "";
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("~@/assets/images/Home/login02.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .main {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;

    .go-home {
      position: absolute;
      left: 50px;
      top: 20px;
      width: 120px;
      height: 36px;
      line-height: 36px;
      text-align: center;

      a {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 18px;
        color: darken(@white, 40%);
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transition: all 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.4);
          color: darken(@white, 10%);
        }
      }
    }

    .text {
      position: absolute;
      left: 120px;
      top: 35%;
      color: #FFF;

      h2 {
        font-size: 50px;
        margin-bottom: 10px;
      }

      p {
        font-size: 32px;
        letter-spacing: 11px;
      }
    }

    .form {
      position: absolute;
      right: 50px;
      top: 110px;
      width: 400px;
      height: 420px;
      background-color: #FFF;
      border-radius: 20px;

      h2 {
        position: absolute;
        top: 30px;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        padding-left: 30px;
      }

      .form-body {
        position: absolute;
        width: 100%;
        top: 130px;

        .item {
          text-align: center;
          height: 40px;
          margin-bottom: 30px;
          width: 100%;
          position: relative;

          .focus {
            border: 1px solid @link;
            background-color: #FFF;
          }

          .close {
            position: absolute;
            right: 25px;

            height: 40px;
            line-height: 40px;
            width: 40px;
            text-align: center;

            .icon-container {
              font-size: 18px;
              color: @link;
            }
          }

          .icon {
            position: absolute;
            left: 32px;
            top: 6px;

            .icon-container {
              font-size: 24px;
              color: @link;
            }
          }

          .show-pwd {
            position: absolute;
            right: 60px;
            height: 40px;
            line-height: 40px;
            width: 18px;
            text-align: center;

            .icon-container {
              font-size: 18px;
              color: @link;
            }
          }

          input {
            height: 40px;
            width: 350px;
            box-sizing: border-box;
            background-color: darken(@white, 6%);
            padding-left: 35px;
            border: none;
            border-radius: 10px;
          }

          button {
            width: 350px;
            height: 40px;
            border-radius: 10px;
            box-sizing: border-box;
            border: none;
            background-color: @link;
            color: #FFF;
            letter-spacing: 10px;
            font-size: 16px;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
              background-color: lighten(@link, 5%);
            }
          }

          .error-msg {
            position: absolute;
            width: 350px;
            height: 30px;
            left: 50%;
            transform: translateX(-50%);
            line-height: 30px;
            font-size: 13px;
            box-sizing: border-box;
            padding-left: 10px;
            text-align: left;
            color: @error;
          }
        }

        .error {
          width: 100%;
          overflow: hidden;
          margin-bottom: 20px;

          p {
            width: 350px;
            height: 25px;
            line-height: 25px;
            margin: 0 auto;
            font-size: 14px;
            color: @error;
            box-sizing: border-box;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
