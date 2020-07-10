<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #title>
        商品搜索列表
      </template>
    </Toolbar>
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
            <Card :title="item.title"
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
  import {Card, Empty, List, PullRefresh, Tag, Toast} from 'vant';
  import * as models from '@/store/models-types'
  import * as actions from '@/store/actions-types'
  import {mapActions, mapState} from 'vuex'
  import {Util} from "@/utils/util";
  import {Urls} from "@/utils/constant/global";

  export default {
    components: {Card, List, Tag, Toolbar, PullRefresh, Empty},
    data() {
      return {
        isRefresh: false,
        isLoading: false,
        isFinished: false,
        page: 1,
        size: 10,
        list: [],
      }
    },
    created() {
    },
    computed: {
      ...mapState(models.PRODUCT, {
        // list: (state) => state.paging
      }),
    },
    watch: {},
    methods: {
      ...mapActions(models.PRODUCT, {
        pagingProduct: actions.PAGING_PRODUCT,
      }),
      formatMoney: Util.money,
      getProductUrl(id) {
        return Urls.getProductPage(id)
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
        this.pagingProduct({payload: {page: page, size: size}, callback: callback});
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
  }

  .result-wrapper {
    height: 100%;
    padding: 0 10px;
    overflow: scroll;
  }

</style>