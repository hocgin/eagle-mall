<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #title>分类</template>
    </Toolbar>
    <TreeSelect class="page" height="100%" :items="items"/>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import {TreeSelect} from 'vant';

  export default {
    components: {Toolbar, TreeSelect},
    data() {
      return {
        items: [{
          text: '所有城市',
          badge: 3,
          dot: true,
          className: 'my-class',
          children: [
            {
              text: '温州',
              id: 1,
              disabled: true,
            },
            {
              text: '杭州',
              id: 2,
            },
          ],
        }]
      }
    },
    computed: {},
    watch: {},
    methods: {}
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    height: 100%;
  }
</style>