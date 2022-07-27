<template>
  <div class="test">
    <Avatar size="150"
            :url="'https://img2.baidu.com/it/u=790045287,958560532&fm=26&fmt=auto'"
            alt="美好的生活"
    ></Avatar>
  </div>
</template>

<script>
// https://img2.baidu.com/it/u=790045287,958560532&fm=26&fmt=auto
import Avatar from "./"
export default {
  name: "test",
  components: {
    Avatar
  }
}
</script>

<style scoped>
.test {
  margin-top: 100px;
}
</style>
