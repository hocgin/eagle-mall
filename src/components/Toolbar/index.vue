<template>
  <div :class="themeClass">
    <NavBar :title="title"
            :left-arrow="leftArrow" @click-left="onClickLeft" @click-right="onClickRight">
      <template #title>
        <div class="title">
          <slot name="title"></slot>
        </div>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
      <template #left>
        <slot name="left"></slot>
      </template>
    </NavBar>
  </div>
</template>
<script>
  import {NavBar} from 'vant';
  import router from "@/router";

  export default {
    components: {NavBar},
    data() {
      return {
        themeClass: null
      }
    },
    mounted() {
      if (this.theme === 'blue') {
        this.themeClass = 'blue';
      }
    },
    props: {
      title: {
        type: String,
        required: false,
        default: 'default'
      },
      theme: {
        type: String,
        required: false,
        default: 'white'
      },
      leftArrow: {
        type: Boolean,
        required: false,
        default: true
      },
      onClickLeft: {
        type: Function,
        required: false,
        default: function () {
          router.go(-1);
        }
      },
      onClickRight: {
        type: Function,
        required: false,
        default: function () {
        }
      }
    },
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .blue {
    .van-nav-bar {
      background-color: #3A84EF;
      color: #fff !important;

      .title {
        color: #fff !important;
      }
    }


    .van-hairline--bottom::after {
      border-width: 0;
    }
  }
</style>
