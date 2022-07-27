<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
import classMap from "./classMap"
export default {
  name: "IconFont",
  props: {
    iconType: {
      type: String,
      required: true
    }
  },
  computed: {
    fontClass() {
      return classMap[this.iconType]
    }
  }
}
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_3235028_f0lbqxd2b0b.css";

.icon-container {
  color: inherit;
  font-size: inherit;
}
</style>
