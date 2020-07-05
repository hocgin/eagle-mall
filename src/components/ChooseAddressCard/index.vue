<template>
  <div class="address-cart-container">
    <Icon name="location-o"/>
    请选择收货地址
  </div>
</template>

<script>
  import {Icon} from 'vant';

  export default {
    components: {
      Icon
    }
  }
</script>

<style scoped>
  .address-cart-container {
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    color: #323233;
    font-size: 14px;
  }

  .address-cart-container::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
  }

</style>
