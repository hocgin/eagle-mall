<template>
  <div>
    <NavBar :title="title"
            :left-arrow="leftArrow" @click-left="onClickLeft" @click-right="onClickRight">
      <template #title>
        <slot name="title"></slot>
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
      return {}
    },
    mounted() {
    },
    props: {
      title: {
        type: String,
        required: false,
        default: ''
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
<style scoped>

</style>
