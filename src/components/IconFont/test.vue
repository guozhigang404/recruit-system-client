<template>
  <div class="test">
    <IconFont iconType="error"></IconFont><IconFont iconType="warn"></IconFont><IconFont iconType="info"></IconFont>
  </div>
</template>

<script>
import IconFont from './'
export default {
  name: "test",
  components: {
    IconFont
  }
}
</script>

<style lang="less" scoped>
.test {
  font-size: 100px;
}
</style>
