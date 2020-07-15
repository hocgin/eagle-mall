<template>
  <div class="container">
    <Toolbar>
      <template #title>确认订单</template>
    </Toolbar>
    <div class="confirm-container">
      <Title title="收货地址"/>
      <div @click="visibleChooseAddress = true">
        <AddressCard v-if="address"
                     :name="address.name"
                     :address="address.address"
                     :phone="address.phone"/>
        <ChooseAddressCard v-else/>
      </div>
      <Title title="订单信息"/>
      <ProductCard v-for="item in list"
                   v-bind:checked.sync="item.checked"
                   v-bind:num.sync="item.quantity"
                   :thumb="item.imageUrl || '404'"
                   :title="item.title"
                   :spec="item.spec"
                   :originprice="formatMoney(item.totalAmount)"
                   :price="formatMoney(item.realAmount)"
                   v-bind:key="item.id"/>
      <CouponCell @click="visibleCoupon = true"
                  :chosen-coupon="chosenCoupon"
                  :coupons="coupons"/>
      <SubmitBar :disabled="payAmount === null"
                 @submit="onSubmit"
                 :price="payAmount" button-text="提交订单" native-type="submit"/>
    </div>
    <Popup v-model="visibleCoupon"
           round
           position="bottom"
           style="height: 90%; padding-top: 4px;">
      <CouponList @change="onChangeCoupon"
                  :chosen-coupon="chosenCoupon"
                  :show-exchange-bar="false"
                  :coupons="coupons"
                  :disabled-coupons="disabledCoupons"/>
    </Popup>
    <Popup v-model="visibleChooseAddress"
           round
           position="bottom"
           style="height: 90%; padding-top: 4px;">
      <AddressList v-model="selectedAddressId"
                   :list="addressList"
                   default-tag-text="默认"
                   @add="onClickAddAddress"
                   @edit="onClickEditAddress"
                   @select="onSelectAddress"/>
    </Popup>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import ProductCard from '@/components/ProductCard2'
  import AddressCard from '@/components/AddressCard'
  import ChooseAddressCard from '@/components/ChooseAddressCard'
  import Title from '@/components/Title'
  import {AddressList, CouponCell, CouponList, Popup, SubmitBar} from 'vant';
  import {mapActions, mapState} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";
  import Global from "@/utils/constant/global";
  import {Util} from "@/utils/util";
  import Goto from "@/utils/Goto";

  export default {
    components: {
      Toolbar,
      AddressList,
      ProductCard,
      ChooseAddressCard,
      Title,
      CouponCell,
      CouponList,
      Popup,
      SubmitBar,
      AddressCard
    },
    data() {
      return {
        list: [],
        totalAmount: null,
        payAmount: null,
        // 收货地址
        visibleChooseAddress: false,
        selectedAddressId: null,
        address: null,
        // 优惠券
        selectedCouponId: null,
        chosenCoupon: -1,
        visibleCoupon: false,
        coupons: [],
        disabledCoupons: [],
      }
    },
    computed: {
      ...mapState(models.ME, {
        addressList: (state) => (state.addressPaging?.records ?? []).map((item) => ({
          ...item,
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: `${item.province} ${item.city} ${item.region} ${item.detailAddress}`,
          isDefault: item.isDefault === 1,
        })),
      }),
    },
    mounted() {
      this._getAddressList();
      this.reCalcOrder();
    },
    watch: {
      address({id}) {
        this.selectedAddressId = id;
      },
      chosenCoupon(index) {
        this.selectedCouponId = this.coupons[index]?.id ?? null;
        this.reCalcOrder();
      }
    },
    methods: {
      ...mapActions(models.APPS, {
        calcOrder: actions.CALC_ORDER
      }),
      ...mapActions(models.ME, {
        createMyOrder: actions.CREATE_ORDER,
        pagingMyAddress: actions.PAGING_MY_ADDRESS,
      }),
      formatMoney: Util.money,
      onClickAddAddress() {
        Goto.addAddress();
      },
      onClickEditAddress({id}) {
        Goto.editAddress(id);
      },
      onChangeCoupon(index) {
        this.chosenCoupon = index;
      },
      onSelectAddress(item) {
        this.address = {
          id: item.id,
          name: item.name,
          phone: item.phone,
          address: `${item.province} ${item.city} ${item.region} ${item.detailAddress}`,
        };
        this.visibleChooseAddress = false;
      },
      onSubmit() {
        this.createMyOrder({
          payload: {
            sourceType: Global.ORDER_SOURCE_TYPE,
            items: [...this.items],
            receiver: {
              ...this.address,
            },
            selectedCouponId: this.selectedCouponId,
          },
          callback: ({data}) => {
            Goto.payOrder(data);
          }
        });
      },
      reCalcOrder() {
        let {items} = this.$route.query;
        this.items = JSON.parse(items);
        this._calcOrder(this.items);
      },
      _getAddressList() {
        this.pagingMyAddress({payload: {page: 1, size: 10000}});
      },
      _calcOrder(values = []) {
        if (values.length === 0) {
          this.totalAmount = null;
          return;
        }

        let calcOrderCallback = ({data}) => {
          this.list = (data?.items || []);
          this.totalAmount = (data?.totalAmount * 100);
          this.payAmount = (data?.payAmount * 100);
          if (this.address === null) {
            let defaultAddress = data.defaultAddress;
            this.address = defaultAddress ? {
              id: defaultAddress.id,
              name: defaultAddress.name,
              phone: defaultAddress.phone,
              province: defaultAddress.province,
              city: defaultAddress.city,
              region: defaultAddress.region,
              detailAddress: defaultAddress.detailAddress,
              postCode: defaultAddress.postCode,
              adCode: defaultAddress.adCode,
              address: `${defaultAddress.province} ${defaultAddress.city} ${defaultAddress.region} ${defaultAddress.detailAddress}`,
            } : null;
          }

          let coupons = [];
          let disabledCoupons = [];
          for (let coupon of (data?.coupons || [])) {
            let item = {
              id: coupon.id,
              valueDesc: coupon.valueDesc,
              unitDesc: coupon.unitDesc,
              value: coupon.useAmount != null ? coupon.useAmount * 100 : null,
              startAt: coupon.startAt / 1000,
              endAt: coupon.endAt / 1000,
              condition: `${coupon.condition}`,
              description: `${coupon.instructions || ''}`,
              name: coupon.title,
              reason: coupon.reason,
            };
            if (coupon.usable) {
              coupons.push(item);
            } else {
              disabledCoupons.push(item);
            }
          }
          this.coupons = coupons;
          this.disabledCoupons = disabledCoupons;
        };

        let payload = {items: values, selectedCouponId: this.selectedCouponId};
        this.calcOrder({payload: payload, callback: calcOrderCallback});
      },
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    display: flex;
    flex-direction: column;
    background-color: @backgroundColor;
    height: 100%;
  }

  .confirm-container {
    padding: 0 10px;
    box-sizing: border-box;
    flex: 1 1;
  }
</style>