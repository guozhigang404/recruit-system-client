<template>
  <div v-if="jobData" class="edit-job-container">
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
        <a
            class="submit"
            @click="handleSubmit"
        >提交</a>
        <router-link
            class="back"
            :to="{
          name: 'RecruitInfoList'
        }">返回
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {getJobById, updateJobById} from '@/api/job'
import Pager from '@/components/Pager'
import {messageBox} from '@/utils'

export default {
  name: "EditJob",
  components: {Pager},
  data() {
    return {
      formData: {
        content: "",
        count: 0,
        wages: 0,
        details: null
      },
      jobData: null
    }
  },
  methods: {
    async loadJob() {
      let id = this.$route.params.id;
      let resp = await getJobById(id);
      this.jobData = resp.data;
      this.formData.content = this.jobData.content;
      this.formData.count = this.jobData.count;
      this.formData.wages = this.jobData.wages;
      this.formData.details = this.jobData.details;
    },

    async handleSubmit() {
      let id = this.$route.params.id;
      let resp = await updateJobById(id, this.formData);
      if (resp.code === 0) {
        messageBox(
            "修改成功",
            "success",
            1500,
            null,
            () => {
              this.$router.push({
                name: "RecruitInfoList"
              }).catch(r => {
              })
            }
        )
      } else {
        messageBox(
            "修改失败",
            "error",
            1500
        )
      }
    }

  },
  async created() {
    await this.loadJob();
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.edit-job-container {
  width: 90%;
  //height: 650px;
  background-color: #FFF;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 40px;

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
      height: 400px;
      resize: none;
      box-sizing: border-box;
      padding: 30px;
    }

    a {
      font-size: 14px;
      margin: 0 20px;
      color: @adminGreen;
      cursor: pointer;
    }
  }

}
</style>
