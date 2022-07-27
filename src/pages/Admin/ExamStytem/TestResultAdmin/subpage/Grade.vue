<template>
  <div class="grade-container">
    <div class="grade-left">
      <div class="test-name">
        <span class="test-name-tlt">考试名称：</span> {{ $route.query.examName }}
      </div>
      <div v-if="resultList" class="result-list">
        <!--
          姓名，手机号， 评分
        -->
        <div class="result-head">
          <div class="col name">姓名</div>
          <div class="col tel">手机号</div>
          <div class="col grade">评分操作</div>
        </div>
        <div
            class="row"
            v-for="result in resultList.data"
            :key="result.id"
        >
          <div class="col name">{{ result.user.name }}</div>
          <div class="col tel">{{ result.user.tel }}</div>
          <div class="col grade">
            <a
                @click="select(result)"
                :class="{
                  active: curSelectResult === result
                }"
            >选择</a>
          </div>
        </div>
      </div>
      <div v-if="resultList === null || resultList.total === 0" class="result-empty">
        <Empty></Empty>
      </div>
    </div>
    <div class="grade-right">
      <div v-if="curSelectResult" class="user">
        <div class="item">
          <div class="label">姓名:</div>
          <div class="data">{{ curSelectResult.user.name }}</div>
        </div>
        <div class="item">
          <div class="label">手机号:</div>
          <div class="data">{{ curSelectResult.user.tel }}</div>
        </div>
        <div class="item">
          <div class="label">选择题成绩:</div>
          <div class="data">{{ curSelectResult.objective }}</div>
        </div>
      </div>
      <div v-if="curSelectResult" class="content">
        <div class="answer-item">
          <div class="title">考生答案:</div>
          <div class="answer">
            {{ curSelectResult.answer.subAnswer[curAnswerIndex].answer }}
          </div>
        </div>
        <div class="answer-item">
          <div class="title"><a @click="showAnswer = !showAnswer">{{ showAnswer ? "隐藏参考答案" : "显示参考答案" }}</a></div>
          <div v-show="showAnswer" class="answer">
            {{ subQuestions[curAnswerIndex].answer }}
          </div>
        </div>
      </div>
      <div v-if="curSelectResult" class="submit-ctrl">
        <div class="input-ctrl">
          <div class="score">
            分数：<input type="text" v-model.trim.number="curInputScore">
          </div>
          <div class="next">
            <a @click="nextQuestion">{{ curAnswerIndex === subQuestions.length - 1 ? "确定" : "下一题" }}</a>
          </div>
          <div class="number">
            {{ this.totalScore }}
          </div>
        </div>
        <div class="submit">
          <button @click="submitScore">提交成绩</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUndoneResultByExamId, submitGrade} from '@/api/aResult'
import Empty from '@/components/Empty'
import {getExamPaperQuestions, getExamPaperQuestionsAdmin} from '@/api/examPaper'
import {messageBox} from '@/utils'

export default {
  name: "Grade",
  data() {
    return {
      resultList: null,
      curPage: 1,
      curSelectResult: null,
      subQuestions: null,
      totalScore: 0,
      curInputScore: null,
      curAnswerIndex: 0,
      showAnswer: true,
      lastClick: false
    }
  },
  components: {
    Empty
  },
  methods: {
    async loadResultList(page = 1, limit = 10) {
      let examId = this.$route.params.id
      let res = await getUndoneResultByExamId(examId, page, limit);
      this.resultList = res.data; // 考生提交的答案
      this.resultList.data.forEach(item => {
        item.answer = JSON.parse(item.answer)
      })
    },
    async loadSubQuestion() {
      let res = await getExamPaperQuestionsAdmin(this.$route.params.id);
      this.subQuestions = res.data.subjective;
    },
    nextQuestion() {
      // * 1. 判断是不是最后一题
      if (this.curAnswerIndex === this.subQuestions.length - 1) {
        if (this.lastClick) {
          // * 不能重复点击
          return;
        }
        if (isNaN(this.curInputScore) || this.curInputScore === null) { // * 非法的数字
          messageBox(
              "请填写正确的数字",
              "error",
              1500
          )
          return;
        }
        this.totalScore += this.curInputScore;
        this.lastClick = true
        return;
      }

      // *  2. 不是最后一题
      if (isNaN(this.curInputScore) || this.curInputScore === null) { // * 非法的数字
        messageBox(
            "请填写正确的数字",
            "error",
            1500
        )
        return;
      }
      this.totalScore += this.curInputScore;
      this.curAnswerIndex++;
      this.curInputScore = null;
    },

    select(result) {
      this.curSelectResult = result;
    },
    async submitScore() {
      let id = this.curSelectResult.id;
      let subScore = this.totalScore;
      let total = subScore + this.curSelectResult.objective;
      let resp = await submitGrade(id, subScore, total);
      if (resp.code === 0) {
        messageBox(
            "提交成功",
            "success",
            1200
        );
        this.curSelectResult = null;
        this.totalScore = 0;
        this.curInputScore = null;
        this.curAnswerIndex = 0;
        this.lastClick = false
        await this.loadResultList();
      } else {
        messageBox(
            "提交失败",
            "warn",
            1200
        );
      }
    }
  },
  async created() {
    await this.loadResultList(1, 10);
    await this.loadSubQuestion()
  },
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.grade-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  display: flex;

  .grade-left {
    width: 30%;
    height: 600px;
    background: #fff;

    .test-name {
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      font-weight: bold;
      color: @word;
      border-bottom: 1px solid darken(#fff, 10%);

      .test-name-tlt {
        color: @info;
      }
    }

    .result-list {
      .result-head {
        height: 36px;
        line-height: 36px;
        display: flex;
        font-size: 16px;
        font-weight: bold;
        color: @info;
        border-bottom: 1px solid darken(#fff, 10%);
      }

      .col {
        text-align: center;

        &.name　 {
          flex: 0 0 25%;
        }

        &.tel {
          flex: 1 1 auto;
        }

        &.grade {
          flex: 0 0 25%;

          a {
            cursor: pointer;
            color: #5E72E4;

            &.active {
              color: @adminRed;
            }
          }
        }
      }

      .row {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        display: flex;
      }


    }

    .result-empty {
      height: 500px;
    }
  }

  .grade-right {
    width: 65%;
    background: #fff;
    margin-left: 4%;
    min-height: 700px;
    box-sizing: border-box;
    padding: 15px;

    .user {
      height: 40px;
      line-height: 40px;
      display: flex;
      border-bottom: 1px solid darken(#fff, 10%);

      .item {
        margin: 0 20px;
        display: flex;

        .label {
          font-size: 18px;
          font-weight: bold;
          color: @info;
          margin-right: 10px;
        }

        .data {
          font-size: 16px;
          color: @word;
        }


      }

    }

    .answer-item {
      .title {
        color: @info;
        height: 36px;
        line-height: 36px;

        a {
          cursor: pointer;
        }
      }

      .answer {
        margin: 15px 0;
        color: @word;
        box-sizing: border-box;
        padding: 0 15px;
        line-height: 24px;
      }
    }

    .submit-ctrl {
      height: 120px;
      background: darken(#fff, 4%);
      margin-top: 60px;

      .input-ctrl {
        height: 50px;
        line-height: 50px;
        display: flex;

        .score {
          margin-right: 100px;
        }

        .next {
          margin-right: 20px;

          a {
            font-size: 14px;
            color: @adminRed;
            cursor: pointer;
          }
        }
      }

      .submit {
        margin-top: 20px;

        button {
          width: 120px;
          height: 35px;
          background: @adminRed;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }

    }
  }

}
</style>
