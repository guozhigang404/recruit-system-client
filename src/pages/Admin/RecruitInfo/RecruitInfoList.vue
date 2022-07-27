<template>
  <div class="recruit-info-container">
    <div class="job-table">
      <div class="search">
        <SearchBox @search="handleSearch" placeholder="输入职位名称"></SearchBox>
      </div>
      <div class="table-body">
        <div class="head">
          <div class="col job">职位</div>
          <div class="col count">招聘数量</div>
          <div class="col wages">预计薪资</div>
          <div class="col publish-time">发布时间</div>
          <div class="col opt">操作</div>
        </div>
        <div v-if="jobList" class="list">
          <div
              class="row"
              v-for="job in jobList.data"
              :key="job.id"
          >
            <div class="col job">{{ job.content }}</div>
            <div class="col count">{{ job.count }}</div>
            <div class="col wages">{{ job.wages }}</div>
            <div class="col publish-time">{{ formatTime(job.createdAt) }}</div>
            <div class="col opt">
              <router-link
                  :to="{
                    name: 'EditJob',
                    params: {
                      id: job.id
                    }
                  }"
                  class="modify">修改
              </router-link>

              <router-link
                  :to="{
                    name: 'JobDetail',
                    params: {
                      id: job.id
                    }
                 }"
                  class="detail"
              >详情
              </router-link>
              <a
                  class="del"
                  @click="deleteJob(job.id)"
              >删除</a>
            </div>
          </div>
        </div>
        <div v-show="jobList === null || jobList.total === 0" class="empty">
          <Empty message="无结果"></Empty>
        </div>
        <div v-if="jobList" class="pager">
          <Pager
              :total="jobList.total"
              :limit="10"
              :current="curPage"
              @pageChange="handlePageChange"
          ></Pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteJobById, getJobList} from '@/api/job'
import SearchBox from '@/components/SearchBox'
import Pager from '@/components/Pager'
import Empty from '@/components/Empty'
import {utcToLocal} from '@/utils/date'
import {messageBox} from '@/utils'
import ConfirmationBox from '@/utils/ConfirmationBox'

export default {
  name: "RecruitInfoList",
  data() {
    return {
      jobList: null,
      curPage: 1
    }
  },
  components: {
    SearchBox,
    Pager,
    Empty
  },
  methods: {
    async loadJobList(page = 1, limit = 10, q = "") {
      let resp = await getJobList(page, limit, q);
      this.jobList = resp.data;
    },
    formatTime(date) {
      let dateObj = utcToLocal(date);
      return dateObj.datePart;
    },
    async handlePageChange(newPage) {
      await this.loadJobList(newPage);
      this.curPage = newPage;
    },
    async handleSearch(val) {
      await this.loadJobList(1, 10, val);
      this.curPage = 1;
    },

    async deleteJob(jobId) {
      ConfirmationBox(
          "请确定是否执行删除操作",
          async () => {
            let resp = await deleteJobById(jobId);
            if (resp.data > 0) {
              messageBox(
                  "删除成功",
                  "success",
                  1500
              );
              await this.loadJobList()
              this.curPage = 1
            } else {
              messageBox(
                  "该职位已被使用，无法删除",
                  "warn",
                  1500
              );
            }
          }
      )

    }
  },
  // * 生命周期函数
  async created() {
    await this.loadJobList();
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.recruit-info-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;

  .job-table {
    width: 90%;
    margin: 0 auto;
    background-color: #FFF;

    .search {
      display: flex;
      justify-content: center;
      padding: 10px;
    }

    .table-body {
      width: 100%;
      height: 500px;

      .head {
        height: 50px;
        line-height: 50px;
        display: flex;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid darken(#FFF, 10%);
        color: @info;
        box-sizing: border-box;
      }

      .col {
        flex: 1 1 20%;
        text-align: center;
      }

      .opt {
        a {
          margin: 0 8px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .modify {
          color: @warn;

          &:hover {
            color: darken(@warn, 20%);
          }
        }

        .detail {
          color: @adminGreen;

          &:hover {
            color: darken(@adminGreen, 20%);
          }
        }

        .del {
          color: @adminRed;

          &:hover {
            color: darken(@adminRed, 20%);
          }
        }

      }

      .empty {
        height: 360px;
      }

      .list {
        .row {
          display: flex;
          height: 36px;
          line-height: 36px;
          border-bottom: 1px solid darken(#FFF, 10%);
          box-sizing: border-box;
          font-size: 14px;
        }
      }

      .pager {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }


  }
}
</style>
