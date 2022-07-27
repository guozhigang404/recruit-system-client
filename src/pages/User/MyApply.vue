<template>
  <div class="my-apply-container">
    <div class="main">
      <div class="item">
        <div class="title">申请进度</div>
        <div class="content">
          <div class="head">
            <div class="reload" @click="reload">刷新</div>
            <div class="name">{{ name }}</div>
            <div class="tip">
              <div class="tip-item done">已通过</div>
              <div class="tip-item active">正在进行</div>
            </div>
          </div>
          <div class="progress" v-if="resume">
            <div class="step-wrap">
              <div class="step"
                   :class="{
                  done: true,
                }"
              >已投递
              </div>
              <div class="line "></div>
              <div class="step"
                   :class="{
                  done: resume.status > 1,
                  active:resume.status === 1
                }"
              >审核中
              </div>
              <div class="line"></div>
              <div class="step"
                   :class="{
                  done: resume.status > 2,
                  active:resume.status === 2
                }"
              >理论测试
              </div>
              <div class="line"></div>
              <div class="step" :class="{
                  done: resume.status > 3,
                  active:resume.status === 3
                }"
              >面试
              </div>
              <div class="line"></div>
              <div class="step"
                   :class="{
                  done: resume.status > 4,
                  active:resume.status === 4
                }"
              >通过
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item job-info" v-if="jobInfo">
        <div class="title">职位信息</div>
        <div class="content">
          <div class="job-name">{{ jobInfo.content }}</div>
          <div class="detail">
            <p
                v-for="(data, i) in jobInfo.details"
                :key="i"
            >{{ data }}</p>
          </div>
        </div>
      </div>
      <div class="item reason" v-if="resume && resume.remark !== null">
        <div class="title">未通过的原因</div>
        <div class="content">
          <div class="detail">
            {{ resume.remark }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getResume} from '@/api/resume'
import {getJobById} from '@/api/job'
import {messageBox} from '@/utils'

export default {
  name: "MyApply",
  data() {
    return {
      resume: null,
      jobInfo: null,
    }
  },
  computed: {
    name() {
      if (this.resume !== null) {
        if (this.resume.status >= 4) {
          return `你已经通过${this.jobInfo.content}岗位的考核`
        }
        return this.jobInfo.content
      }
    }
  },
  methods: {
    reload() {
      this.loadData();
    },
    async loadData() {
      try {
        let resumeResp = await getResume(this.$store.state.user.userData.id);
        let resume = resumeResp.data;
        if (resume.status === -1) {
          messageBox(
              "你没有正在处理的申请",
              "info",
              2000
          )
        } else {
          let jobResp = await getJobById(resume.recruitmentInfoId);
          this.jobInfo = jobResp.data;
          this.jobInfo.details = this.jobInfo.details.split("\n");
          this.resume = resume;
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  async created() {
    await this.loadData();
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
@import "~@/styles/public.less";

.main {
  width: 90%;
  padding-top: 50px;
  margin: 0 auto;

  .item {
    margin-bottom: 60px;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: lighten(@word, 15%);
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .content {
    background-color: #FFF;
    padding: 15px;
    .boxShadow();
  }

  .head {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 25px;
    font-size: 14px;
    color: darken(@info, 15%);
    position: relative;

    .reload {
      position: absolute;
      color: @info;
      right: 300px;
      cursor: pointer;
    }

    .name {
      position: absolute;
      left: 20px;
      top: 0;
    }

    .tip {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;

      .tip-item {
        height: 40px;
        line-height: 40px;
        width: 120px;
        box-sizing: border-box;
        padding-left: 30px;
        position: relative;

        &.done {
          color: #26B376;
        }

        &.active {
          color: #DA2A4D;
        }

        &.done::before {
          content: "";
          position: absolute;
          width: 15px;
          height: 15px;
          left: 10px;
          top: 13px;
          background-color: #26B376;
        }

        &.active::before {
          content: "";
          position: absolute;
          width: 15px;
          height: 15px;
          left: 10px;
          top: 13px;
          background-color: #DA2A4D;
        }
      }

    }
  }

  .progress {
    height: 130px;
    overflow: hidden;
    box-sizing: border-box;

    .step-wrap {
      width: 80%;
      margin: 0 auto;
      display: flex;
      height: 130px;
      justify-content: space-between;
      align-items: center;
    }

    .step {
      width: 11.11%;
      text-align: center;
      height: 50px;
      line-height: 50px;
      background-color: @gray;
      opacity: 0.8;
      border-radius: 10px;

      &.done {
        background-color: #26B376;
        opacity: 1;
      }

      &.active {
        background-color: #DA2A4D;
        opacity: 1;
      }
    }

    .line {
      width: 10%;
      height: 0;
      border-bottom: 2px dashed #6D9FEE;
    }
  }

  .job-info {
    .job-name {
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      color: #F5365C;
      border-bottom: 1px solid lighten(@gray, 10%);
      margin-bottom: 15px;
    }

    .detail {
      width: 100%;
      box-sizing: border-box;
      padding: 0 12px;

      p {
        font-size: 14px;
        color: #0F1E35;
        line-height: 20px;
      }
    }
  }

  .reason {
    .detail {
      text-indent: 2em;
      width: 90%;
      margin: 0 auto;
      line-height: 36px;
    }
  }

}
</style>
