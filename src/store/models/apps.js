import apps from '@/services/apps'
import * as actions from '@/store/actions-types'
import {Toast} from "vant";
import LocalStorage from "@/utils/LocalStorage";
import Goto from "@/utils/Goto";
import * as types from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    district: {
      province: [],
      city: [],
      county: [],
    }
  },
  actions: {
    async [actions.LOGIN](_, {payload, callback}) {
      let result = await apps.login(payload);
      if (result.success) {
        if (callback) callback(result);
        LocalStorage.setToken(result.data);
        Goto.index();
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CALC_ORDER](_, {payload, callback}) {
      let result = await apps.calcOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CALC_ORDER](_, {payload, callback}) {
      let result = await apps.calcOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_PROVINCE]({commit}, {payload, callback}) {
      // if (state.district.province.length > 0) {
      //   return;
      // }
      let result = await apps.getProvince(payload);
      if (result.success) {
        commit(types.SET_PROVINCE, result.data);
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_CITY]({commit}, {payload, callback}) {
      // if (state.district.city.length > 0) {
      //   return;
      // }
      let result = await apps.getCity(payload);
      if (result.success) {
        commit(types.SET_CITY, result.data);
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_COUNTY]({commit}, {payload, callback}) {
      // if (state.district.county.length > 0) {
      //   return;
      // }
      let result = await apps.getCounty(payload);
      if (result.success) {
        commit(types.SET_COUNTY, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
  },
  mutations: {
    [types.SET_PROVINCE](state, data) {
      state.district.province = data;
    },
    [types.SET_CITY](state, data) {
      state.district.city = data;
    },
    [types.SET_COUNTY](state, data) {
      state.district.county = data;
    },
  },
}