<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #title>我的购物车</template>
    </Toolbar>
    <Form @submit="onSubmit" style="height: 100%; margin-top: 10px">
      <div class="card-wrapper">
        <List @load="onLoad"
              :finished="finished"
              v-model="loading">
          <ProductCard v-for="item in list"
                       v-bind:checked.sync="item.checked"
                       v-bind:num.sync="item.quantity"
                       :thumb="item.imageUrl"
                       :title="item.title"
                       :price="formatMoney(item.price)"
                       v-bind:key="item.id"/>
        </List>
      </div>
      <SubmitBar :disabled="disabledSubmit"
                 :price="totalAmount" button-text="结算" native-type="submit"/>
    </Form>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import {Form, List, SubmitBar} from 'vant';
  import {Util} from "@/utils/util";
  import {mapActions, mapState} from "vuex";
  import ProductCard from '@/components/ProductCard'
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import Goto from "@/utils/Goto";

  export default {
    components: {ProductCard, SubmitBar, List, Form, Toolbar},
    data() {
      return {
        loading: false,
        finished: false,
        shoppingCart: [],
        disabledSubmit: true,
        totalAmount: 0,
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
            skuId: skuId
          }));
        },
        deep: true
      },
      list: {
        handler(values = []) {
          let skuItems = values.map(({skuId, quantity, checked}) => ({
            skuId: skuId,
            quantity: quantity,
            checked: checked,
          }));

          if (this.shoppingCart.length !== 0) {
            for (let {skuId, quantity} of skuItems) {
              let index = this.shoppingCart.findIndex(item => (item.skuId === skuId && item.quantity === quantity));
              console.log('update', index, index < 0, skuId, quantity);
              if (index < 0) {
                this._updateMyShoppingCart(skuId, quantity);
              }
            }
          }

          this.shoppingCart = (skuItems || []).filter(({quantity}) => quantity !== 0);
          this._calcOrder((this.shoppingCart || []).filter(({checked = false}) => checked));
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(models.ME, {
        pagingMyShoppingCart: actions.PAGING_MY_SHOPPING_CART,
        deleteMyShoppingCart: actions.DELETE_MY_SHOPPING_CART,
        updateMyShoppingCart: actions.UPDATE_MY_SHOPPING_CART,
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
        this.disabledSubmit = values.length <= 0;
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
      _updateMyShoppingCart(skuId, quantity) {
        console.log('加载xx', skuId, quantity);
        if (quantity <= 0) {
          this.deleteMyShoppingCart({payload: {id: skuId}});
          this.onLoad();
        } else {
          this.updateMyShoppingCart({payload: {skuId, quantity}});
        }
      },
      onSubmit() {
        Goto.confirmOrder((this.shoppingCart || []).filter(({checked = false}) => checked))
      },
    }
  }
</script>
<style scoped>
  .container {
    box-sizing: border-box;
    background-color: #F7F8FA;
    height: 100%;
  }

  .card-wrapper {
    height: 100%;
    padding: 0 10px;
    overflow: scroll;
  }

  .van-submit-bar {
    position: absolute;
  }

</style>