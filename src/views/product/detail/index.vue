<template>
  <div class="container">
    <div class="back" @click="onClickBack">
      <Icon name="arrow-left"/>
    </div>
    <!-- SKU 规格-->
    <Sku v-model="visibleSku"
         :sku="sku"
         :goods="goods"
         @buy-clicked="onBuyClicked"
         @add-cart="onAddCartClicked"/>
    <!--图片-->
    <Swipe class="images-wrapper">
      <SwipeItem v-for="item in detail.photos"
                 v-bind:key="item.id">
        <VanImage class="product-images"
                  fit="cover"
                  style="width: 100%;height: 100%"
                  :src="item.url"/>
      </SwipeItem>
      <template #indicator>
        <div class="indicator">
          {{ current + 1 }}/{{detail.photos.length}}
        </div>
      </template>
    </Swipe>
    <!--商品介绍-->
    <CellGroup class="margin-bottom20"
               :border="false">
      <Cell :border="false">
        <template #title>
          <div class="price-row">
            <div v-if="detail.minPrice === detail.maxPrice">
              <Money unit="¥" :text="detail.minPrice"/>
            </div>
            <div v-else>
              <Money unit="¥" :text="detail.minPrice"/>
              -
              <Money unit="¥" :text="detail.maxPrice"/>
            </div>
          </div>
        </template>
      </Cell>
      <Cell :border="false" center :title="detail.title" label="描述信息"></Cell>
    </CellGroup>

    <CellGroup class="margin-bottom20"
               :border="false">
      <Cell :border="false" icon="location-o" title="发货地" :value="detail.procurement"></Cell>
    </CellGroup>

    <CellGroup class="margin-bottom20"
               :border="false">
      <Cell title="选择" is-link value="型号" @click="onClickChooseSku"/>
    </CellGroup>

    <GoodsAction>
      <GoodsActionIcon icon="chat-o" text="客服" @click="onClickLink"/>
      <GoodsActionIcon icon="cart-o" text="购物车" @click="onClickShopCart"/>
      <GoodsActionButton type="warning" text="加入购物车" @click="onClickAddShopChart"/>
      <GoodsActionButton type="danger" text="立即购买" @click="onClickBuy"/>
    </GoodsAction>
  </div>
</template>

<script>
  import {
    Cell,
    CellGroup,
    GoodsAction,
    GoodsActionButton,
    GoodsActionIcon,
    Icon,
    Image as VanImage,
    Sku,
    Swipe,
    SwipeItem
  } from 'vant';
  import Money from '@/components/Money'
  import * as models from '@/store/models-types'
  import {mapActions, mapState} from 'vuex'
  import * as actions from "@/store/actions-types";
  import Goto from "@/utils/Goto";
  import {Util} from "@/utils/util";

  export default {
    components: {
      Icon, Money,
      GoodsAction, GoodsActionIcon, GoodsActionButton,
      VanImage, Swipe, SwipeItem, Cell, CellGroup, Sku,
    },
    data() {
      return {
        current: 0,
        visibleSku: false,
        sku: {},
        goods: {},
      }
    },
    computed: {
      ...mapState(models.PRODUCT, {
        detail: (state) => state.detail
      }),
    },
    mounted() {
      let id = this.$route.params.id;
      this.getProduct({payload: {id}});
    },
    watch: {
      detail: {
        handler({minPrice, mainPhotoUrl, sku = []}) {
          let skuTree = [];
          let skuList = [];

          // 颜色: [红色, 绿色, 蓝色]
          let skuMap = {};
          for (let {id, price, stock, spec = []} of sku) {
            let skuItem = {
              id: id,
              price: price * 100,
              stock_num: stock,
              s1: 0, s2: 0, s3: 0,
            };

            for (let i = 0; i < spec.length; i++) {
              let {key, value} = spec[i];
              skuMap[key] = [...(skuMap[key] || []), value];
              skuItem[`s${i + 1}`] = `${value}`;
            }
            skuList.push(skuItem);
          }

          console.log('skuMap', skuMap);
          let skuMapKeys = Object.keys(skuMap);
          for (let i = 0; i < skuMapKeys.length; i++) {
            let key = skuMapKeys[i];
            skuTree.push({
              k: key,
              k_s: `s${i + 1}`,
              v: [...Util.distinct(skuMap[key] || []).map(value => ({
                id: value,
                name: value
              }))],
            });
          }

          this.sku = {
            tree: skuTree,
            list: skuList,
            none_sku: false,
            hide_stock: false,
            stock_num: 1000,
            price: minPrice * 100,
          };
          console.log('sku', this.sku);
          this.goods = {
            picture: mainPhotoUrl
          };
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(models.PRODUCT, {
        getProduct: actions.GET_PRODUCT,
      }),
      ...mapActions(models.ME, {
        addMyShoppingCart: actions.ADD_MY_SHOPPING_CART,
      }),
      onClickBack() {
        Goto.back();
      },
      onClickChooseSku() {
        this.visibleSku = true;
      },
      // [商品详情]客服
      onClickLink() {
      },
      // [商品详情]购物车
      onClickShopCart() {
        Goto.shoppingCart();
      },
      // [商品详情]立即购买
      onClickBuy() {
        let {sku = []} = this.detail;
        if (sku.length === 1) {
          let {id} = sku[0];
          this._buyGoods(id, 1);
          return;
        }
        this.visibleSku = true;
      },
      // [商品详情]加入购物车
      onClickAddShopChart() {
        let {sku = []} = this.detail;
        if (sku.length === 1) {
          let {id} = sku[0];
          this._addMyShoppingCart(id, 1)
          return;
        }
        this.visibleSku = true;
      },
      // [选择SKU]立即购买
      onBuyClicked({selectedNum, selectedSkuComb: {id}}) {
        this._buyGoods(id, selectedNum);
      },
      // [选择SKU]添加购物车
      onAddCartClicked({selectedNum, selectedSkuComb: {id}}) {
        this._addMyShoppingCart(id, selectedNum);
      },
      _addMyShoppingCart(skuId, quantity) {
        this.addMyShoppingCart({
          payload: {skuId: skuId, quantity: quantity},
          callback: () => {
            this.$notify({type: 'success', message: '添加成功'});
            this.visibleSku = false;
          }
        })
      },
      _buyGoods(skuId, quantity) {
        Goto.confirmOrder([{skuId, quantity}]);
      }
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    background-color: @backgroundColor;
    min-height: 100vh;
    margin-bottom: 30px;

    .back {
      color: #fff;
      position: fixed;
      margin: 10px;
      padding: 8px;
      z-index: 1000;
      border-radius: 50%;
      background-color: rgba(158, 161, 167, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .images-wrapper {
    height: 60vh;
  }

  .margin-bottom20 {
    margin-bottom: 20px;
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

  .price-row {
    color: #DD7156;

    /deep/ .text1 {
      font-weight: 400;
      font-size: 20px;
    }
  }
</style>