<template>
  <div class="apply-detail-container">
    <div v-if="applyData" class="user-detail">
      <div class="user-detail-left">
        <UserDetail :userData="applyData.user"></UserDetail>
      </div>
      <div class="user-detail-right">
        <div class="nav">
          <a
              @click="style.showPassCtrl = true"
              :class="{
                active: style.showPassCtrl
              }"
          >通过</a>
          <a
              @click="style.showPassCtrl = false"
              :class="{
                active: !style.showPassCtrl
              }"
          >拒绝</a>
        </div>
        <div class="ctrl">
          <div
              v-if="style.showPassCtrl && examPaperList"
              class="pass"
          >
            <div class="search">
              <SearchBox @search="handleSearch" placeholder="请输入考试名称"></SearchBox>
            </div>
            <div class="exam">
              <div class="test-list">
                <div class="thead row">
                  <div class="col">考试</div>
                  <div class=" col opt">操作</div>
                </div>
                <div class="tbody">
                  <div
                      class="row"
                      v-for="exam in examPaperList.data"
                      :key="exam.id"
                  >
                    <div class="col">{{ exam.name }}</div>
                    <div class=" col opt"><a @click="curSelectPaper = exam">选择</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pager">
              <Pager
                  :current="curPage"
                  :total="examPaperList.total"
                  @pageChange="handlePageChange"
              ></Pager>
            </div>
            <div class="ctrl-btns">
              <div class="head">当前选择的考试：{{ curSelectPaper ? curSelectPaper.name : "" }}</div>
              <button @click="handlePass">通过</button>
            </div>

          </div>

          <div
              v-else
              class="reject"
          >
            <div class="text">
              <textarea v-model="reason"></textarea>
            </div>
            <div class="btn">
              <button @click="rejectApply">提交</button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-if="applyData" class="apply-detail">
      <div class="job-info">
        <div class="item">
          <div class="title">申请的职位 :</div>
          <div class="data">{{ applyData.recruitment_info.content }}</div>
        </div>
        <div class="item">
          <a class="view-resume" @click="style.showPdf = !style.showPdf">查看简历</a>
        </div>
      </div>
    </div>
    <div v-if="style.showPdf" class="pdf">
      <PDFViewer
          :source="applyData.path"
          style="height: 750px"
      ></PDFViewer>
    </div>
  </div>
</template>

<script>
import {getApplyById, passApply, reject} from '@/api/resume'
import UserDetail from '@/pages/Admin/components/UserDetail'
import PDFViewer from 'pdf-viewer-vue/dist/vue2-pdf-viewer'
import SearchBox from '@/components/SearchBox'
import Pager from '@/components/Pager'
import {getExamPapers} from '@/api/examPaper'
import {messageBox} from '@/utils'

export default {
  name: "ApplyDetail",
  data() {
    return {
      applyData: null,
      examPaperList: null,
      curPage: 1,
      curSelectPaper: null,
      reason: "",
      style: {
        showPdf: false,
        showPassCtrl: true
      }
    }
  },
  components: {
    UserDetail,
    PDFViewer,
    SearchBox,
    Pager
  },
  methods: {
    async loadData() {
      let id = this.$route.params.id;
      if (!id) {
        return;
      }
      let resp = await getApplyById(id)
      this.applyData = resp.data;
    },

    async loadExamPaper(page = 1, limit = 10, q = "") {
      let resp = await getExamPapers(page, limit, q);
      this.examPaperList = resp.data;
    },

    handlePageChange(newPage) {
      this.loadExamPaper(newPage).then(() => {
        this.curPage = newPage
      })
    },

    handleSearch(inpVal) {
      this.loadExamPaper(1, 10, inpVal).then(() => {
        this.curPage = 1
      })
    },
    async handlePass() {
      let userId = this.applyData.userId;
      let examId = this.curSelectPaper.id;
      let resumeId = this.applyData.id;
      let resp = await passApply(userId, examId, resumeId);
      if (resp.code === 0) {
        messageBox(
            "已通过",
            "success"
        )
        await this.$router.push({
          name: "ApplyList"
        })
      } else {
        messageBox(
            "提交失败",
            "error"
        )
      }
    },

    async rejectApply() {
      let resumeId = this.applyData.id;
      let res = await reject(resumeId, this.reason);
      console.log(res)
      if (res.code === 0) {
        messageBox(
            "操作成功",
            "success",
            1200,
            undefined,
            () => {
              this.$router.push({
                name: "ApplyList"
              }).catch(r => {
              })
            }
        )
      } else {
        messageBox(
            "操作失败",
            "error",
            1200,
            undefined,
            () => {

            }
        )
      }
    }

  },
  async created() {
    await this.loadData();
    await this.loadExamPaper()
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.apply-detail-container {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;

  .user-detail {
    display: flex;
    background-color: #FFF;

    .user-detail-left {
      width: 60%;
    }

    .user-detail-right {
      width: 40%;
      box-sizing: border-box;
      padding: 30px;
      background-color: #FFF;
      border: 1px solid darken(#FFF, 10%);
      height: 700px;

      .nav {
        height: 40px;
        border-bottom: 1px solid darken(#FFF, 10%);

        a {
          color: @info;
          margin: 0 30px;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            color: darken(@info, 10%);
          }

          &.active {
            color: @warn;
          }
        }
      }

      .ctrl {
        width: 100%;
        //height: 400px;
        .pass,
        .reject {
          width: 100%;
          height: 100%;
        }

        .reject {
          .text {
            height: 350px;

            textarea {
              width: 100%;
              height: 100%;
              resize: none;
              box-sizing: border-box;
              padding: 10px;
              font-size: 18px;
            }
          }

          button {
            width: 80px;
            height: 36px;
            outline: none;
            border: none;
            background-color: @adminRed;
            color: #FFF;
            cursor: pointer;
          }
        }

        .pass {
          .search {
            display: flex;
            width: 100%;
            justify-content: center;
          }

          .exam {
            width: 100%;
            height: 400px;

            .test-list {
              width: 330px;
              height: 100%;
              margin: 0 auto;

              .row {
                display: flex;
                height: 35px;
                line-height: 35px;
                border-bottom: 1px solid darken(#FFF, 10%);
              }

              .thead {
                color: @info;
                font-weight: bold;
              }

              .col {
                width: 50%;
                text-align: center;
              }

              .opt a {
                color: @info;
                cursor: pointer;
              }

            }
          }

          .ctrl-btns {
            margin-top: 30px;

            button {
              width: 80px;
              height: 36px;
              border: none;
              outline: none;
              background-color: @adminRed;
              color: #FFF;
              cursor: pointer;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }

  .apply-detail {
    width: 100%;
    height: 320px;
    background-color: #FFF;
    border-top: 1px solid darken(#FFF, 10%);
    box-sizing: border-box;
    padding: 30px;

    .item {
      margin-bottom: 20px;
    }

    .view-resume {
      color: @info;
      cursor: pointer;
    }

    .job-info {
      .item {
        display: flex;

        .title {
          color: @info;
          font-weight: bold;
          margin-right: 15px;
        }

        .data {
          text-decoration: underline;
        }
      }
    }

    .pdf {
      width: 100%;

    }
  }
}
</style>
