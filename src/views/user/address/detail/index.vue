<template>
  <div class="container">
    <Toolbar>
      <template #title>{{title}}</template>
    </Toolbar>
    <AddressEdit :address-info="address"
                 :area-list="areaList"
                 @save="onClickSave"
                 @delete="onClickDelete"
                 show-postal
                 show-delete
                 show-set-default
                 show-search-result/>
  </div>
</template>
<script>
  import Toolbar from '@/components/Toolbar'
  import Goto from "@/utils/Goto";
  import {AddressEdit, Toast} from 'vant';
  import {mapActions, mapState} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";

  export default {
    components: {AddressEdit, Toolbar},
    data() {
      return {
        id: null,
        title: null,
        address: null,
        areaList: {
          province_list: [],
          city_list: [],
          county_list: []
        }
      }
    },
    mounted() {
      let {id = null} = this.$route.params;
      if (id !== null) {
        this.id = id;
        this._getMyAddress(id);
      }
      this.getProvince({payload: {}});
      this.getCity({payload: {}});
      this.getCounty({payload: {}});
    },
    watch: {
      id(id) {
        this.title = (id !== null) ? '编辑收货地址' : '新增收货地址';
      },
      district: {
        handler({province = [], city = [], county = []}) {
          let province_list = {};
          for (let {adCode, title} of province) {
            province_list[Number(adCode)] = title;
          }

          let city_list = {};
          for (let {adCode, title} of city) {
            city_list[Number(adCode)] = title;
          }

          let county_list = {};
          for (let {adCode, title} of county) {
            county_list[Number(adCode)] = title;
          }

          console.log('d', this.areaList);
          this.areaList = {
            province_list: province_list,
            city_list: city_list,
            county_list: county_list,
          };
          console.log(this.areaList);
        },
        deep: true
      }
    },
    computed: {
      ...mapState(models.APPS, {
        district: (state) => state.district,
      }),
    },
    methods: {
      ...mapActions(models.ME, {
        pagingMyAddress: actions.PAGING_MY_ADDRESS,
        getMyAddress: actions.GET_MY_ADDRESS,
        deleteMyAddress: actions.DELETE_MY_ADDRESS,
        addMyAddress: actions.ADD_MY_ADDRESS,
        updateMyAddress: actions.UPDATE_MY_ADDRESS,
      }),
      ...mapActions(models.APPS, {
        getCounty: actions.GET_COUNTY,
        getCity: actions.GET_CITY,
        getProvince: actions.GET_PROVINCE,
      }),
      onClickSave(values) {
        this._save({
          name: values.name,
          phone: values.tel,
          postCode: values.postalCode,
          province: values.province,
          city: values.city,
          region: values.county,
          detailAddress: values.addressDetail,
          isDefault: values.isDefault ? 1 : 0,
          adCode: values.areaCode,
        });

        console.log(values);
      },
      onClickDelete() {
        let callback = () => {
          this.address = null;
          this.id = null;
        };
        this.deleteMyAddress({payload: {id: this.id}, callback: callback});
      },
      _save(values) {
        let id = this.id;
        if (id === null) {
          this.addMyAddress({
            payload: {...values}, callback: () => {
              Toast.success('新增成功');
              Goto.back();
            }
          });
        } else {
          this.updateMyAddress({
            payload: {id, ...values}, callback: () => {
              Toast.success('修改成功');
              Goto.back();
            }
          });
        }
      },
      _getMyAddress(id) {
        let callback = ({data}) => {
          this.address = {
            id: data.id,
            isDefault: data.isDefault === 1,
            postalCode: data.postCode,
            areaCode: data.adCode,
            addressDetail: data.detailAddress,
            county: data.county,
            city: data.city,
            province: data.province,
            tel: data.phone,
            name: data.name,
          };
        };
        this.getMyAddress({payload: {id: id}, callback});
      }
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    background-color: @backgroundColor;
    height: 100%;
  }
</style>