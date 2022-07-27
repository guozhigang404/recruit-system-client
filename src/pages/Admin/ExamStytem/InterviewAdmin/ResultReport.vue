<template>
  <div class="result-report">
    <div class="result-container">
      <div class="thead">
        <div class="col">姓名</div>
        <div class="col">手机号</div>
        <div class="col">选择题成绩</div>
        <div class="col">简答题成绩</div>
        <div class="col">总成绩</div>
      </div>
      <div v-if="resultList" class="list">
        <div
            class="row"
            v-for="item in resultList.data"
            :key="item.id"
        >
          <div class="col">{{ item.user.name }}</div>
          <div class="col">{{ item.user.tel }}</div>
          <div class="col">{{ item.objective }}</div>
          <div class="col">{{ item.subjective }}</div>
          <div class="col">{{ item.total }}</div>
        </div>
      </div>
      <div v-if="!resultList || resultList.total === 0" class="empty">
        <Empty></Empty>
      </div>
      <div v-if="resultList && resultList.total > 0" class="pager">
        <Pager
            :current="curPage"
            :limit="10"
            :total="resultList.total"
            @pageChange="handlePageChange"
        ></Pager>
      </div>
      <div v-if="resultList && resultList.total > 0" class="btn">
        <a @click="importFile"> {{loading ? "正在导出文件..." : "导出文件"}} </a> <a v-if="fileUrl" :href="fileUrl">下载文件</a>
      </div>
    </div>
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import {createResultsExcel, getStatisticsResultsByTestId} from "@/api/aResult";
import {messageBox} from "@/utils";

export default {
  name: "ResultReport",
  data() {
    return {
      resultList: null,
      curPage: 1,
      loading: false,
      fileUrl: null
    }
  },
  components: {
    Pager,
    Empty
  },
  methods: {
    async loadResultList(page = 1, limit = 10) {
      let id = this.$route.params.id;
      console.log(id)
      let res = await getStatisticsResultsByTestId(id, page, limit);
      this.resultList = res.data;
    },

    async handlePageChange(newPage) {
      await this.loadResultList(newPage)
      this.curPage = newPage
    },
    async importFile() {
      let id = this.$route.params.id;
      this.loading = true;
      let res = await createResultsExcel(id);
      if (res.code === 0) {
        messageBox(
            "已生成文件，请点击下载按钮",
            "success"
        );
        this.fileUrl = res.data;
      } else {
        messageBox(
            "文件生成失败",
            "warn"
        )
        this.fileUrl = null;
      }
      this.loading = false;
    }
  },
  async created() {
    await this.loadResultList();
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.result-report {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 20px;

  .result-container {
    width: 80%;
    height: 650px;
    //background-color: gray;
    margin: 0 auto;

    .thead {
      display: flex;
      height: 38px;
      line-height: 38px;
      font-size: 18px;
      font-weight: bold;
      color: @info;
      border-bottom: 1px solid darken(#fff, 10%);
    }

    .row {
      display: flex;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: @word;
      border-bottom: 1px solid darken(#fff, 7%);
    }

    .col {
      flex: 1 1 20%;
      text-align: center;
    }

    .empty {
      height: 300px;
    }

    .list {
      min-height: 300px;
    }

    .btn {
      height: 40px;
      line-height: 40px;

      a {
        color: #5E72E4;
        cursor: pointer;
      }
    }
  }
}
</style>