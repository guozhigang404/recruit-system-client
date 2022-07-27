<template>
  <div class="notice-detail-container">
    <div class="main">
      <div class="title">通知内容</div>
      <div class="time">
        {{ time }}
      </div>
      <div class="content">{{ content }}</div>
      <div class="go-home">
        <router-link :to="{
          name: userRouterName
        }">返回主页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {utcToLocal} from '@/utils/date'
import {readNotice} from '@/api/noticeService'

export default {
  name: "NoticeDetail",
  data() {
    return {
      content: "",
      time: ""
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    userRouterName() {
      let userTypeId = this.$store.state.user.userData["userTypeId"];
      console.log(userTypeId)
      if (userTypeId === 1 || userTypeId === 2) {
        return "UserAdmin"
      } else {
        return "JobList"
      }
    }
  },
  created() {
    let id = this.$route.query["id"];
    if (id) {
      let noticeList = this.$store.state.notice.noticeList;
      noticeList.forEach(item => {
        if (item.id === +id) {
          console.log(item)
          this.content = item.content
          let date = utcToLocal(item.createdAt);
          this.time = `${date.datePart} ${date.timePart}`

          readNotice(id).then(data => {
            this.$store.dispatch("notice/readNotice", id)
          })
        }
      })
    } else {
      this.content = "";
    }
  }
}
</script>

<style scoped lang="less">
.notice-detail-container {
  width: 100%;
  height: 100%;
  position: relative;

  .main {
    width: 500px;
    margin: 50px auto 0;

    .title {
      line-height: 60px;
      text-align: center;
      font-size: 36px;
    }

    .time {
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
    }

    .content {
      font-size: 18px;
      color: #222222;
    }

    .go-home {
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: #6D9FEE;
      font-size: 14px;
    }
  }
}
</style>
