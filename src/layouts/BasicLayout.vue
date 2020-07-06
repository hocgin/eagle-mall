<template>
  <div class="layout-container">
    <div class="container-wrapper">
      <router-view/>
    </div>
    <!-- 底部工具栏 -->
    <Tabbar class="tabbar" v-model="active" @change="onTabChange">
      <TabbarItem name="index" icon="home-o">首页</TabbarItem>
      <TabbarItem name="classify" icon="shop-o">分类</TabbarItem>
      <TabbarItem name="shopping-cart" icon="shopping-cart-o">购物车</TabbarItem>
      <TabbarItem name="user" icon="user-o">个人中心</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant';
  import router from "@/router";

  export default {
    components: {Tabbar, TabbarItem},
    data() {
      return {
        active: null
      }
    },
    methods: {
      onTabChange(value) {
        router.push(value)
      },
      onSubmit(values) {
        console.log('登录', values);
      },
    }
  };
</script>
<style scoped>
  .layout-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .container-wrapper {
    flex: 1 1;
    position: relative;
    overflow: scroll;
  }

  .tabbar {
    border-top: 1px solid #EFF0F1;
    position: unset;
  }
</style>