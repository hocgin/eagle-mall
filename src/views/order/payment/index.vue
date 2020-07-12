<template>
  <div class="container">
    <Toolbar>
      <template #title>支付订单</template>
    </Toolbar>
    <div class="payment-card">
      <div style="color: #ABACAD; font-size: 14px">需付款</div>
      <div class="payment-title">¥<span style="font-size: 28px;">{{formatMoney(totalFee)}}</span></div>
      <div>
        <CountDown :time="time" millisecond format="HH:mm:ss:SS">
          <template v-slot="timeData">
            <span class="wait-text">剩余支付时间</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.milliseconds }}</span>
          </template>
        </CountDown>
      </div>
      <div style="margin: 16px;">
        <Button type="info" block @click="onSubmit">支付订单</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import {mapActions} from "vuex";
  import {Button, CountDown} from 'vant';
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import {Util} from "@/utils/util";
  import {PaymentWay} from "@/utils/constant/global";

  export default {
    components: {CountDown, Toolbar, Button},
    data() {
      return {
        paymentWay: PaymentWay.AliPayWAP.value,
        tradeSn: null,
        time: null,
        totalFee: null,
        createdAt: null,
        expireAt: null
      }
    },
    mounted() {
      let {tradeSn} = this.$route.query;
      this.tradeSn = tradeSn;
      let callback = ({data: {totalFee, createdAt, expireAt}}) => {
        this.totalFee = totalFee * 100;
        this.createdAt = createdAt;
        this.expireAt = expireAt;
        this.time = expireAt ? (expireAt - createdAt) : null;
      };
      this.getWaitPaymentOrder({
        payload: {tradeSn: tradeSn}, callback
      });
    },
    methods: {
      ...mapActions(models.ME, {
        getWaitPaymentOrder: actions.GET_WAIT_PAYMENT_TRADE,
        payTrade: actions.PAY_TRADE
      }),
      formatMoney: Util.money,
      onSubmit() {
        let callback = ({data:{paymentWay, form}}) => {
          if (paymentWay === PaymentWay.AliPayWAP.value) {
            document.write(form);
          }

        };
        this.payTrade({
          payload: {
            tradeSn: this.tradeSn,
            paymentWay: this.paymentWay
          },
          callback: callback
        });
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

  .payment-card {
    margin-top: 10px;
    text-align: center;
    padding: 30px 10px;
    border-radius: 15px;
    background-color: #fff;
  }

  .payment-title {
    font-size: 14px;
    margin: 6px 0 10px;
  }

  .wait-text {
    margin-right: 5px;
  }

  .colon {
    display: inline-block;
    margin: 0 4px;
  }

  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #000;
    border-radius: 3px;
  }

</style>