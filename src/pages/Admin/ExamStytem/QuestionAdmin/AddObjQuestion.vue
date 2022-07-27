<template>
  <div class="add-obj-container">
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
      <div class="title">A</div>
      <div class="data">
        <textarea v-model="formData.a"></textarea>
      </div>
    </div>
    <div class="item">
      <div class="title">B</div>
      <div class="data">
        <textarea v-model="formData.b"></textarea>
      </div>
    </div>
    <div class="item">
      <div class="title">C</div>
      <div class="data">
        <textarea v-model="formData.c"></textarea>
      </div>
    </div>
    <div class="item">
      <div class="title">D</div>
      <div class="data">
        <textarea v-model="formData.d"></textarea>
      </div>
    </div>
    <div class="item">
      <div class="title">答案</div>
      <div class="data">
        <label>A: <input type="radio" value="a" v-model="formData.answer"></label>
        <label>B: <input type="radio" value="b" v-model="formData.answer"></label>
        <label>C: <input type="radio" value="c" v-model="formData.answer"></label>
        <label>D: <input type="radio" value="d" v-model="formData.answer"></label>
      </div>
    </div>
    <div class="item">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import {messageBox} from '@/utils'
import {addObjective} from '@/api/question'

export default {
  name: "AddObjQuestion",
  data() {
    return {
      formData: {
        label: null,
        content: null,
        a: null,
        b: null,
        c: null,
        d: null,
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
      this.formData.answer = JSON.stringify([this.formData.answer])
      let res = await addObjective(this.formData);
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
.add-obj-container {
  width: 100%;
  height: 100%;

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

    input[type=radio] {
      margin: 0 15px;
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
