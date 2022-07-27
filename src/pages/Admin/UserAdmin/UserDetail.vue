<template>
  <div class="user-detail">
    <div class="user-left">
      <div v-if="userData" class="detail">
        <UserDetail :user-data="userData"></UserDetail>
      </div>
    </div>
    <div class="user-right">
      <div v-if="!blackData" class="add-blacklist">
        <div class="title">加入黑名单</div>
        <div class="text">
          <textarea placeholder="请填写原因" v-model="reason"></textarea>
        </div>
        <div class="add-btn">
          <button @click="addBlackList">加入黑名单</button>
        </div>
      </div>
      <div v-if="blackData" class="remove-blacklist">
        <div class="title">已经被加入黑名单</div>
        <div class="reason">原因：{{ blackData.reason }}</div>
        <div class="remove-btn">
          <button @click="removeBlackList">移除黑名单</button>
        </div>
      </div>
      <div v-if="userType" class="set">
        <div class="title">设置身份</div>
        <div class="type">
          <label><input v-model="userType" :value="1" type="radio">管理员</label><label><input  v-model="userType" :value="3" type="radio">用户</label>
        </div>
        <button @click="changeUserType">修改用户身份</button>
      </div>
    </div>

  </div>

</template>

<script>
import UserDetail from '@/pages/Admin/components/UserDetail'
import {changeUserType, getUserById, updateBaseInfo} from '@/api/userService'
import {addBlackList, getBlackByUserId, removeBlackListById} from '@/api/blacklist'
import {messageBox} from '@/utils'
import ConfirmationBox from '@/utils/ConfirmationBox'

export default {
  name: "UserDetailPage",
  components: {
    UserDetail
  },
  data() {
    return {
      userData: null,
      blackData: null,
      reason: null,
      userType: null
    }
  },
  methods: {
    async loadUserData() {
      let id = this.$route.params.id;
      let res = await getUserById(id);
      this.userData = res.data;
      if(this.userData.userTypeId === 2) {
        this.userData.userTypeId = 1;
      }
      this.userType = this.userData.userTypeId;
    },
    async loadBlackList() {
      let id = this.$route.params.id;
      let res = await getBlackByUserId(id);
      this.blackData = res.data;
    },
    async addBlackList() {
      if (!this.reason) {
        messageBox(
            "请填写原因",
            "warn",
            2000
        )
        return;
      }
      let userId = this.$route.params.id;
      let res = await addBlackList(userId, this.reason);
      if (res.code === 0) {
        messageBox(
            "已加入黑名单",
            "success"
        )
        this.blackData = res.data;
      } else {
        messageBox(
            "添加失败",
            "error"
        )
      }
    },
    async removeBlackList() {
      ConfirmationBox(
          "请确认是否将该用户从黑名单中移除",
          async () => {
            let blackListId = this.blackData.id;
            let res = await removeBlackListById(blackListId);
            if (res.code === 0) {
              messageBox(
                  "移除成功",
                  "success"
              )
              this.blackData = null;
            } else {
              messageBox(
                  "移除失败",
                  "error"
              )
            }
          }
      )
    },

    async changeUserType() {
      ConfirmationBox(
          "此操作会修改用户的类型",
          async () => {
            // 点击确定
            let userType = this.userType;
            let userId = this.userData.id;
            let resp = await changeUserType(userId, userType);
            console.log(resp)
            if(resp.code === 0) {
              messageBox(
                  "修改成功",
                  "success",
                  1200
              )
            } else {
              messageBox(
                  "修改失败",
                  "warn",
                  1200
              )
            }
          },
          async () => {
            // 点击取消
          }
      )
    }
  },
  async created() {
    await this.loadUserData();
    await this.loadBlackList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.user-detail {
  width: 100%;
  height: 100%;
  background-color: #FFF;
  display: flex;
  flex-wrap: wrap;
  .user-left,
  .user-right {
    width: 50%;
  }

  .user-right {
    border-left: 1px solid darken(#FFF, 8%);
    box-sizing: border-box;
    padding: 40px;

    .add-blacklist {
      .title {
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: @adminRed;
      }

      textarea {
        width: 100%;
        height: 120px;
        resize: none;
        border: 2px solid @info;
        outline: none;
        box-sizing: border-box;
        padding: 20px;
        font-size: 18px;
      }

      .add-btn button {
        width: 100px;
        height: 38px;
        background-color: @adminRed;
        color: #FFF;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }

    .remove-blacklist {
      .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 18px;
        color: @adminRed;
      }

      .reason {
        box-sizing: border-box;
        padding: 20px;
        color: @adminGreen;
      }

      .remove-btn {
        margin-top: 20px;

        button {
          width: 120px;
          height: 38px;
          background-color: @adminRed;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }
    }

    .set {
      margin-top: 40px;
      .title {
        color: @adminRed;
        font-size: 18px;
        font-weight: bold;
      }

      .type {
        margin-top: 30px;
      }

      button {
        width: 110px;
        height: 36px;
        background-color: @adminRed;
        border: none;
        outline: none;
        color: #fff;
        margin-top: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
