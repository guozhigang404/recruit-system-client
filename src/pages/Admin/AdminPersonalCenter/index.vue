<template>
  <div class="personal-center-container" v-if="userData">
    <div class="item">
      <div class="info">
        <div class="title">基本信息</div>
        <div class="content">
          <div class="left">
            <div class="photo">
              <img ref="photoImg"
                   :src="userData.photo ?
                     userData.photo :
                     'https://img2.baidu.com/it/u=790045287,958560532&fm=26&fmt=auto'">
              <div class="changeImg">
                <a @click="showChangeImg = !showChangeImg">修改照片</a>
                <div class="submit" v-show="showChangeImg">
                  <input ref="photoInput" type="file" name="photo">
                  <button @click="uploadPhoto">提交照片</button>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="base-info">
              <div class="row">
                <div class="row-title">姓名</div>
                <input class="text-input" v-model="userInfo.name" type="text">
              </div>
              <div class="row">
                <div class="row-title">手机号</div>
                <input class="text-input" :value="userData.tel" disabled type="text">
              </div>
              <div class="row">
                <div class="row-title">邮箱</div>
                <input class="text-input" v-model="userInfo.email" type="text">
              </div>
              <div class="row">
                <div class="row-title">性别</div>
                <div class="radio-wrap">
                  <label><input type="radio" value="true" v-model="userInfo.sex">男 </label>
                  <label><input type="radio" value="false" v-model="userInfo.sex">女 </label>
                </div>
              </div>
              <div class="row">
                <div class="row-title">生日</div>
                <div class="birth">
                      <span v-show="!showChangeBirth">
                      <input class="text-input" disabled v-model="userInfo.birth" type="text">
                      <a @click="showChangeBirth = !showChangeBirth">修改</a>
                    </span>
                  <input class="birthInput" v-show="showChangeBirth" value="1998-9-9" v-model="userInfo.birth"
                         type="date">
                </div>
              </div>
              <div class="row">
                <div class="row-title">地址</div>
                <input class="text-input" v-model="userInfo.address" type="text">
              </div>
              <div class="row">
                <div class="row-title">学校</div>
                <input class="text-input" v-model="userInfo.university" type="text">
              </div>
              <div class="row">
                <div class="row-title">专业</div>
                <input class="text-input" v-model="userInfo.major" type="text">
              </div>
              <div class="row">
                <div class="row-title">学历</div>
                <select v-model="userInfo.qualifications">
                  <option>研究生</option>
                  <option>本科</option>
                  <option>专科</option>
                </select>
              </div>
              <div class="row">
                <a class="save" @click="save">保存</a>
              </div>
            </div>
            <div class="pwd">
              <div class="nav">
                <a @click="showChangePwd = !showChangePwd"
                   :class="{
                        active: showChangePwd
                      }"
                >修改密码</a>
                <a @click="showChangePwd = !showChangePwd"
                   :class="{
                      active: !showChangePwd
                    }"
                >上传简历</a>
              </div>
              <div v-show="showChangePwd" class="changePwd">
                <div class="form">
                  <div class="form-item">
                    <div class="item-title">密码:</div>
                    <input v-model="loginPwd" type="password">
                  </div>
                  <div class="form-item">
                    <div class="item-title">确认密码:</div>
                    <input v-model="reLoginPwd" type="password">
                  </div>
                  <div class="form-item">
                    <p>{{ errorMsg }}</p>
                  </div>
                  <div class="form-item">
                    <button @click="changePwd">确定修改</button>
                  </div>
                </div>
              </div>
              <div v-show="!showChangePwd" class="uploadResume">
                <p>
                  <input ref="uploadResumeInput" type="file" name="resume">
                </p>
                <button @click="uploadResume">上传简历</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {messageBox} from '@/utils'
import {updateBaseInfo, uploadPhoto, uploadResume} from '@/api/userService'

