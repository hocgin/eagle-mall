<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #left>
        <Icon name="qr" size="20"/>
      </template>
      <template #title>
        <router-link :to="getSearchUrl()">
          <Search readonly placeholder="请输入搜索关键词"/>
        </router-link>
      </template>
      <template #right>
        <Icon name="discount" size="20"/>
      </template>
    </Toolbar>
    <Swipe class="swipe" :autoplay="3000"
           indicator-color="white">
      <SwipeItem>1</SwipeItem>
      <SwipeItem>2</SwipeItem>
      <SwipeItem>3</SwipeItem>
      <SwipeItem>4</SwipeItem>
    </Swipe>
    <Title title="我的订单" style="margin: 0 10px"/>
    <Grid icon-size="24" column-num="5" :border="false">
      <GridItem icon="photo-o" text="菜单1"/>
      <GridItem icon="photo-o" text="菜单2"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
      <GridItem icon="photo-o" text="菜单3"/>
    </Grid>
    <Title title="推荐商品" style="margin: 0 10px"/>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import {Grid, GridItem, Icon, Search, Swipe, SwipeItem} from 'vant';
  import Title from '@/components/Title'
  import {Urls} from "@/utils/constant/global";

  export default {
    components: {Toolbar, Search, Swipe, SwipeItem, Title, Grid, GridItem, Icon},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {
      getSearchUrl() {
        return Urls.getSearchPage();
      },
      onSubmit(values) {
        console.log('登录', values);
      },
    }
  }
</script>
<style scoped="scoped" lang="less">
  .container {
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

    .van-search {
      padding-bottom: 0;
      padding-top: 0;
    }

    .swipe {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }

</style>