<template>
  <div class="test">
    <ConfirmationBox message="错误" level="error" @determine="fun" @close="close"></ConfirmationBox>
  </div>
</template>

<script>
import ConfirmationBox from '@/components/ConfirmationBox/index'

export default {
  name: "test",
  components: {
    ConfirmationBox
  },
  methods: {
    close() {
      console.log("关闭")
    },
    fun() {
      console.log(123)
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.test {
  width: 800px;
  height: 800px;
  border: 2px solid #000;
  margin: 0 auto;
  position: relative;
  background-color: @gray;
}

</style>
