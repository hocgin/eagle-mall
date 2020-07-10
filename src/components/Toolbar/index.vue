<template>
  <div>
    <div :class="['e-toolbar', themeClass]">
      <NavBar :title="title"
              :left-arrow="leftArrow"
              @click-left="onSelfClickLeft"
              @click-right="onClickRight">
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
    <div style="height: 46px;">todo</div>
  </div>
</template>
<script>
  import {NavBar} from 'vant';
  import router from "@/router";

  export default {
    components: {NavBar},
    data() {
      return {
        themeClass: null,
        onSelfClickLeft: this.onClickLeft || function () {

        },
      }
    },
    mounted() {
      if (this.theme === 'blue') {
        this.themeClass = 'blue';
      }
      if (this.leftArrow === true) {
        this.onSelfClickLeft = this.onClickLeft ?? function () {
          router.go(-1);
        };
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

  .e-toolbar {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .blue {
    .van-nav-bar {
      background-color: #3A84EF;
      color: #fff !important;

      .title {
        color: #fff !important;
      }

      /deep/ .van-icon {
        color: #fff !important;
      }
    }

    .van-hairline--bottom::after {
      border-width: 0;
    }
  }
</style>
