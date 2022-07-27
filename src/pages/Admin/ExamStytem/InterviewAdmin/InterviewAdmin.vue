<template>
  <div class="interview-admin-container">
    <div class="search">
      <SearchBox @search="handleSearch" placeholder="输入手机号"></SearchBox>
    </div>
    <div v-if="interViewData" class="interview-main">
      <div class="top">
        <div class="img">
          <img :src="interViewData.user.photo">
        </div>
        <div class="user-data">
          <div class="item">
            <div class="label">姓名:</div>
            <div class="data">{{ interViewData.user.name }}</div>
          </div>
          <div class="item">
            <div class="label">电话:</div>
            <div class="data">{{ interViewData.user.tel }}</div>
          </div>
          <div class="item">
            <div class="label">申请岗位:</div>
            <div class="data">{{ interViewData.resume.recruitment_info.content }}</div>
          </div>
          <div class="item">
            <div class="label">学历</div>
            <div class="data">{{ interViewData.user.qualifications }}</div>
          </div>
        </div>
      </div>
      <div class="ctrl">
        <div class="text">
          <textarea v-model="remark" placeholder="备注"></textarea>
        </div>
        <div class="btn">
          <button @click="pass" class="pass">通过</button>
          <button @click="reject" class="reject">拒绝</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import Pager from "@/components/Pager";
import {messageBox} from "@/utils";
import {getInterviewData, interviewPass, interviewReject} from "@/api/interview";

export default {
  name: "InterviewAdmin",
  components: {
    Pager,
    SearchBox
  },
  data() {
    return {
      interViewData: null,
      remark: ""
    }
  },
  methods: {
    async pass() {
      // 更新 简历，状态为 4  面试表状态 为1  result
      let userId = this.interViewData.user.id;
      let resumeId = this.interViewData.resume.id;
      let interviewId = this.interViewData.interview.id;
      let res = await interviewPass(resumeId, interviewId);
      if (res.code === 0) {
        messageBox(
            "已通过",
            "success",
            1200
        );
        this.interViewData = null;
      } else {
        messageBox(
            "操作失败",
            "warn",
            1000
        )
      }
    },

    async reject() {
      // 更新 简历，状态为 -1  面试表状态 为0  result
      if (!this.remark) {
        messageBox(
            "请填写备注",
            "warn",
            1200
        )
      }
      let userId = this.interViewData.user.id;
      let resumeId = this.interViewData.resume.id;
      let interviewId = this.interViewData.interview.id;
      let res = await interviewReject(resumeId, interviewId, this.remark);
      if (res.code === 0) {
        messageBox(
            "已拒绝",
            "success",
            1200
        )
      } else {
        messageBox(
            "操作失败",
            "warn",
            1000
        )
      }
    },
    async handleSearch(val) {
      if (!val) {
        messageBox(
            "请输入手机号",
            "warn",
            1200
        )
        return;
      }
      // 查询 用户信息，简历信息， 面试信息
      let res = await getInterviewData(val);
      if (res.code === 0) {
        this.interViewData = res.data;
      } else {
        messageBox(
            "暂无数据",
            "warn",
            1200
        );
        this.interViewData = null;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.interview-admin-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;

  .search {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .interview-main {
    .top {
      height: 230px;
      box-sizing: border-box;
      padding: 0 50px;
      display: flex;

      .img {
        width: 180px;
        height: 100%;

        img {
          width: 180px;
        }
      }

      .user-data {
        flex: 1 1 auto;
        height: 100%;
        box-sizing: border-box;
        padding-left: 30px;

        .item {
          display: flex;
          line-height: 36px;

          .label {
            width: 88px;
            color: #5E72E4;
          }
        }

      }
    }

    .ctrl {
      width: 500px;
      height: 300px;
      margin-top: 20px;
      overflow: hidden;

      .text {
        textarea {
          width: 300px;
          display: block;
          margin: 30px auto;
          height: 100px;
        }
      }

      .btn {
        text-align: center;

        button {
          width: 100px;
          height: 36px;
          margin: 0 30px;
          border: none;
          cursor: pointer;
          color: #fff;
          font-weight: bold;

          &.pass {
            background-color: #2DCE89;
          }

          &.reject {
            background-color: #DA2A4D;
          }
        }
      }


    }
  }

}

</style>
