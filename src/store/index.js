import Vue from 'vue'
import Vuex from 'vuex'
import apps from '@/store/models/apps'
import product from '@/store/models/product'
import * as models from '@/store/models-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    [models.APPS]: apps,
    [models.PRODUCT]: product,
  },
  strict: debug
})
