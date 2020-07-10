<template>
  <div class="container">
    <Toolbar :left-arrow="true">
      <template #title>
        <Search v-model="keyword"
                autofocus
                clearable
                shape
                @search="onSearch"
                placeholder="请输入搜索关键词"/>
      </template>
    </Toolbar>
    <DropdownMenu>
      <DropdownItem v-model="menus.name11.selected" :options="menus.name11.options"/>
      <DropdownItem v-model="menus.name22.selected" :options="menus.name22.options"/>
    </DropdownMenu>
    <div class="result-wrapper">
      <PullRefresh style="height: 100%"
                   v-model="isRefresh"
                   @refresh="onRefresh">
        <List v-if="list.length > 0"
              @load="onLoad"
              :finished="isFinished"
              v-model="isLoading"
              finished-text="没有更多了">
          <router-link v-for="item in list" v-bind:key="item.id"
                       :to="getProductUrl(item.id)">
            <Card class="result-card"
              :title="item.title"
              desc="很懒暂未填写"
              :price="formatMoney(item.minPrice)"
              :thumb="item.mainPhotoUrl">
              <template #tags>
                <Tag plain type="danger">{{item.procurement}}</Tag>
              </template>
            </Card>
          </router-link>
        </List>
        <Empty v-else description="空空的搜索结果"/>
      </PullRefresh>
    </div>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import {Card, DropdownItem, DropdownMenu, Empty, List, PullRefresh, Search, Tag, Toast} from 'vant';
  import * as models from '@/store/models-types'
  import * as actions from '@/store/actions-types'
  import {mapActions} from 'vuex'
  import {Util} from "@/utils/util";
  import {Urls} from "@/utils/constant/global";

  export default {
    components: {Card, List, Tag, Toolbar, PullRefresh, Empty, Search, DropdownMenu, DropdownItem},
    data() {
      return {
        isRefresh: false,
        isLoading: false,
        isFinished: false,
        page: 1,
        size: 10,
        keyword: null,
        list: [],
        menus: {
          name11: {
            selected: 0,
            options: [{
              text: '全部商品',
              value: 0
            }, {
              text: '新款商品',
              value: 1
            }]
          },
          name22: {
            selected: 0,
            options: [{
              text: '默认排序',
              value: 0
            }, {
              text: '好评排序',
              value: 1
            }]
          }
        }
      }
    },
    mounted() {
      this.onRefresh();
    },
    methods: {
      ...mapActions(models.PRODUCT, {
        pagingProduct: actions.PAGING_PRODUCT,
      }),
      formatMoney: Util.money,
      getProductUrl(id) {
        return Urls.getProductPage(id)
      },
      onSearch() {
        this.onRefresh();
      },
      onRefresh() {
        if (this.isLoading) {
          this.isRefresh = false;
          Toast.loading('加载中..');
          return;
        }

        this.isRefresh = true;
        this._pagingProduct(1, this.size, ({data: {records = []}}) => {
          this.list = [...records];
          this.isRefresh = false;
        });
      },
      onLoad() {
        this.isLoading = true;
        this._pagingProduct(++this.page, this.size, ({data: {records}}) => {
          this.list = [...this.list, ...records];
          if (records.length === 0) {
            this.isFinished = true;
          }
          this.isLoading = false;
        });
      },
      _pagingProduct(page = 1, size = 10, callback) {
        this.pagingProduct({payload: {page: page, size: size, keyword: this.keyword}, callback: callback});
      }
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: @backgroundColor;

    /deep/ .van-nav-bar {
      display: flex;
    }

    /deep/ .van-nav-bar__title {
      flex: 1 1;
      max-width: unset;
      overflow: hidden;
    }

    /deep/ .van-nav-bar__left {
      position: unset;
    }

    /deep/ .van-nav-bar__right {
      position: unset;
    }
  }

  .result-wrapper {
    height: 100%;
    padding: 0 10px;
    overflow: scroll;
  }
  .result-card {
    background-color: #fff;
    margin: 5px 0;
    border-radius: 5px;
  }


</style>