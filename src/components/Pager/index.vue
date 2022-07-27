<template xmlns="">
  <div class="pager-container" v-if="pageNumber > 1">
    <div class="pager-code">
      <a v-show="current !== 1" @click="handleClick(1)">首页</a>
      <a v-show="current !== 1" @click="handleClick(current - 1)">上一页</a>
      <a
          class="number"
          v-for="item in visibleNumberArr"
          :key="item.id"
          :class="{
            active: item.num === current
          }"
          @click="handleClick(item.num)"
      >{{item.num}}</a>

      <a
          v-show="current !== pageNumber"
          @click="handleClick(current + 1)"
      >下一页</a>
      <a
          v-show="current !== pageNumber"
          @click="handleClick(pageNumber)"
      >尾页</a>
    </div>
    <span class="tip">{{current}}/{{pageNumber}}</span>
  </div>
</template>

<script>
export default {
  name: "Pager",
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit)
    },
    visibleMinNumber() {
      let num = this.current - Math.floor(this.visibleNumber / 2);
      if(num < 1) {
        num = 1;
      }
      return num;
    },
    visibleMaxNumber() {
      let num = this.visibleMinNumber + this.visibleNumber - 1;
      if(num > this.pageNumber) {
        num = this.pageNumber;
      }
      return num;
    },
    visibleNumberArr() {
      let arr = [];
      for(let i = this.visibleMinNumber; i <= this.visibleMaxNumber; i++) {
        arr.push({
          num: i,
          id: i
        });
      }
      return arr;
    }
  },
  methods: {
    handleClick(newNumber) {
      if(newNumber === this.current) {
        return;
      }
      if(newNumber <=0) {
        newNumber = 1;
      } else if(newNumber > this.pageNumber) {
        newNumber = this.pageNumber;
      }
      this.$emit("pageChange", newNumber)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/color.less";
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  .pager-code {
    display: flex;
    justify-content: center;
  }

  .tip {
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    font-size: @smallFont + 1;
  }

  a {
    display: block;
    height: 32px;
    line-height: 32px;
    text-align: center;
    padding: 0 8px;
    margin: 0 2px;
    color: @primary;
    cursor: pointer;
    font-size: @bigFont - 2;
    border-radius: 5px;

    transition: all 0.3s;

    &.number {
      width: 32px;
      height: 32px;
      padding: 0;
    }

    &.active {
      background-color: @link;
      color: @lightWords;
    }

    &:hover {
      background-color: @link;
      color: @lightWords;
    }

  }
}
</style>
