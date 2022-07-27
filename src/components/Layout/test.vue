<template>
  <div class="test">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout/index'
export default {
  name: "test",
  components: {
    Layout
  }
}
</script>

<style lang="less" scoped>
.test {
  width: 100vw;
  height: 100vh;
}
</style>
