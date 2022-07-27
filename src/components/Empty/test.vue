<template>
  <div class="test">
    <Empty></Empty>
  </div>
</template>

<script>
import Empty from '@/components/Empty/index'
export default {
  name: "test",
  components: {
    Empty
  }
}
</script>

<style scoped lang="less">
.test {
  width: 600px;
  height: 500px;
  border: 1px solid #005c5c;
}
</style>
