<template>
  <div class="address-cart-container">
    <div class="address-cart-name">
      <Icon name="location-o"/>
      {{name}} {{phone}}
    </div>
    <div class="address-cart-detail">{{address}}</div>
  </div>
</template>

<script>
  import {Icon} from 'vant';

  export default {
    components: {
      Icon
    },
    props: {
      name: {
        type: String,
        required: false,
        default: ''
      },
      address: {
        type: String,
        required: false,
        default: ''
      },
      phone: {
        type: String,
        required: false,
        default: ''
      },
    },
  }
</script>

<style scoped>
  .address-cart-container {
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
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

  .address-cart-name {
    margin-bottom: 8px;
    font-size: 16px;
    color: #323233;
  }

  .address-cart-detail {
    color: #323233;
    font-size: 13px;
    line-height: 18px;
  }

</style>
