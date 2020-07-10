<template>
  <div class="order-list-container">
    <PullRefresh v-model="isRefresh" @refresh="onRefresh">
      <List v-if="list.length > 0" @load="onLoad"
            :finished="isFinished"
            v-model="isLoading">
        <router-link v-for="item in list" v-bind:key="item.id"
                     :to="getOrderUrl(item.id)">
          <OrderCard :orderSn="item.orderSn"
                     :statusName="item.orderStatusName"
                     :status="item.orderStatus"
                     :list="item.orderItems"
                     :totalAmount="item.totalAmount"
                     :discountTotalAmount="item.discountTotalAmount"
                     :payAmount="item.payAmount"/>
        </router-link>
      </List>
      <Empty v-else description="空空的订单"/>
    </PullRefresh>
  </div>
</template>
<script>

  import {mapActions} from "vuex";
  import OrderCard from '@/components/OrderCard/index'
  import {Empty, List, PullRefresh, Toast} from 'vant';
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import {Urls} from "@/utils/constant/global";

  export default {
    components: {List, PullRefresh, Empty, OrderCard},
    data() {
      return {
        page: 0,
        size: 10,
        list: [],
        isRefresh: false,
        isLoading: false,
        isFinished: false,
      }
    },
    props: {
      type: {
        type: Number,
        required: false,
        default: -1,
      }
    },
    mounted() {
      this.onLoad();
    },
    computed: {},
    watch: {},
    methods: {
      ...mapActions(models.ME, {
        pagingMyOrder: actions.PAGING_MY_ORDER,
      }),
      getOrderUrl(id) {
        return Urls.getOrderUrl(id);
      },
      onRefresh() {
        if (this.isLoading) {
          this.isRefresh = false;
          Toast.loading('加载中..');
          return;
        }

        this.isRefresh = true;
        this._pagingMyOrder(1, this.size, ({data: {records = []}}) => {
          this.list = [...records];
          this.isRefresh = false;
        });
      },
      onLoad() {
        this.isLoading = true;
        this._pagingMyOrder(++this.page, this.size, ({data: {records = []}}) => {
          this.list = [...this.list, ...records];
          if (records.length === 0) {
            this.isFinished = true;
          }
          this.isLoading = false;
        })
      },
      _pagingMyOrder(page = 1, size = 10, callback) {
        let orderStatus = this.type === -1 ? null : this.type;
        this.pagingMyOrder({payload: {page, size, orderStatus: orderStatus}, callback});
      },
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .order-list-container {
    background-color: @backgroundColor;
  }
</style>
