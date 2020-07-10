<template>
  <div class="container">
    <Toolbar>
      <template #title>我的优惠券</template>
    </Toolbar>
    <div class="page">
      <CouponList :show-exchange-bar="false"
                  :show-close-button="false"
                  :coupons="coupons"
                  :disabled-coupons="disabledCoupons">
      </CouponList>
    </div>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar/index'
  import {CouponList} from 'vant';
  import {mapActions} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";

  export default {
    components: {Toolbar, CouponList},
    data() {
      return {
        page: 0,
        size: 100000,
        coupons: [],
        disabledCoupons: [],
        list: [],
        isRefresh: false,
        isLoading: false,
        isFinished: false,
      }
    },
    mounted() {
      this.onLoad();
    },
    computed: {},
    watch: {
      list(records = []) {
        let coupons = [];
        let disabledCoupons = [];
        for (let {id, title, credit, couponType, minPoint, platformName, useTypeName, createdAt, endAt, instructions, useStatus} of records) {

          let coupon = {
            id,
            valueDesc: `${credit.toFixed(1)}`,
            unitDesc: couponType === 0 ? '元' : '折',
            value: credit,
            startAt: createdAt / 1000,
            endAt: endAt / 1000,
            condition: `${useTypeName}\n${platformName}平台\n满¥${minPoint}可用`,
            description: `${instructions || ''}`,
            name: title
          };

          if (useStatus === 0) {
            coupons.push(coupon);
          } else {
            disabledCoupons.push(coupon);
          }
        }
        this.coupons = coupons;
        this.disabledCoupons = disabledCoupons;
      }
    },
    methods: {
      ...mapActions(models.ME, {
        pagingMyCoupon: actions.PAGING_MY_COUPON,
      }),
      onLoad() {
        this.isLoading = true;
        this._pagingMyCoupon(++this.page, this.size, ({data: {records = []}}) => {
          this.list = [...this.list, ...records];
          if (records.length === 0) {
            this.isFinished = true;
          }
          this.isLoading = false;
        })
      },
      _pagingMyCoupon(page = 1, size = 10, callback) {
        this.pagingMyCoupon({payload: {page, size}, callback});
      },
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: @backgroundColor;
  }

  .page {
    height: 100%;
    flex: 1 1;
  }
</style>