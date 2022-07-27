<template>
  <div class="test">
    <SearchBox @search="submit"></SearchBox>
  </div>
</template>

<script>
import SearchBox from './'
export default {
  name: "test",
  components: {
    SearchBox
  },
  methods: {
    submit(inputVal) {
      console.log(inputVal)
    }
  }
}
</script>

<style scoped lang="less">
.test {
  width: 400px;
  height: 50px;
  //border: 1px solid #008c8c;
  margin: 200px auto 0;
}
</style>
