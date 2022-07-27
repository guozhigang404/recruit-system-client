<template>
  <div class="empty-container">
    <div class="content">
      <div class="icon">
        <IconFont iconType="empty"></IconFont>
      </div>
      <div class="text">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/IconFont'
export default {
  name: "Empty",
  props: {
    message: {
      type: String,
      default: "暂无数据"
    }
  },
  components: {
    IconFont
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
.empty-container {
  position: relative;
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .icon {
      font-size: 80px;
      color: @gray;
      text-align: center;
      margin-bottom: 5px;
    }
    .text {
      text-align: center;
      min-width: 110px;
      font-size: 14px;
      color: darken(@gray, 20%);
    }
  }
}
</style>
