<template>
  <img
      :src="url"
      :alt="alt"
      class="avatar-container"
      :style="{
        width: size + 'px',
        height: size + 'px'
      }
  ">
</template>

<script>
export default {
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 50
    },
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped lang="less">
.avatar-container {
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
</style>
