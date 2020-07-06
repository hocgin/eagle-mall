<template>
  <div class="container">
    <Toolbar>
      <template #title>title</template>
    </Toolbar>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import Goto from "@/utils/Goto";

  export default {
    components: {Toolbar},
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