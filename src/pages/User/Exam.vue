<template>
  <div class="exam-container" v-if="questionData">
    <div class="number">
      <span
          v-for="index in questionTotal"
          :key="index"
          :class="{
            active: index === curQuestionIndex,
            done: curQuestionIndex > index
          }"
          @click="changeQuestion(index)"
      >{{ index }}</span>
      <button v-show="showSubmit" @click="submitPaper">交卷</button>
    </div>
    <div class="content" v-if="questionList.length > 0">
      <div class="obj" v-show="curQuestionData.type === 1">
        <div class="question-content">{{ curQuestionData.content }}</div>
        <div class="items">
          <div class="select-item">
            <label><input type="radio" v-model="selectVal" value="a"><span>A: {{ curQuestionData.a }}</span></label>
          </div>
          <div class="select-item">
            <label><input type="radio" v-model="selectVal" value="b"><span>B: {{ curQuestionData.b }}</span></label>
          </div>
          <div class="select-item">
            <label><input type="radio" v-model="selectVal" value="c"><span>C: {{ curQuestionData.c }}</span></label>
          </div>
          <div class="select-item">
            <label><input type="radio" v-model="selectVal" value="d"><span>D: {{ curQuestionData.d }}</span></label>
          </div>
        </div>
      </div>
      <div class="sub" v-show="curQuestionData.type !== 1">
        <div class="sub-content">{{ curQuestionData.content }}</div>
        <div class="text-area">
          <textarea v-model="subVal">

          </textarea>
        </div>
      </div>
      <div class="btn">
        <button @click="determine">确认</button>
      </div>
    </div>

  </div>
</template>

<script>
import {getExamPaperQuestions, submitExamAnswer} from '@/api/examPaper'
import {messageBox} from '@/utils'
import moment from 'moment'

