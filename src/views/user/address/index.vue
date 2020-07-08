<template>
  <div class="container">
    <Toolbar>
      <template #title>我的收货地址</template>
    </Toolbar>
    <div class="page">
      <AddressList :list="addressList"
                   @add="onClickAddAddress"
                   @edit="onClickEditAddress"
                   default-tag-text="默认"
                   :switchable="false"/>
    </div>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import {AddressList} from 'vant';
  import Goto from "@/utils/Goto";
  import {mapActions, mapState} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";

  export default {
    components: {AddressList, Toolbar},
    data() {
      return {}
    },
    mounted() {
      this._getAddressList();
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
    watch: {},
    methods: {
      ...mapActions(models.ME, {
        pagingMyAddress: actions.PAGING_MY_ADDRESS
      }),
      _getAddressList() {
        this.pagingMyAddress({payload: {page: 1, size: 10000}});
      },
      onClickAddAddress() {
        Goto.addAddress();
      },
      onClickEditAddress({id}) {
        Goto.editAddress(id);
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

  .page {
    flex: 1 1;
  }
</style>