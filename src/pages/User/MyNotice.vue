<template>
  <div class="notice-container">
    我的通知
  </div>
</template>

<script>
import {getNotice} from '@/api/noticeService'

export default {
  name: "MyNotice",
  data() {
    return {
      noticeList: null
    }
  },
  async created() {
    this.noticeList = await getNotice();
  }
}
</script>

<style scoped lang="less">

</style>
