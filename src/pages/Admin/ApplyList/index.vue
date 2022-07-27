<template>
  <div class="apply-list-container">
    <div class="main">
      <!--
        姓名，学历，年龄 岗位， 详情，
      -->
      <div class="head">
        求职申请
      </div>
      <div class="body">
        <div class="title">
          <div class="col">姓名</div>
          <div class="col">岗位</div>
          <div class="col">学历</div>
          <div class="col">电话</div>
          <div class="col opt">操作</div>
        </div>
        <div class="list" v-if="applyList">
          <div
              class="row"
              v-for="apply in applyList.data"
              :key="apply.id"
          >
            <div class="col">{{ apply.user ? apply.user.name : "用户异常" }}</div>
            <div class="col">{{ apply.recruitment_info ? apply.recruitment_info.content : "职位已取消" }}</div>
            <div class="col">{{ apply.user ? apply.user.qualifications : "用户异常" }}</div>
            <div class="col">{{ apply.user ? apply.user.tel : "用户异常" }}</div>
            <div class="col opt">
              <router-link
                  :to="{
                  name: 'ApplyDetail',
                  params: {
                    id: apply.id
                  }
                }"
              >详情
              </router-link>
            </div>
          </div>


        </div>
        <div v-else class="empty">
          <Empty message="无新的申请"></Empty>
        </div>

      </div>
      <div class="pager" v-if="applyList">
        <Pager
            :current="curPage"
            :limit="10"
            :total="applyList.total"
            @pageChange="handlePageChange"
        ></Pager>
      </div>
    </div>
  </div>
</template>

<script>
import {getNewApply} from '@/api/resume'
import Pager from '@/components/Pager'
import Empty from '@/components/Empty'

export default {
  name: "ApplyList",
  data() {
    return {
      applyList: null,
      curPage: 1,

    }
  },
  components: {
    Pager,
    Empty
  },
  methods: {
    async loadData(page = 1, limit = 10) {
      let resp = await getNewApply(page, limit);
      this.applyList = resp.data;
    },

    handlePageChange(newPage) {
      this.loadData(newPage).then(() => {
        this.curPage = newPage
      })
    }
  },
  async created() {
    await this.loadData()
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/public.less";
@import "~@/styles/color.less";

.apply-list-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
  overflow-x: hidden;
  overflow-y: auto;

  .main {
    width: 95%;
    margin: 0 auto;
    height: 100%;
    background-color: #FFF;
    .boxShadow();

    .head {
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      padding-left: 20px;
      border-bottom: 1px solid darken(#FFF, 10%);
    }

    .body {
      height: 500px;

      .title {
        width: 100%;
        display: flex;
        height: 36px;
        line-height: 36px;
        border: 1px solid darken(#FFF, 10%);
        color: @info;
        font-weight: bold;
      }

      text-align: center;

      .row {
        width: 100%;
        line-height: 36px;
        height: 36px;
        display: flex;
        border-bottom: 1px solid darken(#FFF, 10%);
      }

      .col {
        flex: 0 0 17%;
      }

      .opt {
        flex: 1 1 auto;
        color: #5E72E4;
        cursor: pointer;

        &:hover {
          color: lighten(#5E72E4, 10%);
        }
      }

      .empty {
        height: 370px;
      }
    }

  }
}
</style>
