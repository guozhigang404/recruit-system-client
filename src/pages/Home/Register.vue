<template>
  <div class="register-container">
    <div class="main">
      <div class="text">
        <h2>加入我们</h2>
        <p>和优秀的人共同做事</p>
      </div>
      <div class="form-area">
        <div class="title"><h2>欢迎注册</h2></div>
        <div class="login-link">
          <p>已有账号？
            <router-link :to="{
            name: 'Login'
          }">登录
            </router-link>
          </p>
        </div>

        <div class="form">
          <!--姓名-->
          <div class="item">
            <div class="item-input-area">
              <div class="item-title">姓名 :</div>
              <input
                  class="text-input"
                  placeholder="请设置姓名"
                  type="text"
                  v-model.trim="formData.username"
              >
              <div
                  class="close-icon"
                  v-show="formData.username"

                  @click="formData.username = null"
              >
                <IconFont iconType="close"></IconFont>
              </div>
            </div>
            <div class="error">{{ this.errorMsg.username }}</div>
          </div>
          <!--手机号-->
          <div class="item">
            <div class="item-input-area">
              <div class="item-title">手机号 :</div>
              <input
                  class="text-input"
                  placeholder="注册后不可更改"
                  type="text"
                  v-model.trim="formData.tel"
                  @input="checkTel"
                  @blur="telInputBlur"
              >
              <div
                  class="close-icon"
                  v-show="formData.tel"

                  @click="formData.tel = null"
              >
                <IconFont iconType="close"></IconFont>
              </div>
            </div>
            <div class="error">{{ this.errorMsg.tel }}</div>
          </div>
          <!--密码-->
          <div class="item">
            <div class="item-input-area">
              <div class="item-title">密码 :</div>
              <input
                  class="text-input"
                  placeholder="请设置密码(至少六位)"
                  :type="showPwd? 'text' : 'password'"
                  v-model.trim="formData.loginPwd"
                  maxlength="16"
                  @input="checkPwd"
                  @blur="pwdInputBlur"
              >
              <div
                  class="close-icon"
                  v-show="formData.loginPwd"

                  @click="formData.loginPwd = null"
              >
                <IconFont iconType="close"></IconFont>
              </div>
              <div
                  v-show="formData.loginPwd"
                  @click="showPwd = !showPwd"
                  class="show-pwd">
                <IconFont :iconType=" showPwd ? 'viewOff' : 'view' "></IconFont>
              </div>
            </div>
            <div class="error">{{ this.errorMsg.loginPwd }}</div>
          </div>
          <!--确定密码-->
          <div class="item">
            <div class="item-input-area">
              <div class="item-title">确认密码 :</div>
              <input
                  class="text-input"
                  placeholder="请再次输入密码"
                  type="password"
                  v-model.trim="formData.reLoginPwd"
                  maxlength="16"
                  :type="showPwd? 'text' : 'password'"
                  @blur="rePwdInputBlur"
                  @input="checkRePwd"
              >
              <div
                  class="close-icon"
                  v-show="formData.reLoginPwd"

                  @click="formData.reLoginPwd = null"
              >
                <IconFont iconType="close"></IconFont>
              </div>
              <div v-show="formData.reLoginPwd"
                   @click="showPwd = !showPwd"
                   class="show-pwd">
                <IconFont :iconType=" showPwd ? 'viewOff' : 'view' "></IconFont>
              </div>
            </div>
            <div class="error">{{ this.errorMsg.reLoginPwd }}</div>

          </div>
          <!--性别-->
          <div class="item">
            <div class="item-input-area">
              <div class="item-title">性别 :</div>
              <div class="radio">
                <label><input type="radio" value="1" v-model="formData.sex"> 男</label>
                <label><input type="radio" value="0" checked v-model="formData.sex">女</label>
              </div>
            </div>
          </div>
          <!--登录按钮-->
          <div class="item">
            <button @click="register" :disabled="isLoading" class="register-btn">{{isLoading? '注册中...' : "注册"}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/IconFont'
import {register} from '@/api/userService'
import {messageBox} from '@/utils'

export default {
  name: "Register",
  data() {
    return {
      formData: {
        tel: null,
        username: null,
        loginPwd: null,
        reLoginPwd: null,
        sex: 1
      },
      errorMsg: {
        tel: "",
        username: "",
        loginPwd: "",
        reLoginPwd: ""
      },
      showPwd: false,
      isLoading: false
    }
  },
  components: {
    IconFont
  },
  methods: {
    // 检查手机号
    checkTel() {
      const reg = /^1[0-9]{10}$/;
      if (!reg.test(this.formData.tel)) {
        this.errorMsg.tel = "请填写正确的手机号"
      } else {
        this.errorMsg.tel = ""
      }
    },
    telInputBlur() {
      if(!this.formData.tel) {
        this.errorMsg.tel = ""
      }
    },
    // 检查密码 字母，数字，特殊字符，必须包含两种，长度 6 - 16
    checkPwd() {
      const reg = /^(?![a-zA*Z]+$)(?![0-9]+$)(?![^a-zA-Z0-9]+$)[\S]{6,16}$/;
      if (!reg.test(this.formData.loginPwd)) {
        this.errorMsg.loginPwd = "字母，数字，字符须包含两种，长度6-16"
        return false;
      } else {
        this.errorMsg.loginPwd = "";
        return true;
      }
    },
    pwdInputBlur() {
      if (!this.formData.loginPwd) {
        this.errorMsg.loginPwd = ""
      }
    },
    checkRePwd() {
      const reg = /^(?![a-zA*Z]+$)(?![0-9]+$)(?![^a-zA-Z0-9]+$)[\S]{6,16}$/;
      if (reg.test(this.formData.reLoginPwd)) {
        if (this.formData.reLoginPwd === this.formData.loginPwd) {
          this.errorMsg.reLoginPwd = "";
          return true
        } else {
          this.errorMsg.reLoginPwd = "两次密码不一致"
          return false
        }
      } else {
        this.errorMsg.reLoginPwd = "字母，数字，字符须包含两种，长度6-16";
        return false;
      }
    },
    rePwdInputBlur() {
      if (!this.formData.reLoginPwd) {
        this.errorMsg.reLoginPwd = ""
      }
      if (this.formData.loginPwd && !this.formData.reLoginPwd) {
        this.errorMsg.reLoginPwd = "请再次输入密码"
      } else {
        this.errorMsg.reLoginPwd = ""
      }
    },
    checkEmpty() {
      let result = true;
      if(!this.formData.username) {
        this.errorMsg.username = "请填写姓名"
        result = false;
      }
      if(!this.formData.loginPwd) {
        this.errorMsg.loginPwd = "请填写密码"
        result = false;
      }
      if(!this.formData.reLoginPwd) {
        this.errorMsg.reLoginPwd = "请再次填写密码"
        result = false;
      }
      if(!this.formData.tel) {
        this.errorMsg.tel = "请填写手机号"
        result = false;
      }
      return result;
    },

    async register() {
      if(this.checkEmpty()) {
        this.isLoading = true
        const resp = await register(
            this.formData.username,
            this.formData.loginPwd,
            this.formData.tel,
            this.formData.sex
        );
        if(resp) {
          messageBox(
              "注册成功",
              "success",
              1500,
              undefined,
              () => {
                this.$router.push({
                  name: "Login"
                }).then().catch(r => {
                })
              }
          )
        } else {
          messageBox(
              "该手机号已经被注册",
              "error",
              2500,
              undefined,
              () => {

              }
          )
        }
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.register-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("~@/assets/images/Home/login02.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .main {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;

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

    .form-area {
      width: 520px;
      height: 90%;
      background-color: #FFF;
      position: absolute;
      border-radius: 20px;
      top: 35px;
      right: 135px;
      overflow-y: auto;
      color: @info;

      @contentWidth: 420px;

      .title {
        width: 100%;
        margin-top: 40px;
        margin-bottom: 0;

        h2 {
          font-size: 36px;
          color: @word;
          box-sizing: border-box;
          width: @contentWidth;
          margin: 0 auto;
        }
      }

      .login-link {
        margin-bottom: 30px;

        p {
          width: @contentWidth;
          margin: 0 auto;
          font-size: 13px;
          color: @word;

          a {
            color: @info;
          }
        }
      }

      .form {
        width: @contentWidth;
        margin: 50px auto 0;

        .item {
          margin-bottom: 10px;

          .item-input-area {
            display: flex;
            height: 36px;
            line-height: 36px;
            position: relative;

            .close-icon {
              position: absolute;
              right: 68px;
              top: 0;
              font-size: 18px;
              transition: all 0.3s;
              cursor: pointer;

              &:hover {
                color: @warn;
              }
            }

            .show-pwd {
              position: absolute;
              right: 90px;
              font-size: 18px;
            }

            .item-title {
              width: 80px;
              text-align: right;
              margin-right: 10px;
              color: darken(@info, 20%);
            }

            .text-input {
              outline: none;
              border: 1px solid darken(@info, 20%);
              width: 270px;
              box-sizing: border-box;
              padding-left: 15px;
              border-radius: 10px;

              &:focus {
                border: 1px solid darken(@info, 50%);
              }

              &::placeholder {
                font-size: 13px;
                color: @info;
              }

            }

            .radio label {
              margin: 0 20px;
            }
          }

          .error {
            box-sizing: border-box;
            font-size: 13px;
            height: 24px;
            color: @error;
            padding-left: 80px;
            line-height: 24px;
          }

          .register-btn {
            width: @contentWidth - 100px;
            display: block;
            outline: none;
            border: none;
            height: 36px;
            color: #FFF;
            background-color: darken(@info, 20%);
            margin: 30px auto 0;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background-color: darken(@info, 10%);
            }
          }
        }
      }
    }
  }
}
</style>
