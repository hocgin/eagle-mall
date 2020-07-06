<template>
  <div class="user-tab">
    <div class="tab-item" url="/pages/collection/index?current=0">
      <span>99+</span>
      <span class="title">收藏</span>
    </div>
    <div class="tab-item" url="/pages/collection/index?current=1">
      <span>12</span>
      <span class="title">关注</span>
    </div>
    <div class="tab-item" url="/pages/messages/index">
      <span>0</span>
      <span class="title">消息</span>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
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

  /**
   * 用户收藏/关注/消息
   */
  .user-tab {
    z-index: 1;
    width: 100%;
    display: flex;
    background-color: @themeColor;
    color: #fff;
    padding: 5px 0 5px;
    position: relative;
    box-shadow: 0 5px 5px 0 rgba(87, 129, 193, 0.16),
    0 5px 10px 0 rgba(76, 129, 198, 0.13);

    .tab-item {
      flex: 1;
      font-size: 11pt;
      display: flex;
      height: 60px;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .title {
        font-size: 8pt;
        font-weight: inherit;
      }

      &:active {
        background-color: #3578d7;
      }
    }
  }
</style>
