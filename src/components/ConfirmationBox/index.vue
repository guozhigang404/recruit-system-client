<template>
  <div class="confirmation-box-container">
    <div class="main-box">
      <div
          class="head"
          :class="{
          [level]: true
        }"
      >
        <div class="title">{{ title }}</div>
        <div
            class="close"
            @click="close"
        >
          <IconFont iconType="close"></IconFont>
        </div>
      </div>
      <div class="body">
        <div class="msg">
          <div
              class="icon"
              :class="{
              [level]: true
            }"
          >
            <IconFont :icon-type="level"></IconFont>
          </div>
          <div class="content">
            {{ message }}
          </div>
        </div>
        <div class="btn">
          <button @click="close" class="cancel">取消</button>
          <button
              @click="determine"
              class="determine"
              :class="{
            [level]:true
          }"
          >确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/IconFont'

export default {
  name: "ConfirmationBox",
  props: {
    level: {
      // success error warn
      type: String,
      default: "warn"
    },
    message: {
      type: String,
      default: ""
    }
  },
  computed: {
    title() {
      let title = "警告";
      if (this.level === "success") {
        title = "提示"
      }
      if (this.level === "warn") {
        title = "警告"
      }
      if (this.level === "error") {
        title = "错误"
      }
      return title;
    }

  },
  components: {
    IconFont
  },
  methods: {
    close() {
      this.$emit("close")
    },
    determine() {
      this.$emit("determine");
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.confirmation-box-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .main-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 5px 5px 6px darken(@gray, 10%);

    .head {
      height: 40px;
      width: 100%;
      display: flex;
      color: #FFF;
      justify-content: space-between;

      .title {
        line-height: 40px;
        width: 60px;
        text-align: center;
      }

      .close {
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        color: darken(@info, 30%);
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: darken(@info, 40%);
        }
      }

      &.warn {
        background-color: @warn;
      }

      &.success {
        background-color: @info;
      }

      &.error {
        background-color: @error;
      }
    }

    .body {
      height: 220px;
      background-color: darken(#FFF, 5%);

      .msg {
        height: 150px;
        display: flex;

        .icon {
          width: 50px;
          text-align: center;
          font-size: 32px;
          margin-left: 36px;
          box-sizing: border-box;
          padding-top: 30px;

          &.warn {
            color: @warn;
          }

          &.error {
            color: @error;
          }

          &.success {
            color: @success;
          }
        }

        .content {
          box-sizing: border-box;
          padding-top: 30px;
          padding-left: 20px;
          font-size: 14px;
          line-height: 20px;
          color: darken(@gray, 20%);
        }
      }

      .btn {
        text-align: center;

        button {
          width: 100px;
          height: 36px;
          outline: none;
          border: none;
          margin: 0 10px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            transform: scale(1.1);
          }

          &.cancel {
            background-color: @info;
          }

          &.warn {
            background-color: @warn;
          }

          &.success {
            background-color: @info;
          }

          &.error {
            background-color: @error;
          }
        }
      }
    }

  }
}

</style>
