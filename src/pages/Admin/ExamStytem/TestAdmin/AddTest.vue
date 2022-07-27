<template>
  <div class="add-test-container">
    <div class="add-test-left">
      <div class="search">
        <SearchBox @search="search"></SearchBox>
      </div>
      <div class="question">
        <div class="title">选择题</div>
        <div class="head">
          <div class="col id">编号</div>
          <div class="col label">标签</div>
          <div class="col content">简要内容</div>
          <div class="col opt">添加操作</div>
        </div>
        <div v-if="objectiveList" class="list">
          <div
              class="row"
              v-for="q in objectiveList.data"
              :key="q.id"
          >
            <div class="col id">{{ q.id }}</div>
            <div class="col label">{{ q.label }}</div>
            <div class="col content">{{ q.content }}</div>
            <div class="col opt">
              <a @click="addObj(q.id)">添加</a>
            </div>
          </div>
        </div>
        <div v-if="objectiveList === null || objectiveList.total === 0" class="empty">
          <Empty></Empty>
        </div>
        <div v-if="objectiveList" class="pager">
          <Pager
              :current="pageNumber.obj"
              :limit="10"
              :total="objectiveList.total"
              @pageChange="objPageChange"
          >
          </Pager>
        </div>
      </div>

      <div class="question">
        <div class="title">简答题</div>
        <div class="head">
          <div class="col id">编号</div>
          <div class="col label">标签</div>
          <div class="col content">简要内容</div>
          <div class="col opt">添加操作</div>
        </div>
        <div v-if="subjectiveList" class="list">
          <div
              class="row"
              v-for="q in subjectiveList.data"
              :key="q.id"
          >
            <div class="col id">{{ q.id }}</div>
            <div class="col label">{{ q.label }}</div>
            <div class="col content">{{ q.content }}</div>
            <div class="col opt">
              <a @click="addSub(q.id)">添加</a>
            </div>
          </div>
        </div>
        <div v-if="subjectiveList === null || subjectiveList.total === 0" class="empty">
          <Empty></Empty>
        </div>
        <div v-if="subjectiveList" class="pager">
          <Pager
              :current="pageNumber.sub"
              :limit="10"
              :total="subjectiveList.total"
              @pageChange="subPageChange"
          >
          </Pager>
        </div>
      </div>
    </div>
    <div class="add-test-right">
      <div class="selected">
        <div class="title">选择题</div>
        <div class="content">
          <div
              class="item"
              v-for="(item, i) in obj"
              :key="item"
          >
            <div class="id">{{ item }}</div>
            <div @click="objDel(i)" class="del">X</div>
          </div>
        </div>
      </div>

      <div class="selected">
        <div class="title">简答题</div>
        <div class="content">
          <div
              class="item"
              v-for="(item, i) in sub"
              :key="item"
          >
            <div class="id">{{ item }}</div>
            <div @click="subDel(i)" class="del">X</div>
          </div>
        </div>
      </div>

      <div class="test-info">
        <div class="item">
          <div class="tit">考试名称</div>
          <input type="text" v-model="testName">
        </div>
        <div class="item">
          <div class="tit">起始时间</div>
          <input type="datetime-local" v-model="startTime">
        </div>
        <div class="item">
          <div class="tit">结束时间</div>
          <input type="datetime-local" v-model="endTime">
        </div>
        <div class="item">
          <button @click="submit">提交试卷</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import Pager from '@/components/Pager'
import Empty from '@/components/Empty'
import {getObjectives, getSubjective} from '@/api/question'
import moment from 'moment'
import {messageBox} from '@/utils'
import {submitPaper} from '@/api/examPaper'

