<template>
  <div class="test-result-admin-container">
    <div class="search">
      <SearchBox @search="handleSearch"></SearchBox>
    </div>
    <div class="test-paper-list">
      <div class="head">
        <div class="col name">
          考试名称
        </div>
        <div class="col time">
          起止日期
        </div>
        <div class="col detail">
          审核
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
            <router-link
                :to="{
                name: 'Grade',
                params: {
                  id: test.id
                },
                query: {
                  examName: test.name
                }
              }"
            >审核
            </router-link>


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
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import Empty from '@/components/Empty'
import Pager from '@/components/Pager'
import {utcToLocal} from '@/utils/date'
import {getExamPapers} from '@/api/examPaper'

export default {
  name: "TestResultAdmin",
  data() {
    return {
      testList: null,
      curPage: 1
    }
  },
  components: {
    SearchBox,
    Empty,
    Pager
  },
  methods: {
    async loadTestList(page = 1, limit = 10, q = "") {
      let res = await getExamPapers(page, limit, q);
      this.testList = res.data;

    },

    formatTime(startTime, endTime) {
      let start = utcToLocal(startTime);
      let end = utcToLocal(endTime);
      return `${start.datePart} ${start.timePart} - ${end.datePart} ${end.timePart}`
    },

    async handleSearch(val) {
      await this.loadTestList(1, 10, val);
      this.curPage = 1;
    },

    async pageChange(newPage) {
      await this.loadTestList(newPage)
      this.curPage = newPage
    },


  },
  async created() {
    await this.loadTestList();
  }
}
</script>

<style lang="less" scoped>
.test-result-admin-container {
  width: 100%;
  height: 100%;
  background-color: #FFF;

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

  .test-paper-list {
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
}
</style>
