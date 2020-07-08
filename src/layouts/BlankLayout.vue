<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'BlankLayout',
    watch: {
      $route() {
        document.title = this.$route?.meta?.title;
      }
    },
  };
</script>
