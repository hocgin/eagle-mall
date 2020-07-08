<template>
  <div class="order-card">
    <CellGroup>
      <Cell icon="orders-o" :title="orderSn" :value="statusName"/>
      <ProductCard v-for="item in list"
                   v-bind:num.sync="item.productQuantity"
                   :thumb="item.productPic || '404'"
                   :title="item.productName"
                   :spec="item.spec"
                   :price="formatMoney(item.productPrice)"
                   v-bind:key="item.id"/>
      <div class="money-bar">
        <span class="small-money">总价 <Money unit="¥" :text="formatMoney(totalAmount)"/>,</span>
        <span class="small-money" v-if="discountTotalAmount != null">优惠 <Money unit="¥"
                                                                               :text="formatMoney(discountTotalAmount)"/></span>
        <span class="big-money">实付款 <Money unit="¥" :text="formatMoney(payAmount)"/></span>
      </div>
      <div class="toolbar">
        <div class="btn-group" v-if="isPendingPayment()">
          <Button round size="small">去支付</Button>
        </div>
        <div class="btn-group" v-else-if="isToBeDelivered()">
          <Button round size="small">联系客服</Button>
        </div>
        <div class="btn-group" v-else-if="isShipped()">
          <Button round size="small">查看物流</Button>
          <Button round size="small">确认收货</Button>
        </div>
      </div>
    </CellGroup>
  </div>
</template>
<script>
  import ProductCard from '@/components/ProductCard2'
  import Money from '@/components/Money'
  import {Button, Cell, CellGroup} from 'vant';
  import {Util} from "@/utils/util";
  import {OrderTabs} from "@/utils/constant/global";

  export default {
    components: {ProductCard, Cell, CellGroup, Money, Button},
    data() {
      return {}
    },
    props: {
      list: {
        type: Array,
        required: false,
        default: () => []
      },
      statusName: {
        type: String,
        required: false,
        default: ''
      },
      status: {
        type: Number,
        required: false,
        default: null
      },
      orderSn: {
        type: String,
        required: false,
        default: ''
      },
      totalAmount: {
        type: Number,
        required: false,
        default: null
      },
      payAmount: {
        type: Number,
        required: false,
        default: null
      },
      discountTotalAmount: {
        type: Number,
        required: false,
        default: null
      }
    },
    computed: {},
    methods: {
      formatMoney: Util.money,
      isPendingPayment() {
        return this.status === OrderTabs.PendingPayment.value;
      },
      isToBeDelivered() {
        return this.status === OrderTabs.ToBeDelivered.value;
      },
      isShipped() {
        return this.status === OrderTabs.Shipped.value;
      }
    }
  }
</script>
<style scoped lang="less">
  .order-card {
    background-color: #fff;
    margin: 10px;
  }

  .money-bar {
    text-align: right;
    padding: 12px 10px 18px 10px;
    font-size: 15px;

    .small-money {
      color: #A5A6A8;
      margin: 10px 5px;
    }

    .big-money {
      color: #0E1011;
    }
  }

  .toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px 10px 10px;

    .btn-group > button {
      margin: 0 2px;
    }
  }
</style>
