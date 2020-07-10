<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #title>我的购物车</template>
    </Toolbar>
    <Form @submit="onSubmit" style="flex: 1 1; margin-top: 10px">
      <PullRefresh v-model="isRefresh" @refresh="onRefresh" class="card-wrapper">
        <List v-if="list.length > 0" @load="onLoad"
              :finished="isFinished"
              v-model="isLoading">
          <SwipeCell v-for="item in list"
                     v-bind:key="item.id"
                     :name="item.id"
                     :beforeClose="onBeforeClose">
            <ProductCard v-bind:checked.sync="item.checked"
                         v-bind:num.sync="item.quantity"
                         :thumb="item.imageUrl"
                         :title="item.title"
                         :price="formatMoney(item.price)"/>
            <template #right>
              <Button square text="删除" type="danger"
                      native-type="button"
                      class="delete-button"/>
            </template>
          </SwipeCell>
        </List>
        <Empty v-else description="空空的购物车"/>
      </PullRefresh>
      <SubmitBar :disabled="disabledSubmit"
                 :price="totalAmount" button-text="结算" native-type="submit"/>
    </Form>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import {Button, Empty, Form, List, PullRefresh, SubmitBar, SwipeCell, Toast} from 'vant';
  import {Util} from "@/utils/util";
  import {mapActions, mapState} from "vuex";
  import ProductCard from '@/components/ProductCard'
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import Goto from "@/utils/Goto";

  export default {
    components: {ProductCard, SubmitBar, List, Form, Toolbar, PullRefresh, SwipeCell, Button, Empty},
    data() {
      return {
        isRefresh: false,
        isLoading: false,
        isFinished: false,
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
      this.onLoad();
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
        this.isLoading = true;
        this._queryMyShoppingCart(() => {
          this.isFinished = true;
          this.isLoading = false;
        });
      },
      onRefresh() {
        if (this.isLoading) {
          this.isRefresh = false;
          Toast.loading('加载中..');
          return;
        }

        this.isRefresh = true;
        this._queryMyShoppingCart(() => {
          this.isRefresh = false;
        });
      },
      onSubmit() {
        Goto.confirmOrder((this.shoppingCart || []).filter(({checked = false}) => checked))
      },
      onBeforeClose({name}) {
        this.deleteMyShoppingCart({
          payload: {id: name},
          callback: this.onLoad
        });
      },
      _queryMyShoppingCart(callback) {
        this.pagingMyShoppingCart({
          payload: {page: 1, size: 100000},
          callback
        });
      },
      _calcOrder(values = []) {
        this.disabledSubmit = values.length <= 0;
        if (values.length === 0) {
          this.totalAmount = 0;
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
        if (quantity <= 0) {
          this.deleteMyShoppingCart({payload: {id: skuId}});
          this.onLoad();
        } else {
          this.updateMyShoppingCart({payload: {skuId, quantity}});
        }
      },
    }
  }
</script>
<style scoped>
  .container {
    box-sizing: border-box;
    background-color: #F7F8FA;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-wrapper {
    height: 100%;
    padding: 0 10px;
    overflow: scroll;
  }

  .delete-button {
    height: 100%;
  }

  .van-submit-bar {
    position: absolute;
  }

</style>