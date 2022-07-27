<template>
  <div class="job-list-container">
    <div class="hot-job-list">

      <div
          class="hot-job-item"
          v-for="(hotItem, i) in hotJobList.data"
          :key="hotItem.id"
          :class="{
            [`hot${i + 1}`]: true
          }"
      >
        <div class="icon">
          <IconFont iconType="hot"></IconFont>
        </div>
        <div class="content">
          <div class="job-name">{{ hotItem.content }}</div>
          <div class="job-wages">￥{{ hotItem.wages }}</div>
        </div>
      </div>

    </div>
    <div class="recruit-info" v-if="jobData !== null">
      <div class="recruit-info-list">
        <div class="head">
          <div class="title">招聘岗位信息</div>
          <div class="job-search">
            <SearchBox @search="searchData"></SearchBox>
          </div>
        </div>
        <div class="recruit-in-table">
          <div class="thead">
            <div class="col">职位名称</div>
            <div class="col">招聘数量</div>
            <div class="col">薪资</div>
            <div class="col">发布日期</div>
          </div>
          <div class="tbody">
            <div
                v-show="jobList.length > 0"
                class="row"
                v-for="(job, i) in jobList"
                :key="job.id"
                :class="{
                  selected: job.selected,
                }"
                @click="viewJobDetail(job, i)"
            >
              <div class="col">{{ job.jobInfo.content }}</div>
              <div class="col">{{ job.jobInfo.count }}</div>
              <div class="col">{{ job.jobInfo.wages }}</div>
              <div class="col">{{ utcToLocal(job.jobInfo.createdAt).datePart }}</div>
            </div>
            <div v-show="jobList <= 0" class="empty">
              <Empty></Empty>
            </div>
            <div class="pager">
              <Pager
                  v-if="jobData !== null"
                  :total="jobData.total"
                  :current="curPage"
                  :limit="10"
                  @pageChange="pageChange"
              ></Pager>
            </div>
          </div>
        </div>
      </div>
      <div class="recruit-detail">
        <div class="title">{{ curViewJob ? curViewJob.jobInfo.content : '无数据' }}</div>
        <div class="content">
          <template v-if="curViewJob">
            <div
                class="content-item"
                v-for="(content, i) in curViewJob.jobInfo.details"
                :key="i"
            >
              {{ content }}
            </div>
          </template>
        </div>
        <div class="apply">
          <button :disabled="!curViewJob" @click="apply">{{ applying ? '正在申请' : '申请此职位' }}</button>
        </div>
      </div>
    </div>
    <ConfirmationBox
        :message="messagebox.msg"
        :level="messagebox.level"
        v-show="messagebox.isShow"
        @close="close"
        @determine="determine"
    ></ConfirmationBox>
  </div>
</template>

<script>
import {getJobList, getHotJobList} from '@/api/job'
import IconFont from '@/components/IconFont'
import SearchBox from '@/components/SearchBox'
import Pager from '@/components/Pager'
import {utcToLocal} from '@/utils/date'
import ConfirmationBox from '@/components/ConfirmationBox'
import {applyJob} from '@/api/resume'
import {messageBox} from '@/utils'
import Empty from '@/components/Empty'

