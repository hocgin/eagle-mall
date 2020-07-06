<template>
  <h2 class="title">{{ title }} {{this.$slots.default}}</h2>
</template>

<script>
  export default {
    components: {},
    props: {
      title: {
        type: String,
        required: false,
      },
    },
    inheritAttrs: false
  }
</script>

<style scoped>
  .title {
    margin: 0;
    padding: 25px 16px 10px 0;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
  }
</style>
