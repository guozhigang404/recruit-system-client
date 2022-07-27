<template>
  <div class="test-admin-container">
    <div class="nav">
      <a
          @click="style.showNumber = 1"
          :class="{
          active: style.showNumber === 1
        }"
      >考试列表</a>
      <a
          @click="style.showNumber = 2"
          :class="{
          active: style.showNumber === 2
        }"
      >新建考试</a>
    </div>
    <div class="container">
      <div v-if="style.showNumber === 1" class="test-list">
        <TestList></TestList>
      </div>
      <div v-if="style.showNumber === 2" class="add-test">
        <AddTest></AddTest>
      </div>
    </div>
  </div>
</template>

<script>
import AddTest from '@/pages/Admin/ExamStytem/TestAdmin/AddTest'
import TestList from '@/pages/Admin/ExamStytem/TestAdmin/TestList'

export default {
  name: "TestAdmin",
  components: {
    AddTest,
    TestList
  },
  data() {
    return {
      style: {
        showNumber: 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.test-admin-container {
  width: 100%;
  height: 100%;

  .nav {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid darken(#FFF, 10%);
    box-sizing: border-box;

    a {
      font-size: 18px;
      color: #5E72E4;
      margin: 0 15px;
      cursor: pointer;

      &.active {
        text-decoration: underline;
        color: #DA2A4D;
      }
    }
  }

  background-color: #FFF;

  .container {
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
