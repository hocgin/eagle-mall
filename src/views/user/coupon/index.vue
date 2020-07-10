<template>
  <div class="container">
    <Toolbar>
      <template #title>我的优惠券</template>
    </Toolbar>
    我的优惠券
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar/index'

  export default {
    components: {Toolbar},
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style scoped lang="less">
  @import "src/global.less";
</style>