export default {
  name: "JobList",
  data() {
    return {
      jobData: null,
      hotJobList: [],
      curPage: 1,
      curSelect: 0,
      curViewJob: null,
      jobDetail: null,
      messagebox: {
        msg: "212332",
        level: "warn",
        isShow: false
      },
      applying: false
    }
  },
  computed: {
    jobList() {
      let data = [];
      this.jobData.data.forEach(item => {
        if (typeof item.details === "string") {
          item.details = item.details.split("\n")
        }
        data.push({
          jobInfo: item,
          selected: false
        })
      });
      if (data.length > 0) {
        data[this.curSelect].selected = true;
      }
      this.curViewJob = data[this.curSelect];
      return data;
    }
  },
  components: {
    ConfirmationBox,
    IconFont,
    SearchBox,
    Pager,
    Empty
  },
  methods: {
    // * 加载数据
    async loadJobList(page = 1, limit = 10, q = "") {
      let resp = await getJobList(page, limit, q);
      this.curSelect = 0;
      this.curViewJob = null;
      this.jobData = resp.data;
    },

    async loadHotJob(q = "") {
      let resp = await getHotJobList("");
      if (resp) {
        this.hotJobList = resp.data
      }
    },

    viewJobDetail(job, index) {
      if (job === this.jobList[this.curSelect]) {
        return null;
      }
      this.jobList[this.curSelect].selected = false;
      job.selected = true;
      this.curSelect = index;
      this.curViewJob = job.jobInfo;
    },

    utcToLocal,

    searchData(val) {
      this.loadJobList(1, 10, val)
    },

    pageChange(newPage) {
      this.loadJobList(newPage).then(() => {
        this.curPage = newPage;
      })
    },

    apply() {
      if (this.$store.getters["user/integrity"]) {
        this.applying = true
        applyJob(
            this.$store.state.user.userData.id,
            this.curViewJob.jobInfo.id
        ).then(data => {
          if (data.code === 0) {
            messageBox(
                "申请成功",
                "success",
                "2000"
            )
          } else if (data.code === 406) {
            messageBox(
                "您当前未完成的申请，无法再次申请",
                "warn",
                2200
            )
          } else {
            let msg = data.msg;
            messageBox(
                msg,
                "error",
                "2000"
            )
          }
          this.applying = false;
        })
      } else {
        this.messagebox.isShow = true;
        this.messagebox.msg = "请到个人中心将个人信息补充完整"
      }
    },
    close() {
      this.messagebox.isShow = false;
    },
    determine() {
      this.$router.push({
        name: "PersonalCenter"
      })
    }
  },
  async created() {
    await this.loadHotJob("")
    await this.loadJobList(1, 10, "");
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
@import "~@/styles/public.less";

.job-list-container {
  width: 100%;
  height: 100%;

  .empty {
    width: 100%;
    height: 500px;
  }

  .hot-job-list {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .hot-job-item {
      width: 260px;
      height: 100px;
      background-color: rosybrown;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      color: @white;

      .icon {
        flex: 0 0 auto;
        width: 60px;
        line-height: 70px;
        text-align: center;
        font-size: 45px;
      }

      .content {
        flex: 1 1 auto;
        box-sizing: border-box;
        padding-top: 12px;

        .job-name {
          font-size: 14px;
          color: darken(@white, 10%);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .job-wages {
          font-size: 18px;
          font-weight: bold;
        }
      }

      &.hot1 {
        background-color: #2DCE89;
      }

      &.hot2 {
        background-color: #5E72E4;
      }

      &.hot3 {
        background-color: #F5365C;
      }

      &.hot4 {
        background-color: #11CDEF;
      }

    }
  }

  .recruit-info {
    width: 100%;
    padding: 20px;
    justify-content: space-around;
    display: flex;
    position: relative;

    .recruit-detail {
      width: 35%;
      height: 600px;
      background-color: #FFF;
      border-radius: 10px;
      .boxShadow();

      .title {
        height: 50px;
        line-height: 50px;
        color: lighten(@word, 10%);
        font-size: 24px;
        text-align: center;
        border-bottom: 1px solid lighten(@gray, 10%);
      }

      .content {
        height: 450px;
        white-space: pre-wrap;
        box-sizing: border-box;
        padding: 10px;
        overflow-y: auto;

        .content-item {
          font-size: 13px;
          line-height: 20px;
          margin-bottom: 10px;
        }
      }

      .apply {
        height: 50px;
        line-height: 50px;
        text-align: center;

        button {
          width: 200px;
          height: 40px;
          outline: none;
          border: none;
          background-color: @info;
          cursor: pointer;
        }
      }

    }

    .recruit-info-list {
      width: 50%;
      background-color: @white;
      //height: 300px;
      border-radius: 10px;
      box-sizing: border-box;
      .boxShadow();

      .head {
        display: flex;
        width: 100%;
        border-bottom: 2px solid lighten(@gray, 10%);
        box-sizing: border-box;

        .title {
          flex: 0 0 auto;
          width: 110px;
          line-height: 50px;
          height: 50px;
          text-align: center;
          font-size: 14px;
          color: lighten(@word, 10%);
        }

        .job-search {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .recruit-in-table {
        width: 100%;

        .thead {
          width: 100%;
          display: flex;
          height: 34px;
          line-height: 34px;
          font-size: 14px;
          border-bottom: 1px solid lighten(@gray, 10%);
        }

        .col {
          flex: 1 1 25%;
          text-align: center;
        }

        .tbody {
          .row {
            height: 34px;
            line-height: 34px;
            border-bottom: 1px solid lighten(@gray, 10%);
            display: flex;
            transition: all 0.3s;

            &:hover {
              background-color: lighten(@info, 10%);
            }

            &.selected {
              background-color: lighten(@info, 10%);
            }
          }
        }

        .pager {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          margin-top: 50px;
        }
      }

    }
  }
}
</style>
