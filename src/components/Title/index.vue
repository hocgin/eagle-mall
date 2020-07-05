<template>
  <Cell>
    <template #title>
      Check
    </template>
    <template #default>
      Product Card
    </template>
  </Cell>
</template>

<script>
  import Cell from 'vant'

  export default {
    components: {Cell},
    name: 'ProductCard',
    props: {
      msg: String
    }
  }
</script>

<style scoped>

</style>
