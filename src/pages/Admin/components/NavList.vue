<template>
  <ul class="nav-list-container">
    <li
        v-for="(nav, i) in navList"
        :key="i"
        class="nav-item"
        @click="handleNavChange(nav)"
    >
      <span class="title">{{ nav.title }} <IconFont
          :icon-type=" curNav === nav ? 'arrowDown' : 'arrowRight' "></IconFont></span>
      <ul
          class="sub-menu"
          :style="{
            height: nav.subHeight + 'px'
          }"
      >
        <li
            v-for="subNav in nav.children"
        >
          <router-link
              :to="{
            name: subNav.name
          }"
              active-class="nav-active"
              exact-active-class=""
              :exact="subNav.exact"
          >{{ subNav.title }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import IconFont from '@/components/IconFont'

export default {
  name: "NavList",
  data() {
    return {
      navList: [
        {
          subHeight: 0,
          title: "求职申请",
          children: [
            {
              name: "ApplyList",
              title: "申请列表",
              exact: false
            }
          ]
        },
        {
          subHeight: 0,
          title: "招聘信息",
          children: [
            {
              name: "RecruitInfoList",
              title: "岗位列表",
              exact: false
            },
            {
              name: "ReleaseJob",
              title: "发布岗位",
              exact: true
            }
          ]
        },
        {
          subHeight: 0,
          title: "用户管理",
          children: [
            {
              name: "UserList",
              title: "用户列表",
              exact: false
            },
            {
              name: "BlackList",
              title: "黑名单",
              exact: true
            }
          ]
        },
        {
          subHeight: 0,
          title: "考核管理",
          children: [
            {
              name: "QuestionAdmin",
              title: "题库管理",
              exact: true
            },
            {
              name: "TestAdmin",
              title: "考试管理",
              exact: true
            },
            {
              name: "TestResultAdmin",
              title: "评分系统",
              exact: false
            },
            {
              name: "OnlineTestResult",
              title: "成绩管理",
              exact: false
            },
            {
              name: "InterviewAdmin",
              title: "面试管理",
              exact: true
            }
          ]
        },

        {
          subHeight: 0,
          title: "管理员",
          children: [
            {
              name: "AdminPersonalCenter",
              title: "个人中心",
              exact: true
            }
          ]
        }

      ],
      curNav: null,
    }
  },
  components: {
    IconFont
  },
  methods: {
    handleNavChange(nav) {
      if (this.curNav) {
        this.curNav.subHeight = 0;
      }
      nav.subHeight = nav.children.length * 36;
      this.curNav = nav;
      this.$emit("navChange")
    }
  },
  created() {
    this.handleNavChange(this.navList[0])
    this.curNav = this.navList[0]
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
@import "~@/styles/var.less";

.nav-list-container {
  color: #FFF;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;


  .nav-item {
    width: 100%;

    .title {
      display: block;
      width: 100%;
      height: 45px;
      box-sizing: border-box;
      padding-left: 30px;
      line-height: 45px;
      font-size: 18px;
      color: lighten(@gray, 10%);
      cursor: pointer;
      transition: all 0.3s;
      position: relative;

      .icon-container {
        position: absolute;
        right: 10px;
        font-size: 24px;
      }

      &:hover {
        background-color: lighten(@leftBgColor, 10%);
      }

      &.title-active {
        background-color: lighten(@leftBgColor, 10%);
      }


    }

    .sub-menu {
      font-size: 14px;
      overflow: hidden;
      transition: all 0.23s;

      li a {
        color: #FFF;
        width: 100%;
        height: 36px;
        line-height: 36px;
        display: block;
        box-sizing: border-box;
        padding-left: 60px;
        cursor: pointer;

        &:hover {
          background-color: lighten(@leftBgColor, 10%);
        }

        &.nav-active {
          background-color: lighten(@leftBgColor, 10%);
        }
      }
    }
  }

}
</style>
