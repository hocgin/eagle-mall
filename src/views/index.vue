<template>
  <div class="container">
    <Tabbar v-model="active" @change="onTabChange">
      <TabbarItem icon="home-o">首页</TabbarItem>
      <TabbarItem icon="shop-o">分类</TabbarItem>
      <TabbarItem name="shopping-cart" icon="shopping-cart-o">购物车</TabbarItem>
      <TabbarItem icon="user-o">个人中心</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant';
  import Goto from "@/utils/Goto";

  export default {
    components: {Tabbar, TabbarItem},
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
<style scoped>
</style>