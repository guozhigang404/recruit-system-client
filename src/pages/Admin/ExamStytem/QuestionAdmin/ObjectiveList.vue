<template>
  <div class="obj-list-container">
    <div class="question-list">
      <div class="search">
        <SearchBox @search="search"></SearchBox>
      </div>
      <div class="list">
        <div class="head">
          <div class="col label">标签</div>
          <div class="col content">内容</div>
          <div class="col opt">操作</div>
        </div>
        <div v-if="questionList" class="rows">
          <div
              class="row"
              v-for="q in questionList.data"
              :key="q.id"
          >
            <div class="col label">{{ q.label }}</div>
            <div class="col content">{{ q.content }}</div>
            <div class="col opt">
              <a
                  class="detail-link"
                  @click="selectQuestion(q)"
              >详情</a>
              <a
                  class="del-btn"
                  @click="deleteQuestion(q)"
                  v-if="q.status !== 1"
              >删除</a>
            </div>
          </div>
        </div>
        <div v-if="questionList === null || questionList.total === 0" class="empty">
          <Empty></Empty>
        </div>
        <div v-if="questionList" class="pager">
          <Pager
              :current="curPage"
              :total="questionList.total"
              :limit="10"
              @pageChange="pageChange"
          ></Pager>
        </div>
      </div>
    </div>
    <div v-if="curSelectQuestion" class="question-detail">
      <div class="title">试题详情</div>
      <div class="item">
        <div class="tlt">标签</div>
        <div class="data">
          <input :disabled="disabled" v-model="formData.label" type="text">
        </div>
      </div>
      <div class="item">
        <div class="tlt">内容</div>
        <div class="data">
          <textarea :disabled="disabled" v-model="formData.content"></textarea>
        </div>
      </div>
      <div class="item">
        <div class="tlt">A</div>
        <div class="data"><textarea :disabled="disabled" v-model="formData.a"></textarea></div>
      </div>
      <div class="item">
        <div class="tlt">B</div>
        <div class="data"><textarea :disabled="disabled" v-model="formData.b"></textarea></div>
      </div>
      <div class="item">
        <div class="tlt">C</div>
        <div class="data"><textarea :disabled="disabled" v-model="formData.c"></textarea></div>
      </div>
      <div class="item">
        <div class="tlt">C</div>
        <div class="data"><textarea :disabled="disabled" v-model="formData.d"></textarea></div>
      </div>
      <div class="item">
        <div class="tlt">答案</div>
        <div class="data"><input :disabled="disabled" type="text" v-model="formData.answer"></div>
      </div>

      <div class="item">
        <button :disabled="disabled" @click="submit">提交修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import Pager from '@/components/Pager'
import Empty from '@/components/Empty'
import {deleteObjectiveById, getObjectives, updateObjective} from '@/api/question'
import ConfirmationBox from '@/utils/ConfirmationBox'
import {messageBox} from '@/utils'
import login from '@/pages/Home/Login'

export default {
  name: "ObjectiveList",
  data() {
    return {
      questionList: null,
      curSelectQuestion: null,
      curPage: 1,
      formData: {
        label: null,
        content: null,
        a: null,
        b: null,
        c: null,
        d: null,
        answer: null
      },
      disabled: true
    }
  },
  components: {
    Pager,
    SearchBox,
    Empty
  },
  methods: {
    async search(val) {
      await this.loadQuestion(1, 10, val);
      this.curPage = 1;
    },
    async loadQuestion(page = 1, limit = 10, q = '') {
      let resp = await getObjectives(page, limit, q);
      this.questionList = resp.data;
    },
    async pageChange(page) {
      await this.loadQuestion(page);
      this.curPage = page;
    },
    async deleteQuestion(q) {
      let qId = q.id;
      ConfirmationBox(
          "是否执行删除操作",
          async () => {
            let res = await deleteObjectiveById(qId);
            if (res.code === 0) {
              messageBox(
                  "删除成功",
                  "success"
              );
              await this.loadQuestion(this.curPage)
            } else {
              messageBox(
                  "删除失败",
                  "warn"
              );
            }
          }
      )
    },
    selectQuestion(q) {
      this.curSelectQuestion = q;
      this.formData.label = this.curSelectQuestion.label;
      this.formData.content = this.curSelectQuestion.content
      this.formData.a = this.curSelectQuestion.a;
      this.formData.b = this.curSelectQuestion.b;
      this.formData.c = this.curSelectQuestion.c;
      this.formData.d = this.curSelectQuestion.d;
      console.log(this.curSelectQuestion.answer)

      this.formData.answer = JSON.parse(this.curSelectQuestion.answer)[0];
      this.disabled = q.status === 1;

    },
    async submit() {
      let qId = this.curSelectQuestion.id;
      let reqData = {
        ...this.formData
      }
      reqData.answer = JSON.stringify([reqData.answer]);
      let res = await updateObjective(qId, reqData);
      if (res.code === 0) {
        messageBox(
            "更新成功",
            "success"
        );
        await this.loadQuestion(this.curPage)
      } else {
        messageBox(
            "更新失败",
            "warn"
        );
      }
    }
  },
  async created() {
    await this.loadQuestion()
  }
}
</script>

<style lang="less" scoped>
.obj-list-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  .question-detail {
    box-sizing: border-box;
    padding-top: 30px;
    margin-top: 20px;
    height: 500px;
    border-top: 2px solid #6D9FEE;

    .tlt {
      margin-bottom: 10px;
      font-size: 18px;
      color: #6D9FEE;
    }

    textarea {
      width: 600px;
      height: 150px;
    }

    input {
      width: 230px;
      height: 38px;
    }
  }

  .search {
    display: flex;
    justify-content: center;
    height: 60px;
    align-items: center;
  }

  .question-list {
    width: 100%;
  }

  .list {
    width: 100%;

    .head {
      display: flex;
      height: 38px;
      line-height: 38px;
      box-sizing: border-box;
      border-bottom: 1px solid darken(#FFF, 10%);
      color: #6D9FEE;
      font-size: 18px;
      font-weight: bold;
    }

    .col {
      line-height: 36px;
      text-align: center;

      &.content {
        width: 640px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &.label {
        flex: 0 0 20%;
      }

      &.opt {
        flex: 0 0 20%;

        a {
          font-size: 14px;
          cursor: pointer;

          &.detail-link {
            color: #6D9FEE;
          }

          &.del-btn {
            color: #DA2A4D;
          }

          margin: 0 10px;
        }
      }
    }

    .rows {
      width: 100%;
    }

    .row {
      border-bottom: 1px solid darken(#FFF, 10%);
      display: flex;
      width: 100%;
    }
  }

  .pager {
    margin-top: 20px;
  }

  .empty {
    height: 350px;
  }
}

</style>
