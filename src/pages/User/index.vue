<template>
  <div class="user-container">
    <Layout>
      <template #header>
        <UserHeader @hideLeft="handleHideLeft"></UserHeader>
      </template>
      <template #left>
        <div
            class="left"
            ref="left"
            :style="{
              width: leftWidth + 'px'
            }"
        >
          <!-- * 侧边栏-->
          <div class="left-content">
            <div class="title">
              <router-link :to="{
                name: 'Home'
              }">欢迎使用
              </router-link>
            </div>
            <div class="nav">
              <!--
                招聘岗位
                我的申请
                我的考试
                我的面试
                个人中心
              -->
              <div class="nav-list">
                <router-link
                    v-for="nav in navList"
                    :key="nav.name"
                    active-class="active"
                    exact-active-class=""
                    :to="{
                    name: nav.name
                  }"
                >{{ nav.title }}
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </template>
      <template #right>
        <div class="right">
          <router-view></router-view>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
import UserHeader from '@/components/UserHeader'

export default {
  name: "User",
  data() {
    return {
      leftWidth: 220,
      navList: [
        {
          name: "JobList",
          title: "招聘岗位"
        },
        {
          name: "MyApply",
          title: "我的申请"
        },
        {
          name: "MyTest",
          title: "我的考试"
        },
        {
          name: "MyInterview",
          title: "我的面试"
        },
        /*{
          name: "MyNotice",
          title: "我的通知"
        },*/
        {
          name: "PersonalCenter",
          title: "个人中心"
        }
      ]
    }
  },
  components: {
    Layout,
    UserHeader
  },
  methods: {
    handleHideLeft(width) {
      if (width) {
        this.leftWidth = 0;
      } else {
        this.leftWidth = 220
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
@import "~@/styles/var.less";

.user-container {
  width: 100%;
  height: 100%;
  background-color: @mainBgColorLight;

  .left {
    width: 220px;
    height: 100%;
    background-color: @leftBgColor;
    transition: all 0.35s;
    overflow-x: hidden;
    overflow-y: auto;
  }

  // * left-content

  .left-content {
    width: 100%;
    white-space: nowrap;

    .title {
      height: @userHeaderHeight;
      line-height: @userHeaderHeight;
      text-align: center;
      font-size: 24px;
      color: #FFF;
      box-sizing: border-box;
      border-bottom: 1px solid @gray;
    }

    .nav-list {
      width: 100%;

      a {
        display: block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: lighten(@gray, 10%);
        box-sizing: border-box;
        border-left: 3px solid @leftBgColor;
        transition: all 0.3s;

        &:hover {
          border-left-color: #FFF;
          background-color: lighten(@leftBgColor, 10%);
        }

        &.active {
          border-left-color: #FFF;
          background-color: lighten(@leftBgColor, 10%);
        }
      }
    }

  }

  .right {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>

