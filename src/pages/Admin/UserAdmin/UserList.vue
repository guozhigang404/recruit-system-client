<template>
  <div class="user-admin-container">
    <div class="user-list-container">
      <div class="search">
        <SearchBox @search="handleSearch"></SearchBox>
      </div>
      <div v-if="userList" class="user-list">
        <div class="head">
          <div class="col">姓名</div>
          <div class="col">电话</div>
          <div class="col">年龄</div>
          <div class="col">性别</div>
          <div class="col">操作</div>
        </div>
        <div
            class="row"
            v-for="user in userList.data"
            :key="user.id"
        >
          <div class="col">{{ user.name }}</div>
          <div class="col">{{ user.tel }}</div>
          <div class="col">{{ user.age }}</div>
          <div class="col">{{ user.sex ? '男' : "女" }}</div>
          <div class="col opt">
            <router-link
                :to="{
                name: 'UserDetailPage',
                params: {
                  id: user.id
                }
              }"
            >详情
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <Empty></Empty>
      </div>
      <div class="pager">
        <Pager
            v-if="userList"
            :total="userList.total"
            :limit=10
            :current="curPage"
            @pageChange="handlePageChange"
        ></Pager>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import Empty from '@/components/Empty'
import Pager from '@/components/Pager'
import {getUserList} from '@/api/userService'

export default {
  name: "UserAdmin",
  components: {
    Pager,
    SearchBox,
    Empty
  },
  data() {
    return {
      userList: null,
      curPage: 1
    }
  },
  methods: {
    async loadUserList(page = 1, limit = 10, q = "") {
      let res = await getUserList(page, limit, q);
      this.userList = res.data;
    },
    async handlePageChange(newPage) {
      await this.loadUserList(newPage);
      this.curPage = newPage
    },
    async handleSearch(val) {
      await this.loadUserList(1, 10, val);
      this.curPage = 1;
    }
  },
  async created() {
    await this.loadUserList()
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.user-admin-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;

  .user-list-container {
    width: 90%;
    margin: 0 auto;
    background-color: #FFF;
    height: 700px;

    .search {
      display: flex;
      height: 80px;
      justify-content: center;
      align-items: center;
    }

    .user-list {
      width: 100%;
      height: 400px;

      .head {
        display: flex;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: @info;
        border-bottom: 1px solid darken(#FFF, 10%);
      }

      .col {
        flex: 1 1 20%;
        text-align: center;
      }

      .opt a {
        color: @adminGreen;
        cursor: pointer;
      }

      .row {
        display: flex;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        border-bottom: 1px solid darken(#FFF, 10%);
      }
    }

    .empty {
      width: 100%;
      height: 400px;
    }

    .pager {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
