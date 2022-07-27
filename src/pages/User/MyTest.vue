<template>
  <div class="my-test-container">
    <div v-if="!isTest" class="section">
      <div class="col exam-list">
        <div class="title">我的考试
        </div>
        <div class="list-wrap">
          <div class="thead row">
            <div class="list-col">考试名称</div>
            <div class="list-col">考试时间</div>
            <div class="list-col">是否完成</div>
          </div>
          <template v-if="examList">
            <div
                class="row examinfo-row"
                v-for="exam in unDoneExamList"
                :key="exam.id"
            >
              <div class="list-col">{{ exam.exam_paper.name }}</div>
              <div class="list-col">{{ handleExamTime(exam.exam_paper) }}</div>
              <div class="list-col">
                <button @click="enterTest(exam)">进入考试</button>
              </div>
            </div>
            <div
                class="row examinfo-row"
                v-for="exam in doneExamList"
                :key="exam.id"
            >
              <div class="list-col">{{ exam.exam_paper.name }}</div>
              <div class="list-col">{{ handleExamTime(exam.exam_paper) }}</div>
              <div class="list-col">
                <button @click="viewScore(exam)">查看成绩</button>
              </div>
            </div>
          </template>
          <div v-else class="empty">
            <Empty message="你还未参加过考试"></Empty>
          </div>
        </div>

        <div class="pager" v-if="examList">
          <Pager
              :current="curPage"
              :total="examList.total"
              :limit="limit"
              @pageChange="handlePageChange"
          ></Pager>
        </div>

      </div>
      <div class="col score">
        <div class="title">我的成绩</div>
        <div
            v-if="score"
            class="content">
          <div class="score-row">
            <div class="score-title">考试名称</div>
            <div class="score">{{ score.name }}</div>
          </div>
          <div class="score-row">
            <div class="score-title">选择题</div>
            <div class="score">{{ score.objective }}</div>
          </div>
          <div class="score-row">
            <div class="score-title">简答题</div>
            <div class="score">{{ score.subjective }}</div>
          </div>
          <div class="score-row">
            <div class="score-title">是否通过</div>
            <div class="score">{{ score.pass }}</div>
          </div>
        </div>
        <div v-else class="empty">
          <Empty message="暂时无成绩"></Empty>
        </div>
      </div>
    </div>
    <Exam @ExamDone="handleExamDone" :exam-paper-id="examPaperId" v-if="isTest"></Exam>
  </div>
</template>

<script>
import {getExamList} from '@/api/examList'
import Pager from '@/components/Pager'
import SearchBox from '@/components/SearchBox'
import {utcToLocal} from '@/utils/date'
import Empty from '@/components/Empty'
import {getResult} from '@/api/aResult'
import Exam from '@/pages/User/Exam'
import ConfirmationBox from '@/utils/ConfirmationBox'
import moment from 'moment'
import {messageBox} from '@/utils'

export default {
  name: "MyTest",
  components: {
    Pager,
    SearchBox,
    Empty,
    Exam
  },
  data() {
    return {
      examList: null,
      curPage: 0,
      limit: 10,
      score: null,
      isTest: false,
      examPaperId: null
    }
  },
  computed: {
    doneExamList() {
      let list = [];
      if (this.examList) {
        this.examList.data.forEach(item => {
          if (item.status === 1) {
            list.push(item)
          }
        });
      }
      return list;
    },
    unDoneExamList() {
      let list = [];
      if (this.examList) {
        this.examList.data.forEach(item => {
          if (item.status === -1) {
            list.push(item)
          }
        });
      }
      return list;
    }
  },
  methods: {
    handleSearch(query) {
      console.log(query)
    },
    handleExamTime(exam) {
      let startTimeObj = utcToLocal(exam.startTime);
      let endTimeObj = utcToLocal(exam.endTime);
      let startDate = `${startTimeObj.datePart} ${startTimeObj.timePart}`
      let endDate = `${endTimeObj.datePart} ${endTimeObj.timePart}`
      return `${startDate}——${endDate}`
    },
    enterTest(exam) {
      console.log(exam)
      let startTime = exam.exam_paper.startTime;
      let endTime = exam.exam_paper.endTime;

      if (
          moment.utc(startTime).diff(moment(new Date()).utc()) > 0
      ) {
        //  考试未开始
        messageBox(
            "该考试未到开放时间",
            "warn"
        )
        return;
      }
      if (
          moment.utc(endTime).diff(moment(new Date()).utc()) < 0
      ) {
        //  考试已经过期
        messageBox(
            "考试截止日期已过",
            "warn"
        )
        return;
      }

      ConfirmationBox("点击确认进入该考试",
          () => {
            this.examPaperId = exam.examPaperId;
            this.isTest = true
          },
          () => {
            this.isTest = false;
          }
      )

    },
    viewScore(exam) {
      let result = {};

      result.name = exam.exam_paper.name;
      let paperId = exam.exam_paper.id;
      getResult(paperId).then(resp => {
        result.objective = resp.data.objective
        result.subjective = resp.data.subjective;
        result.total = resp.data.total;
        result.pass = resp.data.isPass ? "通过" : "未通过"
        this.score = result;
      })
    },
    async loadExamList(page, limit) {
      let resp = await getExamList(page, limit);
      this.examList = resp.data;
    },
    handlePageChange(newPage) {
      this.loadExamList(newPage, this.limit).then(() => {
        this.curPage = newPage;
      })
    },
    handleExamDone() {
      this.isTest = false;
      this.loadExamList(1, this.limit)
    }
  },
  created() {
    this.loadExamList(1, this.limit)
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/public.less";
@import "~@/styles/color.less";

.my-test-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 50px;

  .section {
    width: 100%;
    height: 610px;
    display: flex;
    justify-content: space-around;

    .col {
      height: 100%;
      background-color: #FFF;
      .boxShadow();
      box-sizing: border-box;

      .title {
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        padding-left: 20px;
        border-bottom: 2px solid lighten(@gray, 20%);
        color: lighten(@word, 20%);
      }
    }
  }

  .exam-list {
    width: 55%;

    .list-wrap {
      width: 100%;
      height: 450px;
      box-sizing: border-box;

      .row {
        display: flex;
        text-align: center;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid lighten(@gray, 10%);
        font-size: 13px;
        color: lighten(@word, 10%);

        button {
          border: none;
          outline: none;
          color: @link;
          background-color: transparent;
          cursor: pointer;
        }

      }

      .examinfo-row {
        transition: all 0.3s;

        &:hover {
          background-color: darken(#FFF, 6%);
        }
      }

      .thead {
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 16px;
        color: @word;
      }

      .list-col:nth-child(2) {
        width: 50%;
      }

      .list-col:nth-child(1),
      .list-col:nth-child(3) {
        width: 25%;
      }


    }

    .title {
      position: relative;
    }

    .search {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .empty {
    width: 100%;
    height: 450px;
  }

  .score {
    width: 40%;

    .content {
      width: 85%;
      height: 500px;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 50px;

      .score-row {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        border-bottom: 1px solid lighten(@gray, 10%);

        .score-title {
          width: 120px;
          text-align: center;
          color: #6D9FEE;
        }
      }
    }
  }


}
</style>
