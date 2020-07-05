<template>
  <div>
    <div class="container">
      <Form @submit="onSubmit">
        <List @load="onLoad"
              :finished="finished"
              v-model="loading">
          <ProductCard v-for="item in list"
                       v-bind:checked.sync="item.checked"
                       :num="item.quantity"
                       :thumb="item.imageUrl"
                       :title="item.title"
                       :price="formatMoney(item.price)"
                       v-bind:key="item.id"/>
        </List>
        <SubmitBar :disabled="totalAmount === null"
                   :price="totalAmount" button-text="结算" native-type="submit"/>
      </Form>
    </div>
  </div>
</template>

<script>
  import {Form, List, SubmitBar} from 'vant';
  import {Util} from "@/utils/util";
  import {mapActions, mapState} from "vuex";
  import ProductCard from '@/components/ProductCard'
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";

  export default {
    components: {ProductCard, SubmitBar, List, Form},
    data() {
      return {
        loading: false,
        finished: false,
        selected: [],
        totalAmount: null,
        list: []
      }
    },
    computed: {
      ...mapState(models.ME, {
        shoppingCartPaging: (state) => state.shoppingCartPaging
      }),
    },
    mounted() {
      // this.pagingMyShoppingCart({payload: {}});
    },
    watch: {
      shoppingCartPaging: {
        handler({records = []}) {
          this.list = (records || []).map(({id, skuId, quantity, addProductTitle, addProductPrice, addProductImageUrl, cartItemStatus}) => ({
            id: id,
            title: addProductTitle,
            price: addProductPrice,
            imageUrl: addProductImageUrl ?? '404',
            status: cartItemStatus,
            quantity: quantity,
            skuId: skuId,
            checked: false
          }));
        },
        deep: true
      },
      list: {
        handler(values = []) {
          let skuItems = values.filter(({checked = false}) => checked).map(({skuId, quantity}) => ({
            skuId: skuId,
            quantity: quantity,
          }));
          this._calcOrder(skuItems);
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(models.ME, {
        pagingMyShoppingCart: actions.PAGING_MY_SHOPPING_CART,
      }),
      ...mapActions(models.APPS, {
        calcOrder: actions.CALC_ORDER
      }),
      formatMoney: Util.money,
      onLoad() {
        this.loading = true;
        this.pagingMyShoppingCart({
          payload: {
            page: 1,
            size: 100000
          },
          callback: () => {
            this.finished = true;
          }
        });
      },
      _calcOrder(values = []) {
        this.selected = values;
        if (values.length === 0) {
          this.totalAmount = null;
          return;
        }

        let callback = ({data}) => {
          this.totalAmount = (data?.totalAmount * 100)
        };

        this.calcOrder({
          payload: {
            items: values,
          },
          callback
        });
      },
      onSubmit(values) {
        console.log(this.list, '||-||', values);
      },
    }
  }
</script>
<style scoped>
  .container {
    padding: 0 10px;
    box-sizing: border-box;
    background-color: #F7F8FA;
    min-height: 100vh;
  }

  .card-row {
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    overflow: hidden;
    background-color: #fff !important;
  }

</style>