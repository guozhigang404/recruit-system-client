<template>
  <div class="result-list-container">
    <div class="result-list-left">
      <div class="title">{{ this.$route.query.examName }} 成绩列表</div>
      <div class="search">
        <SearchBox @search="handleSearch" placeholder="请输入手机号"></SearchBox>
      </div>
      <div class="head">
        <!--  姓名，手机号、总成绩，审核-->
        <div class="col name">姓名</div>
        <div class="col tel">手机号</div>
        <div class="col total">总成绩</div>
        <div class="col select">选择</div>
      </div>
      <div v-if="resultList" class="list">
        <div
            class="row"
            v-for="result in resultList.data"
            :key="result.id"
        >
          <div class="col name">{{ result.user.name }}</div>
          <div class="col tel">{{ result.user.tel }}</div>
          <div class="col total">{{ result.total }}</div>
          <div class="col select">
            <a
                :class="{
                    active: result === curSelectResult
                }"
                @click="handleSelect(result)"
            >选择</a>
          </div>
        </div>
      </div>
      <div v-if="resultList === null || resultList.total === 0" class="empty">
        <Empty message="没有找到此用户的成绩"></Empty>
      </div>
      <div v-if="resultList" class="pager">
        <Pager
            :current="curPage"
            :total="resultList.total"
            :limit="10"
            @changePage="handleChangePage"
        ></Pager>
      </div>
    </div>
    <div class="result-list-right">
      <div v-if="curSelectResult" class="user">
        <span>姓名：</span> <span>{{ curSelectResult.user.name }}</span>
      </div>

      <div v-if="curSelectResult" class="ctrl">
        <div class="nav">
          <a
              :class="{
              active: showNumber === 1
            }"
              @click="showNumber = 1"
          >通过</a>
          <a :class="{
              active: showNumber === 2
            }"
             @click="showNumber = 2"
          >未通过</a>
        </div>
        <div v-show="showNumber === 1" class="ctrl-item pass">
          <div class="item">
            <div class="pass-title">面试时间</div>
            <div class="pass-bd">
              <input type="datetime-local" v-model="passData.time">
            </div>
          </div>
          <div class="item">
            <div class="pass-title">面试地点</div>
            <div class="pass-bd">
              <input type="text" v-model="passData.address">
            </div>
          </div>
          <div class="btn">
            <a @click="handlePass">提交</a>
          </div>
        </div>
        <div v-show="showNumber === 2" class="ctrl-item no-pass">
          <div class="item">
            <textarea placeholder="请填写未通过的原因" v-model="reason"></textarea>
          </div>
          <div class="item">
            <button @click="handleReason">提交</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getResultByTelAndPaperId, getResultsByTestId} from '@/api/aResult'
import SearchBox from '@/components/SearchBox'
import Empty from '@/components/Empty'
import Pager from '@/components/Pager'
import {messageBox} from "@/utils";
import {addInterview, unPass} from "@/api/interview";

