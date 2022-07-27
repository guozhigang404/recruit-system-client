<template>
  <div class="interview-container">
    <div class="interview-list">
      <div class="thead">
        <div class="col time">面试时间</div>
        <div class="col address">面试地点</div>
        <div class="col status">状态</div>
      </div>
      <div class="tbody" v-if="interviewList">
        <div
            class="row"
            v-for="interview in interviewList.data"
            :key="interview.id"
        >
          <div class="col time">{{ handleTime(interview.time) }}</div>
          <div class="col address">{{ interview.address }}</div>
          <div class="col status">
            <span v-if="interview.status === -1">未开始</span>
            <span v-else-if="interview.status === 1">已通过</span>
            <span @click="viewReason(interview)" v-else>点击查看未通过原因</span>
          </div>
        </div>
        <div class="pager">
          <Pager
              :current="curPage"
              :total="interviewList.total"
              :limit="limit"
              @pageChange="handlePageChange"
          ></Pager>
        </div>
      </div>

    </div>

    <div class="remark">
      <div v-if="failedInterview" class="reason">
        {{ failedInterview.remark }}
      </div>
      <Empty v-else message="无数据"></Empty>
    </div>
  </div>
</template>

<script>
import {getInterviewList} from '@/api/interview'
import {utcToLocal} from '@/utils/date'
import Empty from '@/components/Empty'
import Pager from '@/components/Pager'

export default {
  name: "MyInterview",
  components: {
    Empty,
    Pager
  },

  data() {
    return {
      interviewList: null,
      failedInterview: null,
      curPage: 1,
      limit: 10
    }
  },
  methods: {
    handleTime(date) {
      let localDate = utcToLocal(date);
      return `${localDate.datePart} ${localDate.timePart}`
    },
    viewReason(interview) {
      this.failedInterview = interview;
    },
    async loadData(page, limit) {
      let resp = await getInterviewList(page, limit)
      this.interviewList = resp.data;
      console.log(resp)
    },
    handlePageChange(newPage) {
      this.loadData(newPage, this.limit);
      this.curPage = newPage;
    }
  },
  created() {
    this.loadData(this.curPage, this.limit)
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/public.less";
@import "~@/styles/color.less";

.interview-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 30px;
  display: flex;
  justify-content: space-around;

  .interview-list {
    width: 60%;
    height: 600px;
    background-color: #FFF;
    .boxShadow();
    border-radius: 15px;
    overflow: hidden;

    .col {
      text-align: center;

      &.time {
        width: 30%;
      }

      &.address {
        width: 40%;
      }

      &.status {
        width: 30%;
        color: @info;
        cursor: pointer;
      }

    }

    .row {
      display: flex;
      height: 32px;
      line-height: 32px;
      border-bottom: 1px solid lighten(@gray, 8%);
      font-size: 14px;
    }

    .thead {
      height: 50px;
      border-bottom: 1px solid lighten(@gray, 8%);
      display: flex;
      line-height: 50px;
      color: @headerBgDark;
      background-color: @info;
      margin-bottom: 10px;
    }

    .tbody {
      height: 500px;
    }
  }

  .remark {
    width: 35%;
    height: 600px;
    background-color: #FFF;
    .boxShadow();

    .reason {
      width: 100%;
      height: 400px;
      box-sizing: border-box;
      padding: 30px;
      text-indent: 2em;
      color: @adminRed;
      font-size: 14px;
      line-height: 20px;
    }
  }

}
</style>
