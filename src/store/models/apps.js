import apps from '@/services/apps'
import * as actions from '@/store/actions-types'
import {Toast} from "vant";
import LocalStorage from "@/utils/LocalStorage";
import Goto from "@/utils/Goto";

export default {
  namespaced: true,
  state: {},
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
  },
  mutations: {},
}