<template>
  <div class="test">
    <Pager
        :current="current"
        :total="802"
        :limit="15"
        @pageChange="handlePageChange"></Pager>
  </div>
</template>

<script>
import Pager from "./"
export default {
  name: "test",
  data() {
    return {
      current: 1
    }
  },
  components: {
    Pager
  },
  methods:{
    handlePageChange(newNumber) {
      this.current = newNumber
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  //border: 2px solid green;
  padding: 100px;
}
</style>
