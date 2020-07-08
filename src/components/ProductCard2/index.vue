<template>
  <Cell>
    <template #default>
      <Card class="product-cart"
            :title="title"
            :num="num"
            :origin-price="originprice"
            :desc="desc"
            :price="price"
            :thumb="thumb">
        <template #footer>
          <slot name="footer"></slot>
        </template>
      </Card>
    </template>
  </Cell>
</template>
<script>
  import {Card, Cell} from 'vant'

  export default {
    components: {
      Cell, Card
    },
    props: {
      checked: {
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
      thumb: {
        type: String,
        required: false,
        default: ""
      },
      price: {
        type: String,
        required: true
      },
      originprice: {
        type: String,
        required: false
      },
      spec: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    created() {
      if (this.spec.length > 0) {
        this.desc = `规格: ` + (this.spec || []).map(({key, value}) => `${key}: ${value}`)
          .reduce((str1, str2) => `${str1};${str2}`);
      }
    },
    methods: {},
    data() {
      return {}
    },
    inheritAttrs: false
  }
</script>
<style scoped>
  .product-cart {
    background-color: #fff !important;
    padding: 0;
  }
</style>
