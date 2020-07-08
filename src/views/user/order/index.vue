<template>
  <div class="container">
    <Toolbar>
      <template #title>我的订单</template>
    </Toolbar>
    <div class="tabs-container">
      <Tabs v-model="active"
            class="tabs"
            sticky swipeable animated>
        <Tab :title="OrderTabs.All.name" :name="OrderTabs.All.value"
             :to="getTabUrl(OrderTabs.All.value)" replace>
          <OrderList :type="OrderTabs.All.value"></OrderList>
        </Tab>
        <Tab :title="OrderTabs.PendingPayment.name" :name="OrderTabs.PendingPayment.value"
             :to="getTabUrl(OrderTabs.PendingPayment.value)" replace>
          <OrderList :type="OrderTabs.PendingPayment.value"></OrderList>
        </Tab>
        <Tab :title="OrderTabs.ToBeDelivered.name" :name="OrderTabs.ToBeDelivered.value"
             :to="getTabUrl(OrderTabs.ToBeDelivered.value)" replace>
          <OrderList :type="OrderTabs.ToBeDelivered.value"></OrderList>
        </Tab>
        <Tab :title="OrderTabs.Shipped.name" :name="OrderTabs.Shipped.value"
             :to="getTabUrl(OrderTabs.Shipped.value)" replace>
          <OrderList :type="OrderTabs.Shipped.value"></OrderList>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar/index'
  import OrderList from '@/views/user/order/components/OrderList'
  import {Tab, Tabs} from 'vant';
  import {OrderTabs, Urls} from '@/utils/constant/global';

  export default {
    components: {Toolbar, Tab, Tabs, OrderList},
    data() {
      return {
        active: null,
        OrderTabs: OrderTabs
      }
    },
    mounted() {
      this.active = Number(this.$route.query?.tab ?? 0);
    },
    methods: {
      getTabUrl(value) {
        return Urls.getMyOrderPage({tab: value});
      },
    }
  }
</script>
<style scoped lang="less">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .tabs-container {
    flex: 1 1;

    .tabs {
      height: 100%;
      display: flex;
      flex-direction: column;

      .order-list-container {
        height: 100%;
      }

    }

    /deep/ .van-tab__pane {
      height: 100% !important;
    }

    /deep/ .van-tabs__content {
      height: 100% !important;
    }
  }
</style>