<template>
  <div class="black-list-container">
    <div class="head">
      <div class="col">姓名</div>
      <div class="col">手机号</div>
      <div class="col reason">原因</div>
      <div class="col">操作</div>
    </div>
    <div v-if="blackList" class="list">
      <div
          class="row"
          v-for="black in blackList.data"
      >
        <div class="col">{{ black.user.name }}</div>
        <div class="col">{{ black.user.tel }}</div>
        <div class="col reason">{{ black.reason }}</div>
        <div class="col">
          <a @click="remove(black.id)">移除</a>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <Empty></Empty>
    </div>
    <div v-if="blackList" class="pager">
      <Pager
          :current="curPage"
          :total="blackList.total"
          :limit="10"
          @pageChange="pageChange"
      ></Pager>
    </div>
  </div>
</template>

<script>
import {getBlackListByPage, removeBlackListById} from '@/api/blacklist'
import Empty from '@/components/Empty'
import Pager from '@/components/Pager'
import ConfirmationBox from '@/utils/ConfirmationBox'
import {messageBox} from '@/utils'

export default {
  name: "BlackList",
  data() {
    return {
      blackList: null,
      curPage: 1
    }
  },
  components: {
    Empty,
    Pager
  },
  methods: {
    async loadBlackList(page = 1, limit = 10) {
      let res = await getBlackListByPage(page, limit);
      this.blackList = res.data;
    },
    remove(id) {
      ConfirmationBox(
          "确定要将其移除吗",
          async () => {
            let res = await removeBlackListById(id);
            if (res.code === 0) {
              messageBox(
                  "移除成功",
                  "success"
              );
              await this.loadBlackList()
              this.curPage = 1;
            } else {
              messageBox(
                  "移除失败",
                  "warn"
              );
            }
          }
      )
    },
    async pageChange(newPage) {
      await this.loadBlackList(newPage, 10)
      this.curPage = newPage
    }
  },
  async created() {
    await this.loadBlackList(1, 10);
  }
}
</script>

<style lang="less" scoped>
.black-list-container {
  width: 100%;
  height: 100%;
  background-color: #FFF;
  padding: 30px 60px;
  box-sizing: border-box;

  .head {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #5E72E4;
    display: flex;
    border-bottom: 1px solid darken(#FFF, 10%);
  }

  .row {
    line-height: 36px;
    display: flex;
    border-bottom: 1px solid darken(#FFF, 10%);
  }

  .col {
    flex: 1 1 20%;
    text-align: center;
    line-height: 36px;

    &.reason {
      flex: 1 1 40%;
    }

    a {
      color: #6D9FEE;
      cursor: pointer;
    }
  }

  .list {
    min-height: 400px;
  }

  .empty {
    height: 400px;
  }
}
</style>
