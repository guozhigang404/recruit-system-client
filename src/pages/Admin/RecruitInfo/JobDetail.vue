<template>
  <div v-if="jobData" class="job-detail-container">
    <div class="item">
      <div class="title">职位名称</div>
      <div class="data">{{ jobData.content }}</div>
    </div>
    <div class="item">
      <div class="title">招聘数量</div>
      <div class="data">{{ jobData.count }}</div>
    </div>
    <div class="item">
      <div class="title">预计薪资</div>
      <div class="data">{{ jobData.wages }}</div>
    </div>
    <div class="item">
      <div class="title">发布日期</div>
      <div class="data">{{
          `${utcToLocal(jobData.createdAt).datePart} ${utcToLocal(jobData.createdAt).timePart}`
        }}
      </div>
    </div>
    <div class="detail-content">
      <p
          v-for="text in jobData.details"
      >{{ text }}</p>
    </div>
    <div class="back">
      <router-link
          :to="{
          name: 'RecruitInfoList'
        }"
      >返回
      </router-link>
    </div>
  </div>
</template>

<script>
import {getJobById} from '@/api/job'
import {utcToLocal} from '@/utils/date'

export default {
  name: "JobDetail",
  data() {
    return {
      jobData: null
    }
  },
  methods: {
    async loadJob() {
      let id = this.$route.params.id;
      let resp = await getJobById(id);
      this.jobData = resp.data;
      this.jobData.details = this.jobData.details.split("\n");

    },
    utcToLocal
  },
  created() {
    this.loadJob().then(() => {
    })
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.job-detail-container {
  width: 80%;
  margin: 25px auto;
  background-color: #FFF;
  height: 700px;
  box-sizing: border-box;
  padding: 50px;

  .item {
    display: flex;
    height: 40px;
    line-height: 40px;

    .title {
      width: 120px;
      text-align: center;
      font-weight: bold;
    }
  }

  .detail-content {
    padding: 20px;
    box-sizing: border-box;

    p {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  .back a {
    color: @info;
  }
}
</style>
