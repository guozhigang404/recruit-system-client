<template>
  <div class="recruit-container" ref="container">
    <Header></Header>
    <div v-if="recruitInfoData" class="content">
      <div class="search">
        <SearchBox @search="handleSearch"></SearchBox>
      </div>
      <div class="list">
        <template v-if="recruitInfoData.total !== 0">
          <div class="title">
            <div class="col">职位名称</div>
            <div class="col">招聘数量</div>
            <div class="col">预计薪资</div>
            <div class="col">发布时间</div>
            <div class="col"></div>
          </div>
          <div class="body">
            <div
                class="row"
                v-for="data in recruitInfoData.data"
                :key="data.id"
            >
              <div class="briefly" :class="{
              active: !data.isHide
            }">
                <div class="col">{{ data.content }}</div>
                <div class="col">{{ data.count }}</div>
                <div class="col">{{ data.wages }}</div>
                <div class="col">{{ getDate(data.createdAt) }}</div>
                <div class="col">
                  <div class="show-ctrl" @click="data.isHide = !data.isHide">
                    <IconFont
                        :iconType=" data.isHide ? 'arrowDown' : 'arrowUp' "
                    ></IconFont>
                  </div>
                </div>
              </div>
              <div class="detail" :class="{
              hide: data.isHide
            }">
                <pre>{{ data.details }}</pre>
              </div>
            </div>

          </div>
        </template>
        <div v-else class="empty">
          <Empty message="没有你想要的结果"></Empty>
        </div>
      </div>
      <div class="pager">
        <Pager
            :current="currentPageNumber"
            :total="recruitInfoData.total"
            :limit="limit"
            :visibleNumber="10"
            @pageChange="pageChangeHandle"
        ></Pager>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Pager from '@/components/Pager'
import {getJobList} from '@/api/job.js'
import IconFont from '@/components/IconFont'
import {utcToLocal} from '@/utils/date'
import SearchBox from '@/components/SearchBox'
import Empty from '@/components/Empty'

export default {
  name: "RecruitInfo",
  data() {
    return {
      recruitInfoData: null,
      currentPageNumber: 1,
      keyword: "",
      limit: 15
    }
  },
  components: {
    Pager,
    Header,
    IconFont,
    SearchBox,
    Empty
  },
  methods: {
    handleSearch(query) {
      this.fetchData(1, this.limit, query).then(() => {
        this.currentPageNumber = 1;
      })
    },
    // 页码改变
    pageChangeHandle(newPage) {
      this.fetchData(newPage, this.limit, this.keyword).then(() => {
        this.currentPageNumber = newPage;
      })
    },
    // 请求数据
    async fetchData(page, limit, q) {
      const resp = await getJobList(page, limit, q);
      if (resp) {
        resp.data.data.forEach(item => {
          item.isHide = true
        })
        this.$refs.container.scrollTop = 0;
        this.recruitInfoData = resp.data
      }
    },
    // 根据日期，得到年月日
    getDate(date) {
      return utcToLocal(date).datePart;
    }
  },
  created() {
    this.fetchData(1, this.limit);
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/color.less";

.recruit-container {
  width: 100%;
  height: 100%;
  background-color: darken(@background, 5%);
  overflow-y: auto;
  scroll-behavior: smooth;

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-container {
    background-color: @headerBgDark;
  }

  .content {
    width: 100%;

    .search {
      width: 70%;
      height: 60px;
      margin: 10px auto 0;
      background-color: @background;
    }

    .list {
      width: 70%;
      margin: 10px auto 0;
      background-color: @background;

      .row {
        margin-bottom: 10px;


      }

      .title {
        display: flex;
        border-bottom: 1px solid darken(@background, 5%);
        font-weight: bold;
      }

      .body {
        .briefly {
          display: flex;
          border-bottom: 1px solid darken(@background, 5%);
          width: 100%;

          .col {
            font-size: 14px;
            color: lighten(@word, 10%);
          }

          &:hover {
            background-color: lighten(@info, 10%);
          }

          &.active {
            background-color: darken(@background, 4%);
          }
        }

        .detail {
          padding: 10px 0 10px 100px;
          box-sizing: border-box;
          font-size: 16px;
        }

        .hide {
          display: none;
        }
      }

      .col {
        flex: 1 1 14%;
        text-align: center;
        height: 36px;
        line-height: 36px;
        box-sizing: border-box;
      }

      .empty {
        width: 100%;
        height: 600px;
        position: relative;
      }
    }
  }

  .pager {
    margin: 30px 0;
  }

  .icon-container {
    font-size: 40px;
  }
}
</style>
