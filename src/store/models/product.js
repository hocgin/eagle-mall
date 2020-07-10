import product from '@/services/product'
import * as types from '@/store/mutation-types'
import * as actions from '@/store/actions-types'
import {Toast} from 'vant';

export default {
  namespaced: true,
  state: {
    paging: [],
    detail: {},
  },
  actions: {
    async [actions.PAGING_PRODUCT]({commit}, {payload, callback}) {
      let result = await product.paging(payload);
      if (result.success) {
        commit(types.SET_PRODUCT_PAGING, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_PRODUCT]({commit}, {payload, callback}) {
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