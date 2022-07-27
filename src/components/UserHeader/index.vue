<template>
  <div class="user-header-container">
    <div class="hide-left" @click="hideList">
      <IconFont iconType="list"></IconFont>
    </div>
    <div class="ctrl">

      <!--<div class="notice" @click="styles.showNoticeList = !styles.showNoticeList">
        <IconFont iconType="notice"></IconFont>
        <div v-show="styles.showNoticeList" class="notice-list">
          &lt;!&ndash;<div class="title">你有一些未读的消息</div>&ndash;&gt;
          <div
              class="item"
              v-for="item in unReadNotice"
              :key="item.id"
              @click="viewNoticeDetail(item)"
          >
            {{ item.content }}
          </div>
          <div class="last-all"><a href="#">查看所有通知</a></div>
        </div>
      </div>-->

      <div
          class="user-ctrl"
          @click="styles.showUserCtrl = !styles.showUserCtrl"
          v-if="userData"
      >
        <Avatar :size="45" :url="userData.photo != null ? userData.photo : defaultAvatar"></Avatar>
        <ul v-show="styles.showUserCtrl" class="drop-down">
          <li class="name">{{ userData.name }}</li>
          <li class="item">
            <div class="icon">
              <IconFont iconType="user"></IconFont>
            </div>
            <router-link :to="{
              name: personalCenterRouter
            }">个人中心
            </router-link>
          </li>
          <li class="item" @click="logout">
            <div class="icon">
              <IconFont iconType="poweroff"></IconFont>
            </div>
            <a>退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/IconFont'
import Avatar from '@/components/Avatar'
import SearchBox from '@/components/SearchBox'
// import {mapState} from 'vuex'
import Pager from '@/components/Pager'
import {mapState} from 'vuex'

export default {
  name: "UserHeader",
  data() {
    return {
      navWidth: 220,
      // userData: this.$store.state.user.userData,
      isHideLeft: false,
      styles: {
        showNoticeList: false,
        showUserCtrl: false
      },
      noticeData: [],
      defaultAvatar: "https://img2.baidu.com/it/u=790045287,958560532&fm=26&fmt=auto"
    }
  },
  components: {
    Pager,
    IconFont,
    Avatar,
    SearchBox
  },
  props: {
    noticeRouterPath: {
      type: String,
      default: "UserNoticeDetail"
    },
    allNoticeRouterPath: {
      type: String,
      default: "/user/noticedetail"
    },
    personalCenterRouter: {
      type: String,
      default: "PersonalCenter"
    }

  },
  computed: {
    headerNoticeList() {
      let list = [];
      for (let i = 0; i < 6; i++) {
        list.push(this.noticeData[i])
      }
      return list;
    },
    /* unReadNotice() {
       let list = [];
       for (let i = 0; i < this.noticeData.length; i++) {
         if (!this.noticeData[i].read) {
           list.push(this.noticeData[i])
         }
       }
       return list
     },*/
    ...mapState("user", ["userData"])
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logOut")
      this.$router.push({
        name: "Home"
      })
    },
    hideList() {
      this.isHideLeft = !this.isHideLeft;
      this.$emit("hideLeft", this.isHideLeft);
    },
    /*viewNoticeDetail(item) {
      this.noticeData.forEach(i => {
        if (i.id === item.id) {
          i.read = true;
        }
      })
      this.$router.push({
        name: this.noticeRouterPath,
        query: {
          id: item.id
        }
      })
    },*/
    handleSearch(query) {
      this.$emit("search", query);
    }
  },
  created() {
    // getNotice().then(resp => {
    //   this.noticeData = resp.data.data;
    // });
    // this.$store.dispatch("notice/loadNotice")
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/color.less";

.user-header-container {
  width: 100%;
  height: @userHeaderHeight;
  background-color: #FFFFFF;
  box-shadow: 0 1px 8px @gray;
  position: relative;

  .ctrl {
    position: absolute;
    display: flex;
    right: 30px;
    top: 0;
  }

  .notice {
    width: @userHeaderHeight;
    height: @userHeaderHeight;
    text-align: center;
    line-height: @userHeaderHeight;
    cursor: pointer;
    position: relative;

    .notice-list {
      width: 300px;
      height: 500px;
      position: absolute;
      right: -60px;
      z-index: 20;
      top: 62px;
      background-color: lighten(@info, 10%);
      border-radius: 3px;
      box-sizing: border-box;
      padding: 10px;
      color: lighten(@word, 10%);
      overflow-y: auto;

      .title {
        width: 100%;
        height: 36px;
        line-height: 36px;
        box-sizing: border-box;
        padding-left: 20px;
        text-align: left;
        border-bottom: 1px solid @gray;
      }

      .item {
        width: 100%;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding-left: 20px;
        text-align: left;
        border-bottom: 1px solid @gray;
        color: #000;
        font-weight: bold;

        transition: all 0.2s;

        &:hover {
          color: lighten(#000, 20%);
        }

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .last-all {
        //position: absolute;
        //bottom: 0;
        height: 36px;
        width: 100%;
        line-height: 36px;
        color: @word;
        text-align: center;
        margin-top: 50px;
      }
    }


    .icon-container {
      font-size: 24px;
    }

  }

  .drop-down {
    position: absolute;
    right: 10px;
    top: 62px;
    width: 150px;
    box-sizing: border-box;
    padding: 10px;
    background-color: #FFF;
    border-radius: 10px;

    li {
      height: 24px;
      line-height: 24px;
      margin: 10px 0;
      font-size: 14px;
      display: flex;
      border-radius: 4px;
      transition: all 0.3s;

      &.name {
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid @gray;
      }

      &.item:hover {
        background-color: @info;
      }

      .icon {
        width: 25px;
        text-align: center;
        margin-right: 10px;
      }

      a {
        text-align: center;
        font-size: 13px;
      }
    }

  }

  .user-ctrl {
    width: @userHeaderHeight;
    height: @userHeaderHeight;
    box-sizing: border-box;
    padding-top: 8px;
    cursor: pointer;
  }

  .hide-left {
    width: @userHeaderHeight;
    height: @userHeaderHeight;
    line-height: @userHeaderHeight;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }

}
</style>
