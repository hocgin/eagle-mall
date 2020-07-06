<template>
  <div>
    <Toolbar class="toolbar" theme="blue" :left-arrow="false">
      <template #title>个人中心</template>
    </Toolbar>
    <!-- 用户信息 -->
    <div class="user-info">
      <VanImage class="avatar" round
                width="60" height="60"
                fit="cover"
                src="https://hocg.in/Resume/img/avatar.png"/>
      <div class="detailed">
        <div class="username">hocgin</div>
        <div class="description">这家伙很懒，什么也没留下</div>
      </div>
    </div>
    <!-- 菜单 -->
    <UserTabs/>
    <div class="toolbar">
      <!-- 我的订单 -->
      <Title title="我的订单" style="margin: 0 10px"/>
      <Grid icon-size="24" column-num="5">
        <GridItem icon="photo-o" text="待付款"/>
        <GridItem icon="photo-o" text="待发货"/>
        <GridItem icon="photo-o" text="待收货"/>
        <GridItem icon="photo-o" text="待评价"/>
        <GridItem icon="photo-o" text="全部"/>
      </Grid>
      <Title title="工具栏" style="margin: 0 10px"/>
      <CellGroup>
        <Cell title="设置收货地址"></Cell>
      </CellGroup>
    </div>
  </div>
</template>
<script>
  import Title from '@/components/Title'
  import UserTabs from '@/components/UserTabs'
  import Toolbar from '@/components/Toolbar'
  import {Cell, CellGroup, Grid, GridItem, Image as VanImage} from 'vant';

  export default {
    components: {VanImage, UserTabs, Toolbar, Title, Grid, GridItem, Cell, CellGroup},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      onSubmit(values) {
        console.log('登录', values);
      },
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .toolbar {
    background-color: #fff;
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