<template>
  <Cell>
    <template #icon>
      <Checkbox v-model="checkedValue"
                :disabled="disabled"/>
    </template>
    <template #default>
      <Card class="product-cart"
            :title="title"
            :desc="desc"
            :price="price"
            :thumb="thumb">
        <template #num>
          <Stepper v-model="numValue"
                   :disabled="disabled"/>
        </template>
      </Card>
    </template>
  </Cell>
</template>
<script>
  import {Card, Cell, Checkbox, Stepper} from 'vant'

  export default {
    components: {
      Cell, Checkbox, Card, Stepper
    },
    props: {
      checked: {
        type: Boolean,
        required: false,
        default: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      num: {
        type: Number,
        required: false,
        default: 1
      },
      title: {
        type: String,
        required: false,
        default: ""
      },
      desc: {
        type: String,
        required: false,
        default: ""
      },
      thumb: {
        type: String,
        required: false,
        default: ""
      },
      price: {
        type: String,
        required: true
      },
      onChangeCheck: {
        type: Function,
        required: false
      }
    },
    watch: {
      numValue(value) {
        this.$emit('update:num', value);
      },
      checkedValue(value) {
        this.$emit('update:checked', value);
      }
    },
    methods: {},
    data() {
      return {
        checkedValue: false,
        numValue: this.num
      }
    },
    inheritAttrs: false
  }
</script>
<style scoped>
  .product-cart {
    background-color: #fff !important;
  }
</style>
