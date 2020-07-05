import product from '@/services/product'
import * as types from '@/store/mutation-types'
import {Toast} from 'vant';

export default {
  namespaced: true,
  state: {
    paging: [],
    detail: {},
  },
  actions: {
    async paging({commit}, {payload, callback}) {
      let result = await product.paging(payload);
      if (result.success) {
        commit(types.SET_PRODUCT_PAGING, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async getProduct({commit}, {payload, callback}) {
      let result = await product.getById(payload);
      if (result.success) {
        commit(types.SET_PRODUCT_DETAIL, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    }
  },
  mutations: {
    [types.SET_PRODUCT_PAGING](state, data) {
      state.paging = data;
    },
    [types.SET_PRODUCT_DETAIL](state, data) {
      state.detail = data;
    }
  },
}