<template>
  <div class="subjective-list-container">
    <div class="search">
      <SearchBox @search="search"></SearchBox>
    </div>
    <div v-if="questionList" class="question-list">
      <div class="head">
        <div class="col label">标签</div>
        <div class="col content">内容</div>
        <div class="col opt">操作</div>
      </div>
      <div class="rows">
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
    </div>
    <div v-if="questionList===null || questionList.total === 0" class="empty">
      <Empty></Empty>
    </div>
    <div class="pager" v-if="questionList">
      <Pager
          :current="curPage"
          :total="questionList.total"
          :limit="10"
          @pageChange="pageChange"
      ></Pager>
    </div>

    <div v-if="curSelectQuestion" class="question-detail">
      <div class="title">
        试题详情
      </div>
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
        <div class="tlt">答案</div>
        <div class="data">
          <textarea :disabled="disabled" v-model="formData.answer"></textarea>
        </div>
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
import {
  deleteSubjectiveById,
  getSubjective,
  updateSubjective
} from '@/api/question'
import ConfirmationBox from '@/utils/ConfirmationBox'
import {messageBox} from '@/utils'

export default {
  name: "SubjectiveList",
  data() {
    return {
      questionList: null,
      curSelectQuestion: null,
      curPage: 1,
      disabled: true,
      formData: {
        label: null,
        content: null,
        answer: null
      }
    }
  },
  components: {
    SearchBox,
    Pager,
    Empty
  },
  methods: {
    async search(val) {
      await this.loadQuestion(1, 10, val)
      this.curPage = 1;
    },
    async loadQuestion(page = 1, limit = 10, q = '') {
      let res = await getSubjective(page, limit, q);
      this.questionList = res.data;
    },
    selectQuestion(q) {
      this.curSelectQuestion = q;
      this.formData.label = this.curSelectQuestion.label;
      this.formData.content = this.curSelectQuestion.content;
      this.formData.answer = this.curSelectQuestion.answer;
      this.disabled = q.status !== -1;
    },

    async submit() {
      let qId = this.curSelectQuestion.id;
      let res = await updateSubjective(qId, this.formData);
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
    },

    deleteQuestion(q) {
      let qId = q.id;
      ConfirmationBox(
          "此操作不可恢复",
          async () => {
            let res = await deleteSubjectiveById(qId);
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
    async pageChange(page) {
      await this.loadQuestion(page);
      this.curPage = page;
    }
  },
  async created() {
    await this.loadQuestion();
  }
}
</script>

<style lang="less" scoped>
.subjective-list-container {
  width: 100%;

  .search {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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


  .question-list {
    .head {
      display: flex;
      line-height: 38px;
      font-weight: bold;
      font-size: 18px;
      color: #6D9FEE;
      border-bottom: 1px solid darken(#FFF, 10%);
    }

    .col {
      text-align: center;
    }

    .label,
    .opt {
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

    .content {
      width: 640px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .row {
      display: flex;
      border-bottom: 1px solid darken(#FFF, 10%);
      line-height: 36px;
    }
  }

  .empty {
    height: 400px;
  }
}
</style>
