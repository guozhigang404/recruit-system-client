<template>
  <div class="add-sub-container">
    <div class="item">
      <div class="title">标签</div>
      <div class="data">
        <input type="text" v-model="formData.label">
      </div>
    </div>
    <div class="item">
      <div class="title">内容</div>
      <div class="data">
        <textarea v-model="formData.content"></textarea>
      </div>
    </div>
    <div class="item">
      <div class="title">答案</div>
      <div class="data">
        <textarea v-model="formData.answer"></textarea>
      </div>
    </div>

    <div class="item">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import {messageBox} from '@/utils'
import {addSubjective} from '@/api/question'

export default {
  name: "AddSubQuestion",
  data() {
    return {
      formData: {
        label: null,
        content: null,
        answer: null
      }
    }
  },
  methods: {
    async submit() {
      let isEmpty = false;
      for (const formDataKey in this.formData) {
        if (this.formData[formDataKey] === null) {
          isEmpty = true;
        }
      }

      if (isEmpty) {
        messageBox(
            "请将数据填写完成",
            "error",
            2000
        )
        return;
      }

      let res = await addSubjective(this.formData);
      if (res.code === 0) {
        messageBox(
            "添加成功",
            "success"
        )
        for (const formDataKey in this.formData) {
          this.formData[formDataKey] = null;
        }
      } else {
        messageBox("添加失败", "warn")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-sub-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 30px;

  .item {
    margin-bottom: 30px;

    .title {
      font-size: 18px;
      color: #6D9FEE;
      font-weight: bold;
      margin-bottom: 10px;
    }

    input[type=text] {
      width: 230px;
      height: 36px;
    }

    button {
      width: 120px;
      height: 40px;
      cursor: pointer;
    }

    textarea {
      box-sizing: border-box;
      padding: 15px;
      width: 500px;
      height: 120px;
      resize: none;
    }
  }
}
</style>
