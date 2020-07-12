<template>
  <div class="container">
    <Toolbar theme="blue">
      <template #title>订单详情</template>
    </Toolbar>
    <div class="order-status">
      {{statusName}}
    </div>
    <div class="page">
      <Title title="收货地址"/>
      <div @click="visibleChooseAddress = true">
        <AddressCard :name="address.name"
                     :address="address.address"
                     :phone="address.phone"/>
      </div>
      <Title title="订单信息"/>
      <div class="order-card">
        <ProductCard v-for="item in list"
                     :num="item.productQuantity"
                     :thumb="item.productPic || '404'"
                     :title="item.productName"
                     :spec="item.spec"
                     :price="formatMoney(item.productPrice)"
                     v-bind:key="item.id">
          <template #footer v-if="isCompleted() || isShipped()">
            <Button v-if="item.refundStatusName == null"
                    :to="getRefundApplyUrl(item.id)"
                    round size="small">申请售后
            </Button>
            <span class="refund-status" v-else>退款状态: {{item.refundStatusName}}</span>
          </template>
        </ProductCard>
        <div class="money-bar">
          <div v-for="item in chargeMap" v-bind:key="item.title" class="small-row"><span>{{item.title}}</span><span><Money
            unit="¥" :text="formatMoney(item.value, 0)"/></span></div>
          <div v-for="item in discountMap" v-bind:key="item.title" class="small-row"><span>{{item.title}}</span><span><Money
            unit="-¥" :text="formatMoney(item.value, 0)"/></span></div>
          <div class="big-row"><span>实付款</span><span><Money
            unit="¥" :text="formatMoney(payAmount, 0)"/></span></div>
        </div>
      </div>
      <Collapse class="order-info-container" v-model="active" accordion>
        <CollapseItem title="订单信息" name="info">
          <div class="info-row" v-for="item in orderMap" v-bind:key="item.title">
            <span>{{item.title}}</span>
            <span>{{item.value}}</span>
          </div>
        </CollapseItem>
      </Collapse>
      <div class="toolbar">
        <div class="btn-group" v-if="isPendingPayment()">
          <Button :to="getPaymentUrl(tradeSn)" round size="small">去支付</Button>
          <Button round @click="onClickCancelOrder" size="small">取消订单</Button>
        </div>
        <div class="btn-group" v-else-if="isToBeDelivered()">
          <Button round size="small">联系客服</Button>
          <Button round @click="onClickCancelOrder" size="small">取消订单</Button>
        </div>
        <div class="btn-group" v-else-if="isShipped()">
          <Button round size="small">查看物流</Button>
          <Button round @click="onClickConfirmOrder" size="small">确认收货</Button>
        </div>
        <div class="btn-group" v-else-if="isCompleted()">
          <Button round size="small">评价</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import ProductCard from '@/components/ProductCard2'
  import Title from '@/components/Title'
  import AddressCard from '@/components/AddressCard'
  import {mapActions} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import {Util} from "@/utils/util";
  import {Button, Collapse, CollapseItem, Dialog, Toast} from 'vant';
  import Money from '@/components/Money'
  import {OrderTabs, Urls} from "@/utils/constant/global";

  export default {
    components: {Toolbar, Money, Button, AddressCard, Title, ProductCard, Collapse, CollapseItem},
    data() {
      return {
        id: null,
        address: {},
        list: [],
        discountMap: [],
        chargeMap: [],
        orderMap: [],
        active: 'info',
        payAmount: null,
        orderSn: null,
        tradeSn: null,
        statusName: null,
        status: null,
      }
    },
    mounted() {
      let {id} = this.$route.params;
      this.id = id;
      this._getMyOrder(id);
    },
    computed: {},
    watch: {},
    methods: {
      ...mapActions(models.ME, {
        getMyOrder: actions.GET_MY_ORDER,
        cancelMyOrder: actions.CANCEL_MY_ORDER,
        confirmMyOrder: actions.CONFIRM_MY_ORDER,
      }),
      formatMoney: Util.money,
      formatTimestamp: Util.timestampAs,
      onSubmit(values) {
        console.log('登录', values);
      },
      onClickCancelOrder() {
        Dialog.confirm({
          title: '确认操作',
          message: '是否取消订单?',
        }).then(() => {
          this._cancelMyOrder(this.id);
        }).catch(() => {
        });
      },
      onClickConfirmOrder() {
        Dialog.confirm({
          title: '确认操作',
          message: '是否确认收货?',
        }).then(() => {
          this._confirmMyOrder(this.id);
        }).catch(() => {
        });
      },
      getPaymentUrl(tradeSn) {
        return Urls.getPaymentPage(tradeSn);
      },
      getRefundApplyUrl(itemId) {
        return Urls.getRefundApplyPage(itemId);
      },
      isPendingPayment() {
        return this.status === OrderTabs.PendingPayment.value;
      },
      isToBeDelivered() {
        return this.status === OrderTabs.ToBeDelivered.value;
      },
      isShipped() {
        return this.status === OrderTabs.Shipped.value;
      },
      isCompleted() {
        return this.status === OrderTabs.Completed.value;
      },
      _cancelMyOrder(id) {
        let callback = () => {
          Toast.success("取消成功");
          this._getMyOrder(id);
        };
        this.cancelMyOrder({payload: {id: id}, callback})
      },
      _confirmMyOrder(id) {
        let callback = () => {
          Toast.success("确认收货成功");
          this._getMyOrder(id);
        };
        this.confirmMyOrder({payload: {id: id}, callback})
      },
      _getMyOrder(id) {
        let callback = ({data}) => {
          this.payAmount = data.payAmount;
          this.orderSn = data.orderSn;
          this.tradeSn = data.tradeSn;
          this.statusName = data.orderStatusName;
          this.status = data.orderStatus;
          this.address = {
            name: data.receiverName,
            phone: data.receiverPhone,
            address: `${data.receiverProvince} ${data.receiverCity} ${data.receiverRegion} ${data.receiverDetailAddress}`,
          };
          this.list = (data.orderItems || []);
          this.discountMap = [{
            title: '活动优惠金额',
            value: data.discountAmount,
          }, {
            title: '卖家优惠',
            value: data.adjustmentDiscountAmount,
          }];

          this.chargeMap = [{
            title: '商品总价',
            value: data.totalAmount,
          }];

          this.orderMap = [{
            title: '订单编号',
            value: data.orderSn,
          }, {
            title: '交易单号',
            value: data.tradeSn,
          }, {
            title: '创建时间',
            value: this.formatTimestamp(data.createdAt),
          }, {
            title: '支付时间',
            value: this.formatTimestamp(data.paymentTime),
          }];
        };
        this.getMyOrder({payload: {id}, callback: callback});
      }
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    box-sizing: border-box;
    background-color: @backgroundColor;
    min-height: 100%;
    padding-bottom: 50px;

    .page {
      padding: 0 10px;
    }

    .toolbar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      padding-right: 10px;
      border-top: solid @backgroundColor 1px;

      .btn-group > button {
        margin: 0 2px;
      }
    }
  }

  .order-status {
    background-color: @themeColor;
    color: #fff;
    height: 80px;
    padding: 20px 0 0 20px;
  }

  .order-card {
    background-color: #fff;

    .money-bar {
      padding: 12px 10px 18px 10px;
      display: flex;
      flex-direction: column;
      font-size: 12px;

      .small-row {
        display: flex;
        justify-content: space-between;
        color: #646566;
      }

      .big-row {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        padding-top: 10px;
      }
    }
  }

  .order-info-container {
    margin-top: 10px;

    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
  }

  .refund-status {
    color: #C69470;
  }
</style>