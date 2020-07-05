import shoppingCart from '@/services/my/shoppingCart'
import order from '@/services/my/order'
import trade from '@/services/my/trade'
import * as types from "@/store/mutation-types";
import * as actions from '@/store/actions-types'
import {Toast} from "vant";

export default {
  namespaced: true,
  state: {
    shoppingCartPaging: {},
  },
  actions: {
    async [actions.ADD_MY_SHOPPING_CART](_, {payload, callback}) {
      let result = await shoppingCart.addMyShoppingCart(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.UPDATE_MY_SHOPPING_CART](_, {payload, callback}) {
      let result = await shoppingCart.updateMyShoppingCart(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.DELETE_MY_SHOPPING_CART](_, {payload, callback}) {
      let result = await shoppingCart.deleteMyShoppingCart(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAGING_MY_SHOPPING_CART]({commit}, {payload = {}, callback}) {
      let result = await shoppingCart.pagingMyShoppingCart(payload);
      if (result.success) {
        commit(types.SET_SHOPPING_CART_PAGING, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CREATE_ORDER](_, {payload, callback}) {
      let result = await order.createMyOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_WAIT_PAYMENT_TRADE](_, {payload, callback}) {
      let result = await trade.getWaitPaymentOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAY_TRADE](_, {payload, callback}) {
      let result = await trade.payTrade(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
  },
  mutations: {
    [types.SET_SHOPPING_CART_PAGING](state, data) {
      state.shoppingCartPaging = data;
    }
  },
}