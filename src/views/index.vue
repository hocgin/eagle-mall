<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #title>
        <Search></Search>
      </template>
    </Toolbar>
    <Swipe class="swipe" style="margin: 10px 0"
           :autoplay="3000"
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
  import {Grid, GridItem, Search, Swipe, SwipeItem} from 'vant';
  import Goto from "@/utils/Goto";
  import Title from '@/components/Title'

  export default {
    components: {Toolbar, Search, Swipe, SwipeItem, Title, Grid, GridItem},
    data() {
      return {
        active: 'shopping-cart'
      }
    },
    computed: {},
    watch: {},
    methods: {
      onTabChange(value) {
        let maps = {
          ['shopping-cart']: Goto.shoppingCart
        };
        let goto = maps[value];
        if (goto) goto();
      },
      onSubmit(values) {
        console.log('登录', values);
      },
    }
  }
</script>
<style scoped="scoped" lang="less">
  .container {
    .van-nav-bar__title {
      margin: unset;
      overflow: hidden;
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