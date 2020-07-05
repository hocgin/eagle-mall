<template>
  <div class="container">

    <!-- SKU 规格-->
    <Sku v-model="visibleSku"
         :sku="sku"
         :goods="goods"/>
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
          ¥{{detail.minPrice === detail.maxPrice? `${detail.minPrice}`:`${detail.minPrice}-${detail.maxPrice}`}}
        </template>
      </Cell>
      <Cell :border="false" center
            :title="detail.title" label="描述信息"></Cell>
    </CellGroup>

    <CellGroup class="margin-bottom20"
               :border="false">
      <Cell :border="false" icon="location-o" title="发货地" :value="detail.procurement"></Cell>
    </CellGroup>

    <CellGroup class="margin-bottom20"
               :border="false">
      <Cell title="选择" is-link value="型号"/>
    </CellGroup>

    <GoodsAction>
      <GoodsActionIcon icon="chat-o" text="客服"
                       @click="onClickLink"/>
      <GoodsActionIcon icon="cart-o" text="购物车" @click="onClickShopCart"/>
      <GoodsActionButton type="warning" text="加入购物车" @click="onClickAddShopChart"/>
      <GoodsActionButton type="danger" text="立即购买" @click="onClickAddShopChart"/>
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
    Image as VanImage,
    Sku,
    Swipe,
    SwipeItem
  } from 'vant';
  import * as models from '@/store/models-types'
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {
      GoodsAction, GoodsActionIcon, GoodsActionButton,
      VanImage, Swipe, SwipeItem, Cell, CellGroup, Sku
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

          let skuMapKeys = Object.keys(skuMap);
          for (let i = 0; i < skuMapKeys.length; i++) {
            let key = skuMapKeys[i];
            skuTree.push({
              k: key,
              k_s: `s${i + 1}`,
              v: [...(skuMap[key] || []).map((value) => ({
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
          this.goods = {
            picture: mainPhotoUrl
          };
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(models.PRODUCT, {
        getProduct: 'getProduct',
      }),
      onClickLink() {

      },
      onClickShopCart() {
      },
      onClickAddShopChart() {
        this.visibleSku = true;
      },
      onSubmit(values) {
        console.log('登录', values);
      },
    }
  }
</script>
<style scoped>
  .container {
    background-color: rgba(242, 242, 242, 0.6);
    min-height: 100vh;
    margin-bottom: 30px;
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
</style>