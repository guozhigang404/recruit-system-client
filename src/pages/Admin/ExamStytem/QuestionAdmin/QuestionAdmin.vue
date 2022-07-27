<template>
  <div class="question-admin-container">
    <div class="nav">
      <a
          @click="style.showNumber = 1"
          :class="{
            active: style.showNumber === 1
          }"
      >选择题</a>
      <a
          @click="style.showNumber = 2"
          :class="{
            active: style.showNumber === 2
          }"
      >简答题</a>
      <a
          @click="style.showNumber = 3"
          :class="{
            active: style.showNumber === 3
          }"
      >添加选择题</a>
      <a
          @click="style.showNumber = 4"
          :class="{
            active: style.showNumber === 4
          }"
      >添加简答题</a>

    </div>
    <div class="container">
      <div
          class="objective"
          v-if="style.showNumber === 1"
      >
        <ObjectiveList></ObjectiveList>
      </div>
      <div
          class="subjective"
          v-if="style.showNumber === 2"
      >
        <SubjectiveList></SubjectiveList>
      </div>
      <div
          class="add-question"
          v-if="style.showNumber === 3"
      >
        <AddObjQuestion></AddObjQuestion>
      </div>
      <div
          class="add-question"
          v-if="style.showNumber === 4"
      >
        <AddSubQuestion></AddSubQuestion>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectiveList from '@/pages/Admin/ExamStytem/QuestionAdmin/ObjectiveList'
import SubjectiveList from '@/pages/Admin/ExamStytem/QuestionAdmin/SubjectiveList'
import AddObjQuestion from '@/pages/Admin/ExamStytem/QuestionAdmin/AddObjQuestion'
import AddSubQuestion from '@/pages/Admin/ExamStytem/QuestionAdmin/AddSubQuestion'

export default {
  name: "QuestionAdmin",
  data() {
    return {
      style: {
        showNumber: 1
      }
    }
  },
  components: {
    ObjectiveList,
    SubjectiveList,
    AddObjQuestion,
    AddSubQuestion
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.question-admin-container {
  width: 100%;
  height: 100%;
  background-color: #FFF;
  box-sizing: border-box;
  padding: 0 15px 15px;

  .nav {
    height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid darken(#FFF, 10%);

    a {
      line-height: 40px;
      margin: 0 15px;
      color: @info;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;

      &.active {
        color: @adminRed;
        text-decoration: underline;
      }
    }
  }

  .container {
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
  }
}
</style>
