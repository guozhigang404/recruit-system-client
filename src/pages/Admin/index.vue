<template>
  <div class="admin-container">
    <Layout>
      <template #header>
        <UserHeader personal-center-router="AdminPersonalCenter" @hideLeft="handleHideLeft"></UserHeader>
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
          <div class="title">
            <router-link to="/">招聘管理系统</router-link>
          </div>
          <div class="nav-container">
            <NavList></NavList>
          </div>
        </div>
      </template>
      <template #right>
        <div class="right">
          <router-view>right</router-view>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
import UserHeader from '@/components/UserHeader'
import NavList from '@/pages/Admin/components/NavList'
export default {
  name: "Admin",
  data() {
    return {
      leftWidth: 220,
      navList: [
        {
          childrenHeight: 0,
          routerName: "",
        }
      ]
    }
  },
  components: {
    Layout,
    UserHeader,
    NavList
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
.admin-container {
  width: 100%;
  height: 100%;
  background-color: @mainBgColorLight;

  .left {
    width: 220px;
    height: 100%;
    background-color: @leftBgColor;
    transition: all 0.35s;
    overflow: hidden;
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
  }

  .nav-container {
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
  }


  .right {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