export default {
  name: "ResultList",
  components: {
    SearchBox,
    Pager,
    Empty
  },

  data() {
    return {
      resultList: null,
      curPage: 1,
      curSelectResult: null,
      remark: "",
      showNumber: 1,
      passData: {
        time: null,
        address: ""
      },
      reason: ""
    }
  },
  methods: {
    async loadResultList(page = 1, limit = 10) {
      let paperId = this.$route.params.paperId;
      let resp = await getResultsByTestId(paperId, page, limit);
      this.resultList = resp.data;
    },
    async handleSearch(val) {
      if (val) {
        // 如果 输入框输入了数据，调用接口，
        let paperId = this.$route.params.paperId;
        let res = await getResultByTelAndPaperId(paperId, val);
        this.resultList = res.data;
      } else {
        // 没有输入数据，重新加载列表
        await this.loadResultList();
        this.curPage = 1;
      }
    },
    async handleChangePage(newPage) {
      await this.loadResultList(newPage, 10);
      this.curPage = newPage;
    },
    async handlePass() {
      if (this.passData.address && this.passData.time) {
        let userId = this.curSelectResult.user.id;
        let time = this.passData.time;
        let address = this.passData.address;

        let resp = await addInterview({
          userId,
          time,
          address
        }, this.curSelectResult.id);
        if (resp.code === 0) {
          messageBox(
              "已通过",
              "success",
              1500
          )
          this.curSelectResult = null;
          this.passData.time = null;
          this.passData.address = null
          await this.loadResultList();
        } else {
          messageBox(
              "操作失败",
              "warn",
              1500
          )
        }

      } else {
        messageBox(
            "请填写时间和地点",
            "warn",
            1500
        )
      }
    },
    handleSelect(result) {
      this.curSelectResult = result;
    },
    async handleReason() {
      if (this.reason) {
        let resultId = this.curSelectResult.id;
        let userId = this.curSelectResult.user.id;
        let res = await unPass(resultId, userId);
        if (res.code === 0) {
          messageBox(
              "操作成功",
              "success"
          );
          this.curSelectResult = null;
          this.reason = null;
          this.loadResultList()
        } else {
          messageBox(
              "操作失败",
              "warn"
          )
        }
      } else {
        messageBox(
            "请填写原因",
            "warn"
        )
      }
    }
  },
  async created() {
    await this.loadResultList();
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/public.less";
@import "~@/styles/color.less";

.result-list-container {
  display: flex;
  justify-content: space-around;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 25px;

  .title {
    height: 36px;
    line-height: 36px;
    font-size: 18px;
    color: #5E72E4;
    font-weight: bold;
    text-align: center;
  }

  .result-list-left {
    min-height: 650px;
    width: 40%;
    background: #fff;
    border-radius: 5px;
    .boxShadow();

    .search {
      margin-top: 15px;
      height: 60px;
      display: flex;
      justify-content: center;
    }

    .head {
      display: flex;
      border-bottom: 1px solid darken(#fff, 10%);
      height: 36px;
      line-height: 36px;
      color: #5E72E4;
      font-weight: bold;
    }

    .col {
      width: 25%;
      text-align: center;

      &.select {
        a {
          cursor: pointer;
          color: @info;

          &.active {
            color: @adminRed;
          }
        }
      }
    }

    .row {
      display: flex;
      line-height: 36px;
      height: 36px;
      border-bottom: 1px solid darken(#fff, 10%);
      color: @word;
      font-size: 14px;
    }

    .list {
      min-height: 380px;
    }

    .empty {
      height: 380px;
    }

    .pager {
      margin-top: 20px;
    }
  }

  .result-list-right {
    min-height: 650px;
    width: 55%;
    background: #fff;
    border-radius: 5px;
    .boxShadow();

    .user {
      height: 36px;
      line-height: 36px;
      padding-left: 35px;
      color: #5E72E4;
      border-bottom: 1px solid darken(#fff, 10%);
    }

    .ctrl {
      width: 600px;
      margin: 0 auto;

      .nav {
        line-height: 40px;
        border-bottom: 2px solid darken(#fff, 10%);
        margin-bottom: 35px;

        a {
          font-weight: bold;
          font-size: 18px;
          color: #5E72E4;
          margin: 0 30px;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            color: lighten(#5E72E4, 10%);
          }

          &.active {
            color: @adminRed;
            text-decoration: underline;
          }
        }
      }

      .ctrl-item {
        .item {
          margin-bottom: 20px;
          display: flex;
          line-height: 38px;

          .pass-title {
            width: 120px;
            text-align: center;
          }

          input {
            width: 160px;
            height: 36px;
          }
        }

        .btn {
          a {
            display: block;
            width: 120px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            color: #fff;

            background-color: #5E72E4;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 50px;
          }
        }
      }

      .no-pass {
        button {
          width: 110px;
          height: 36px;
        }

        textarea {
          width: 300px;
          height: 100px;
          box-sizing: border-box;
          padding: 15px;
          resize: none;
        }
      }
    }
  }
}
</style>
