<template>
  <div class="release-container">
    <div class="form">
      <div class="item">
        <div class="title">名称:</div>
        <div class="data"><input v-model="formData.content" type="text"></div>
      </div>
      <div class="item">
        <div class="title">招聘数量:</div>
        <div class="data"><input v-model="formData.count" type="text"></div>
      </div>
      <div class="item">
        <div class="title">薪资:</div>
        <div class="data"><input v-model="formData.wages" type="text"></div>
      </div>
      <div class="item">
        <div class="title">详情:</div>
        <div class="data">
          <textarea v-model="formData.details"></textarea>
        </div>
      </div>
      <div class="item">
        <div class="error">
          {{ errorMsg }}
        </div>
      </div>
      <div class="item">
        <button @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import {addJob} from '@/api/job'
import {messageBox} from '@/utils'

export default {
  name: "ReleaseJob",
  data() {
    return {
      formData: {
        content: "",
        count: null,
        wages: null,
        details: null
      },
      errorMsg: ""
    }
  },
  methods: {
    async submit() {
      if (
          this.formData.content
          && this.formData.count
          && this.formData.wages
          && this.formData.details
      ) {
        let resp = await addJob(this.formData);
        if (resp.data) {
          messageBox("添加成功", "success", 1200)
        } else {
          messageBox("添加失败", "error", 1200)
        }
        this.errorMsg = ""
        this.formData.content = null;
        this.formData.count = null;
        this.formData.wages = null;
        this.formData.details = null;
      } else {
        this.errorMsg = "请将数据补充完整"
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.release-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
  overflow-y: auto;

  .form {
    width: 90%;
    box-sizing: border-box;
    padding: 30px;
    margin: 0 auto;
    background-color: #FFF;


    .item {
      margin-bottom: 30px;

      .title {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: @info;
        font-weight: bold;
      }

      input {
        width: 300px;
        height: 36px;
      }

      textarea {
        width: 700px;
        height: 250px;
        resize: none;
        box-sizing: border-box;
        padding: 30px;
      }

      button {
        width: 110px;
        height: 34px;
        background-color: @adminGreen;
        color: #FFF;
        cursor: pointer;
        border: none;
        outline: none;
      }

      .error {
        color: @adminRed;
      }
    }


  }
}
</style>
