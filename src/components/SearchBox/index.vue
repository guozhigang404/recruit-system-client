<template>
  <div class="search-box-container"
       :class="{
      [theme]: true
    }"
  >
    <input type="text" v-on:keyup.enter="search" :placeholder="placeholder" v-model="inputVal">
    <button v-on:click="search">
      <IconFont iconType="search"></IconFont>
    </button>
  </div>
</template>

<script>
import IconFont from '@/components/IconFont'
export default {
  name: "SearchBox",
  data() {
    return {
      inputVal: ""
    }
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入关键词"
    },
    theme: {
      type: String,
      default: "blue"
    }
  },
  components: {
    IconFont
  },
  methods: {
    search() {
      this.$emit("search", this.inputVal);
      this.inputVal = "";
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";
.search-box-container {
  &.blue {
    display: flex;

    input {
      width: 280px;
      height: 40px;
      line-height: 40px;
      padding: 0 8px;
      box-sizing: border-box;
      color: @word;
      outline: none;
      border: 2px solid @link;
    }

    button {
      border: none;
      outline: none;
      width: 50px;
      height: 40px;
      background-color: @link;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: darken(@link, 5%);
      }

      .icon-container {
        font-size: 28px;
        color: #FFF;
      }
    }
  }

  &.light {
    position: relative;
    height: 100%;

    input {
      width: 280px;
      height: 32px;
      outline: none;
      border: none;
      box-sizing: border-box;
      padding-left: 10px;
      border-radius: 8px;
      background-color: #F9F9F9;
      box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);

      &:focus {
        outline: 2px solid lighten(@info, 5%);
      }

      &::placeholder {
        font-size: 12px;
      }
    }

    button {
      font-size: 18px;
      position: absolute;
      top: 60%;
      outline: none;
      border: none;
      background-color: transparent;
      transform: translateY(-50%);
      right: 10px;
      cursor: pointer;
    }
  }
}
</style>