export default {
  name: "AddTest",
  data() {
    return {
      obj: [],
      sub: [],
      objectiveList: null,
      subjectiveList: null,
      pageNumber: {
        obj: 1,
        sub: 1
      },
      testName: null,
      startTime: null,
      endTime: null
    }
  },
  components: {
    Pager,
    SearchBox,
    Empty
  },
  methods: {
    async loadObj(page = 1, limit = 10, q = '') {
      let resp = await getObjectives(page, limit, q);
      this.objectiveList = resp.data;
    },
    async loadSub(page = 1, limit = 10, q = '') {
      let resp = await getSubjective(page, limit, q);
      this.subjectiveList = resp.data;
    },

    addObj(id) {
      if (this.obj.includes(id)) {
        return;
      }
      this.obj.push(id);
    },
    objDel(i) {
      this.obj.splice(i, 1);
    },
    addSub(id) {
      if (this.sub.includes(id)) {
        return;
      }
      this.sub.push(id);
    },
    subDel(i) {
      this.sub.splice(i, 1);
    },
    async objPageChange(page) {
      await this.loadObj(page)
      this.pageNumber.obj = page;
    },
    async subPageChange(page) {
      await this.loadSub(page)
      this.pageNumber.sub = page;
    },
    search(val) {
      this.loadObj(1, 10, val).then(() => {
        this.pageNumber.obj = 1
      })
      this.loadSub(1, 10, val).then(() => {
        this.pageNumber.sub = 1
      })
    },
    async submit() {
      if (this.obj.length <= 0 || this.sub.length <= 0) {
        messageBox(
            "请选择试题",
            "error"
        )
        return;
      }

      if (
          !(this.startTime && this.endTime && this.testName)
      ) {
        messageBox(
            "请将考试信息补充完整",
            "error"
        )
      }

      if (moment(this.startTime).valueOf() - moment(this.endTime).valueOf() >= 0) {
        messageBox(
            "请选择正确的日期范围",
            "warn"
        );
        return;
      }

      let questions = {
        objective: [],
        subjective: []
      };
      this.obj.forEach(item => {
        questions.objective.push({
          id: item,
          score: 20
        })
      });
      this.sub.forEach(item => {
        questions.subjective.push({
          id: item,
          score: 20
        })
      })
      let reqData = {
        name: this.testName,
        startTime: this.startTime,
        endTime: this.endTime,
        question: JSON.stringify(questions),
        strict: 1
      };
      let res = await submitPaper(reqData);
      if (res.code === 0) {
        messageBox(
            "添加成功",
            "success",
            1200,
        )
      } else {
        messageBox(
            "添加失败",
            "warn",
            1200,
        )
      }

    }
  },
  created() {
    this.loadObj();
    this.loadSub()
  }
}
</script>

<style lang="less" scoped>
.add-test-container {
  width: 100%;
  display: flex;

  .add-test-left {
    width: 60%;
    box-sizing: border-box;
    height: 1100px;

    .search {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .question {
      border: 1px solid darken(#FFF, 10%);
      min-height: 300px;
      margin-bottom: 20px;

      .empty {
        height: 300px;
      }

      .title {
        line-height: 30px;
        color: #FFF;
        background-color: #6D9FEE;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }

      .head {
        display: flex;
        line-height: 34px;
        color: #5E72E4;
        font-weight: bold;
      }

      .row {
        width: 100%;
        display: flex;
        border: 1px solid darken(#FFF, 10%);
      }

      .col {
        text-align: center;
        line-height: 30px;

        &.id {
          width: 5%;
        }

        &.label {
          width: 20%;
        }

        &.content {
          width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
          padding: 0 8px;
        }

        &.opt {
          width: 20%;

          a {
            font-size: 14px;
            color: #6D9FEE;
            cursor: pointer;
          }
        }
      }
    }

  }

  .add-test-right {
    width: 40%;
    min-height: 600px;
    box-sizing: border-box;
    padding: 10px;

    .selected {
      width: 100%;

      .title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #2DCE89;
        border-bottom: 1px solid darken(#FFF, 10%);
      }

      border: 1px solid darken(#FFF, 10%);

      .content {
        width: 100%;
        height: 240px;
        //background-color: #6D9FEE;
        box-sizing: border-box;
        padding: 10px;
        overflow-y: auto;

        .item {
          width: 80px;
          height: 35px;
          border: 1px solid #2DCE89;
          display: flex;
          line-height: 35px;
          margin: 5px;
          float: left;

          .id {
            flex: 1 1 auto;
            text-align: center;
            color: #FFF;
            background-color: #2DCE89;
          }

          .del {
            width: 30px;
            text-align: center;
            background-color: #DA2A4D;
            font-weight: bold;
            color: #FFF;
            cursor: pointer;
          }
        }

      }
    }

    .test-info {
      width: 100%;
      margin-top: 20px;

      .item {
        width: 100%;
        margin-bottom: 15px;

        .tit {
          color: #6D9FEE;
          margin-bottom: 10px;
        }

        input {
          width: 220px;
          height: 36px;
        }

        button {
          width: 120px;
          height: 34px;
          background-color: #DA2A4D;
          color: #FFF;
          cursor: pointer;
          border: none;
          outline: none;
        }
      }
    }
  }
}
</style>