export default {
  name: "AdminPersonalCenter",
  data() {
    return {
      imgUrl: null,
      userInfo: {
        name: null,
        sex: null,
        birth: null,
        address: null,
        major: null,
        university: null,
        qualifications: null,
        email: null
      },
      showChangeImg: false,
      showChangeBirth: false,
      showChangePwd: true,
      loginPwd: null,
      reLoginPwd: null,
      errorMsg: ""
    }
  },
  computed: {
    ...mapState("user", ["userData"]),
  },
  methods: {
    async uploadPhoto() {
      let file = this.$refs.photoInput.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("photo", file, file.name);
        let resp = await uploadPhoto(formData);
        if (resp.code === 0) {
          this.$refs.photoImg.src = resp.data + `?r=${Math.random()}`
          await this.$store.dispatch("user/whoAmi")
          messageBox(
              "修改成功",
              "success",
              1200
          )
        }
      } else {
        messageBox(
            "你还没有选择文件",
            "warn",
            2000
        )
      }
    },
    save() {
      updateBaseInfo(this.userInfo).then(res => {
        this.$store.dispatch("user/whoAmi").then(() => {
          messageBox(
              "更新成功",
              "success",
              1200
          )
        })
      })
    },
    async uploadResume() {
      let file = this.$refs.uploadResumeInput.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("resume", file, file.name);
        let resp = await uploadResume(formData);
        if (resp.code === 0) {
          await this.$store.dispatch("user/whoAmi")
          messageBox(
              "上传成功",
              "success",
              1200
          )
        }
      } else {
        messageBox(
            "你还没有选择文件",
            "warn",
            2000
        )
      }
    },
    changePwd() {
      const reg = /^(?![a-zA*Z]+$)(?![0-9]+$)(?![^a-zA-Z0-9]+$)[\S]{6,16}$/;
      if (!this.loginPwd || !this.reLoginPwd) {
        this.errorMsg = "请填写密码";
      } else if (!reg.test(this.loginPwd)) {
        this.errorMsg = "字母、数字、符号必须包含其中两种(6-16位)"
      } else if (this.loginPwd !== this.reLoginPwd) {
        this.errorMsg = "两次密码不一致"
      } else {
        updateBaseInfo({
          loginPwd: this.loginPwd
        }).then(res => {
          this.reLoginPwd = null;
          this.loginPwd = null;
          this.$store.dispatch("user/whoAmi")
          messageBox(
              "修改成功",
              "success",
              1500
          )
        })
      }
    }
  },
  created() {
    let data = this.$store.state.user.userData;
    this.userInfo.name = data.name;
    this.userInfo.sex = data.sex;
    this.userInfo.address = data.address
    this.userInfo.birth = data.birth;
    this.userInfo.major = data.major;
    this.userInfo.qualifications = data.qualifications;
    this.userInfo.university = data.university;
    this.userInfo.email = data.email
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/public.less";
@import "~@/styles/color.less";

.personal-center-container {
  width: 80%;
  margin: 0 auto;
  height: 800px;
  padding-top: 20px;

  .content {
    display: flex;
    box-sizing: border-box;
    padding-top: 30px;
  }

  .right {
    flex: 1 1 auto;
    display: flex;

    .base-info {
      width: 50%;
      box-sizing: border-box;
      padding-left: 25px;

      .row {
        display: flex;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;

        .row-title {
          width: 80px;
          text-align: center;
        }

        .text-input {
          width: 150px;
          padding-left: 10px;
          box-sizing: border-box;
          border: none;
          border-bottom: 2px solid @info;
          text-align: center;
        }

        select {
          width: 100px;
          outline: none;
        }

        .save {
          display: block;
          margin: 0 70px;
          width: 100px;
          background-color: @adminRed;
          color: #FFF;
          text-align: center;
          cursor: pointer;
        }

        .birth {
          input {
            background-color: transparent;
            width: 80px;
            margin-right: 10px;
          }

          .birthInput {
            width: 120px;
          }

          a {
            color: @link;
            cursor: pointer;
            font-size: 13px;
          }
        }
      }
    }

    .pwd {
      height: 400px;
      width: 50%;

      .nav {
        width: 100%;
        height: 30px;
        line-height: 30px;

        a {
          font-size: 14px;
          display: inline-block;
          width: 100px;
          text-align: center;
          line-height: 30px;
          color: @info;
          cursor: pointer;
          transition: all 0.3s;

          &.active {
            color: @adminRed;
          }
        }
      }

      .changePwd,
      .uploadResume {
        width: 100%;
        padding-top: 15px;
        box-sizing: border-box;
        height: 400px;
      }

      .uploadResume {
        p {
          margin-bottom: 10px;
        }

        button {
          outline: none;
          border: none;
          background-color: @adminRed;
          width: 100px;
          height: 30px;
          color: #FFF;
          cursor: pointer;
        }
      }

      .changePwd {
        .form {
          width: 80%;
          margin: 10px auto;

          .form-item {
            display: flex;
            margin-bottom: 10px;

            button {
              width: 250px;
              height: 36px;
              background-color: @adminRed;
              outline: none;
              border: none;
              display: block;
              margin: 30px auto 0;
              cursor: pointer;
            }

            p {
              width: 100%;
              font-size: 13px;
              color: @adminRed;
              text-align: center;
            }

            .item-title {
              width: 100px;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
          }
        }
      }
    }
  }

  .item {
    margin-bottom: 30px;
    background-color: #FFF;
    .boxShadow();
  }

  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      padding-left: 20px;
      color: @word;
      border-bottom: 1px solid darken(#FFF, 10%);
    }
  }

  .photo {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    input {
      width: 70px;
      overflow: hidden;
    }

    .title {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      padding-left: 30px;
      border-bottom: 1px solid darken(#FFF, 10%);
      margin-bottom: 20px;
    }

    img {
      width: 120px;
      height: 200px;
    }

    .changeImg {
      a {
        line-height: 24px;
        text-align: center;
        display: block;
        width: 120px;
        color: @link;
        font-size: 13px;
        cursor: pointer;
      }

      .submit {
        text-align: center;
        box-sizing: border-box;
        padding-top: 20px;

        button {
          outline: none;
          border: none;
          background-color: transparent;
          color: @link;
          cursor: pointer;
        }
      }
    }

  }

  .left {
    width: 120px;
  }

}
</style>
