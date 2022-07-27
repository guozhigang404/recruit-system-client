<template>
  <div class="test-list-container">
    <div class="search">
      <SearchBox @search="search" placeholder="请输入考试名称"></SearchBox>
    </div>
    <div class="test-list">
      <div class="head">
        <div class="col name">
          考试名称
        </div>
        <div class="col time">
          起止日期
        </div>
        <div class="col detail">
          查看详情
        </div>
      </div>
      <div v-if="testList" class="list">
        <div
            class="row"
            v-for="test in testList.data"
            :key="test.id"
        >
          <div class="col name">
            {{ test.name }}
          </div>
          <div class="col time">
            {{ formatTime(test.startTime, test.endTime) }}
          </div>
          <div class="col detail">
            <a @click="viewDetail(test.id)">详情</a>
          </div>
        </div>
      </div>
      <div v-show="testList === null || testList.total === 0" class="empty">
        <Empty></Empty>
      </div>
      <div v-if="testList" class="pager">
        <Pager
            :current="curPage"
            :limit="10"
            :total="testList.total"
            @pageChange="pageChange"
        ></Pager>
      </div>
    </div>
    <div v-if="curSelectTest" class="test-detail">
      <div class="detail-title">
        试卷详情
      </div>
      <div class="objective">
        <div class="obj-title">选择题</div>
        <div
            v-for="sel in curSelectTest.objective"
            :key="sel.id"
            class="obj-item">
          <div class="item label">
            <span>标签：</span> {{ sel.label }}
          </div>
          <div class="item content">
            <span>内容：</span> {{ sel.content }}
          </div>
          <div class="item sel">
            <span>选项：</span>
            <p>A: {{ sel.a }}</p>
            <p>B: {{ sel.b }}</p>
            <p>C: {{ sel.c }}</p>
            <p>D: {{ sel.d }}</p>
          </div>
          <div class="item answer">
            <span>答案：</span> {{ JSON.parse(sel.answer)[0] }}
          </div>
        </div>
      </div>
      <div class="subjective">
        <div class="sub-title">
          简答题
        </div>
        <div
            v-for="sub in curSelectTest.subjective"
            :key="sub.id"
            class="sub-item">
          <div class="item label">
            <span>标签：</span> {{ sub.label }}
          </div>
          <div class="item content">
            <span>内容：</span> {{ sub.content }}
          </div>
          <div class="item answer">
            <span>答案</span> {{ sub.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import {getExamPaperQuestionsAdmin, getExamPapers} from '@/api/examPaper'
import {utcToLocal} from '@/utils/date'
import Empty from '@/components/Empty'
import Pager from '@/components/Pager'

export default {
  name: "TestList",
  components: {
    Pager,
    SearchBox,
    Empty
  },
  data() {
    return {
      testList: null,
      curPage: 1,
      curSelectTest: null
    }
  },
  methods: {
    async loadTestList(page = 1, limit = 10, q = "") {
      let res = await getExamPapers(page, limit, q);
      this.testList = res.data;

    },
    formatTime(startTime, endTime) {
      // utc 时间 ----> 用户本地时间
      let start = utcToLocal(startTime);
      let end = utcToLocal(endTime);
      return `${start.datePart} ${start.timePart} - ${end.datePart} ${end.timePart}`
    },
    async search(val) {
      await this.loadTestList(1, 10, val);
      this.curPage = 1;
    },
    async pageChange(newPage) {
      await this.loadTestList(newPage)
      this.curPage = newPage
    },
    async viewDetail(id) {
      let res = await getExamPaperQuestionsAdmin(id);
      this.curSelectTest = res.data;
    }
  },
  async created() {
    await this.loadTestList();
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
.test-list-container {
  width: 100%;
  .search {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid darken(#FFF, 10%);
  }

  .empty {
    height: 400px;
  }

  .test-list {
    box-sizing: border-box;
    padding: 15px;

    .head {
      display: flex;
      text-align: center;
      line-height: 38px;
      font-weight: bold;
      color: #6D9FEE;
      box-sizing: border-box;
      border-bottom: 1px solid darken(#FFF, 10%);
    }

    .row {
      display: flex;
      border-bottom: 1px solid darken(#FFF, 10%);
    }

    .col {
      text-align: center;
      line-height: 36px;

      &.name {
        width: 20%;
      }

      &.time {
        width: 50%;
        font-size: 14px;
      }

      &.detail {
        width: 20%;

        a {
          color: #5E72E4;
          cursor: pointer;
        }
      }

    }
  }

  .test-detail {
    min-height: 500px;
    width: 90%;
    margin: 0 auto;

    .detail-title {
      margin-bottom: 20px;
      color: #5E72E4;
    }

    .obj-item {
      margin-bottom: 30px;
      border: 1px solid darken(#FFF, 10%);
      box-sizing: border-box;
      padding: 15px;

      span {
        color: #5E72E4;
      }
    }

    .sub-item {
      margin-bottom: 20px;
      border: 1px solid darken(#FFF, 10%);
      box-sizing: border-box;
      padding: 15px;

      span {
        color: #6D9FEE;
      }
    }

    .obj-title,
    .sub-title {
      color: #6D9FEE;
    }

    .item {
      margin-bottom: 15px;
    }
  }
}
</style>
