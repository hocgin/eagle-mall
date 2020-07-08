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
      <CouponCell @click="visibleCoupon = true"/>
      <SubmitBar :disabled="totalAmount === null"
                 @submit="onSubmit"
                 :price="totalAmount" button-text="提交订单" native-type="submit"/>
    </div>
    <Popup v-model="visibleCoupon"
           round
           position="bottom"
           style="height: 90%; padding-top: 4px;">
      <CouponList :show-close-button="false"
                  :show-exchange-bar="false"/>
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
        selectedAddressId: null,
        address: null,
        list: [],
        totalAmount: null,
        visibleCoupon: false,
        visibleChooseAddress: false,
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
      let {items} = this.$route.query;
      this.items = JSON.parse(items);
      this._calcOrder(this.items);
    },
    watch: {
      address({id}) {
        this.selectedAddressId = id;
      }
    },
    methods: {
      ...mapActions(models.APPS, {
        calcOrder: actions.CALC_ORDER
      }),
      ...mapActions(models.ME, {
        createMyOrder: actions.CREATE_ORDER,
        pagingMyAddress: actions.PAGING_MY_ADDRESS
      }),
      formatMoney: Util.money,
      onClickAddAddress() {
        Goto.addAddress();
      },
      onClickEditAddress({id}) {
        Goto.editAddress(id);
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
          },
          callback: ({data}) => {
            Goto.payOrder(data);
          }
        });
      },
      _getAddressList() {
        this.pagingMyAddress({payload: {page: 1, size: 10000}});
      },
      _calcOrder(values = []) {
        if (values.length === 0) {
          this.totalAmount = null;
          return;
        }

        let callback = ({data}) => {
          this.list = (data?.items || []);
          this.totalAmount = (data?.totalAmount * 100);
          if (this.address === null) {
            let defaultAddress = data.defaultAddress;
            this.address = defaultAddress ? {
              id: defaultAddress.id,
              name: defaultAddress.name,
              phone: defaultAddress.phone,
              address: `${defaultAddress.province} ${defaultAddress.city} ${defaultAddress.region} ${defaultAddress.detailAddress}`,
            } : null;
          }

        };

        this.calcOrder({
          payload: {
            items: values,
          },
          callback
        });
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