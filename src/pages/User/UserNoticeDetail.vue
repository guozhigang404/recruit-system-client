<template>
  <NoticeDetail :id="$route.query.id"></NoticeDetail>
</template>

<script>
import NoticeDetail from '@/pages/components/NoticeDetail'

export default {
  name: "UserNoticeDetail",
  components: {
    NoticeDetail
  }
}
</script>

<style scoped lang="less">

</style>
