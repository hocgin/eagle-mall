<template>
  <div class="container">
    <Toolbar class="toolbar" theme="blue" :left-arrow="false">
      <template #title>个人中心</template>
    </Toolbar>
    <!-- 用户信息 -->
    <div class="user-info">
      <VanImage class="avatar" round
                width="60" height="60"
                fit="cover"
                :src="user.avatar"/>
      <div class="detailed">
        <div class="username">{{user.nickname}}</div>
        <div class="description">这家伙很懒，什么也没留下</div>
      </div>
    </div>
    <!-- 菜单 -->
    <UserTabs/>
    <div class="toolbar">
      <!-- 我的订单 -->
      <div class="order-toolbar">
        <Title title="我的订单" style="margin: 0 10px"/>
        <Grid icon-size="24" column-num="4">
          <GridItem icon="pending-payment" :to="getTabUrl(OrderTabs.PendingPayment.value)"
                    :text="OrderTabs.PendingPayment.name"/>
          <GridItem icon="send-gift-o" :to="getTabUrl(OrderTabs.ToBeDelivered.value)"
                    :text="OrderTabs.ToBeDelivered.name"/>
          <GridItem icon="logistics" :to="getTabUrl(OrderTabs.Shipped.value)"
                    :text="OrderTabs.Shipped.name"/>
          <GridItem icon="orders-o" :to="getTabUrl(OrderTabs.All.value)"
                    :text="OrderTabs.All.name"/>
        </Grid>
      </div>
      <!-- 工具栏 -->
      <div class="feature-list">
        <Title title="工具栏" style="margin: 0 10px"/>
        <CellGroup>
          <Cell title="我的收货地址" :to="getAddressUrl()"></Cell>
        </CellGroup>
      </div>
    </div>
  </div>
</template>
<script>
  import Title from '@/components/Title'
  import UserTabs from '@/components/UserTabs'
  import Toolbar from '@/components/Toolbar'
  import {Cell, CellGroup, Grid, GridItem, Image as VanImage} from 'vant';
  import {mapActions, mapState} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import {OrderTabs, Urls} from '@/utils/constant/global';

  export default {
    components: {VanImage, UserTabs, Toolbar, Title, Grid, GridItem, Cell, CellGroup},
    data() {
      return {
        OrderTabs: OrderTabs
      }
    },
    computed: {
      ...mapState(models.ME, {
        user: (state) => state.userInfo
      }),
    },
    mounted() {
      if (this.user === null) {
        this.getUserInfo({});
      }
    },
    watch: {},
    methods: {
      ...mapActions(models.ME, {
        getUserInfo: actions.GET_USER_INFO,
      }),
      getAddressUrl() {
        return Urls.getAddressPage();
      },
      getTabUrl(value) {
        return Urls.getMyOrderPage({tab: value});
      },
      onSubmit(values) {
        console.log('登录', values);
      },
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    background-color: @backgroundColor;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .toolbar {
    .order-toolbar {
      background-color: #fff;
    }

    .feature-list {
      .van-cell__title {
        color: #646566;
      }
    }
  }

  /**
   * 用户信息
   */
  .user-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: @themeColor;
    color: #fff;

    .avatar {
      border: solid 4px #fff;
      margin-left: @box-width;
      margin-right: @box-width;
    }

    .detailed {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .username {
        font-size: 13pt;
        display: block;
        font-weight: 500;
      }

      .description {
        font-size: 8pt;
        font-weight: inherit;
      }
    }
  }

</style>