export default {
  name: "Exam",
  props: {
    examPaperId: {
      type: Number,
    }
  },
  data() {
    return {
      curQuestionIndex: 1,
      questionData: null,
      curQuestionData: null,
      selectVal: null,
      objAnswer: [],
      subAnswer: [],
      subVal: null,
      startTime: null,
      endTime: null,
      changeCount: 0
    }
  },
  computed: {
    questionTotal() {
      if (this.questionData) {
        return this.questionData.objective.length + this.questionData.subjective.length;
      }
      return 0
    },
    questionList() {
      let questionArr = [];
      if (this.questionData) {
        questionArr = questionArr.concat(this.questionData.objective, this.questionData.subjective)
        this.curQuestionData = questionArr[0];
      }
      return questionArr;
    },
    showSubmit() {
      return this.curQuestionIndex >= this.questionTotal;
    }
  },
  methods: {
    async loadQuestion(examPaperId) {
      let resp = await getExamPaperQuestions(examPaperId);
      this.questionData = resp.data;
    },

    submitPaper() {
      this.endTime = moment(new Date()).utc().format();
      let requestData = {
        answer: {
          objAnswer: this.objAnswer,
          subAnswer: this.subAnswer,
        },
        startTime: this.startTime,
        endTime: this.endTime
      };

      submitExamAnswer(this.examPaperId, requestData).then(r => {
        messageBox(
            "提交成功",
            "success",
            1200
        )
        this.$emit("ExamDone")
      }).catch(reason => {
        console.log(reason)
        messageBox(
            "提交失败",
            "warn",
            1500,
            null,
            () => {
              this.$router.push({
                name: "MyTest"
              }).catch(r => {
              })
            }
        )
      })
    },

    determine() {
      let type = this.curQuestionData.type;
      let questionId = this.curQuestionData.id;
      if (type === 1) {
        if (!this.selectVal) {
          messageBox(
              "请选择答案",
              "error",
              2500
          )
          return;
        }
        let item = null;
        this.objAnswer.forEach(val => {
          if (val.id === questionId) {
            item = val;
          }
        });
        if (item) {
          item.answer = this.selectVal
        } else {
          this.objAnswer.push({
            id: questionId,
            answer: this.selectVal
          })
        }
      } else {
        let item = null;
        this.subAnswer.forEach(val => {
          if (val.id === questionId) {
            item = val;
          }
        });
        if (item) {
          item.answer = this.subVal
        } else {
          this.subAnswer.push({
            id: questionId,
            answer: this.subVal
          })
        }
      }
      this.changeQuestion(this.curQuestionIndex + 1)
    },

    changeQuestion(index) {
      if (index > this.questionTotal) {
        messageBox(
            "你已经答完所有题",
            "success"
        )
        return;
      }
      this.curQuestionIndex = index;
      this.selectVal = null;
      this.subVal = null;
      this.curQuestionData = this.questionList[index - 1];

    },

    registerListening() {
      // 当前窗口失去焦点
      window.onblur = () => {
        this.changeCount++;
        if (this.changeCount >= 3) {
          // alert("交卷");
          this.endTime = moment(new Date()).utc().format();
          let objAns = this.questionData.objective.map(item => {
            return {
              id: item.id,
              answer: "e"
            }
          });
          let subAns = this.questionData.subjective.map(item => {
            return {
              id: item.id,
              answer: "违反考试规则-记零分"
            }
          });

          let requestData = {
            answer: {
              objAnswer: objAns,
              subAnswer: subAns,
            },
            startTime: this.startTime,
            endTime: this.endTime
          };
          submitExamAnswer(this.examPaperId, requestData).then(r => {
            messageBox(
                "您切屏次数超过三次，本次考试成绩作废",
                "warn",
                1200
            )
            this.$emit("ExamDone")
          }).catch(reason => {
            console.log(reason)
            messageBox(
                "提交失败",
                "warn",
                1500,
                null,
                () => {
                  this.$router.push({
                    name: "MyTest"
                  }).catch(r => {
                  })
                }
            )
          })
        } else {
          alert(`你已经切屏${this.changeCount}次，切屏 3 次成绩为零`)
        }
      }
    },
    destroyListening() {
      // window.localStorage.removeItem("change-count")
      window.onblur = null;
    }

  },
  created() {
    this.startTime = moment(new Date()).utc().format();
    this.loadQuestion(this.examPaperId);
  },
  mounted() {
    // 开始检测切屏
    this.registerListening();
  },
  destroyed() {
    // 取消事件
    this.destroyListening();
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.exam-container {
  display: flex;

  .number {
    flex: 0 0 auto;
    margin-left: 30px;
    width: 300px;
    height: 600px;
    border-radius: 10px;
    background-color: #FFF;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    position: relative;

    button {
      position: absolute;
      width: 100px;
      height: 40px;
      background-color: #6D9FEE;
      outline: none;
      border: none;
      bottom: 20px;
      left: 50px;
      cursor: pointer;
    }

    span {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: lighten(@gray, 10%);
      line-height: 30px;
      text-align: center;
      color: #FFF;
      margin: 20px;

      &.done {
        background-color: @adminGreen;
      }

      &.active {
        background-color: @adminRed;
      }
    }

  }

  .content {
    flex: 1 1 auto;
    margin: 0 30px;
    height: 600px;
    background-color: #FFF;
    position: relative;
  }

  .btn {
    position: absolute;
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;

    button {
      width: 80px;
      height: 40px;
      line-height: 40px;
      outline: none;
      border: none;
      color: #6D9FEE;
      background-color: @adminRed;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .obj {
    padding: 35px;
    box-sizing: border-box;

    .question-content {
      text-indent: 2em;
    }

    .items {
      margin-top: 30px;

      .select-item {
        color: #6D9FEE;
        height: 30px;
        line-height: 30px;
        width: 100%;

        input {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }

  .sub {
    padding: 35px;
    box-sizing: border-box;

    .sub-content {
      text-indent: 2em;
      margin-bottom: 50px;
    }

    .text-area {
      width: 100%;
      height: 120px;

      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        line-height: 24px;
        box-sizing: border-box;
        padding: 10px;
        outline: none;
        border: 1px solid #6D9FEE;
      }
    }
  }

}
</style>
