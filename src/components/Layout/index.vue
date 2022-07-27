<template>
  <div class="layout-container">
    <div class="layout-left">
      <slot name="left"></slot>
    </div>
    <div class="layout-main">
      <div class="layout-header">
        <slot name="header"></slot>
      </div>
      <div class="layout-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";

.layout-container {
  width: 100%;
  height: 100%;

  display: flex;

  .layout-left {
    flex: 0 0 auto;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .layout-main {
    flex: 1 1 auto;

    .layout-header {
      width: 100%;
      height: 60px;
    }

    .layout-right {
      width: 100%;
      height: calc(100% - 60px);
    }
  }


  /*.layout-header {
    width: 100%;
    height: 60px;
  }

  .layout-main {
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
    display: flex;

    .layout-left {
      flex: 0 0 auto;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .layout-right {
      flex: 1 1 auto;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }*/
}
</style>
