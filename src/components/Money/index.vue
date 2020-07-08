<template>
  <span v-if="text != null" style="vertical-align: bottom;">
    <span class="unit">{{unit}}</span>
    <span class="text1">{{text1}}</span>
    <span class="text2">.{{text2}}</span>
  </span>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        text1: null,
        text2: null,
      }
    },
    props: {
      text: {
        type: String,
        required: false,
        default: null
      },
      unit: {
        type: String,
        required: false,
        default: null
      },
    },
    mounted() {
      let strings = `${this.text}`.split('.');
      this.text1 = strings[0] ?? '0';
      this.text2 = strings[1] ?? '00';
    },
    methods: {}
  }
</script>
<style scoped lang="less">
  .unit {
    font-size: 12px;
  }
  .text2 {
    font-size: 12px;
  }
</style>
