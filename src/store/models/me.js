import apps from '@/services/apps'

export default {
  namespaced: true,
  state: {
    shoppingCart: [],
  },
  actions: {
    async addShoppingCart({commit}, payload) {
      console.log('请求地址', payload)
      let result = await apps.getAll(payload);
      console.log(commit, result);
      commit('updateData', "sdsdxx")
    }
  },
  mutations: {
    updateData(state, data) {
      state.data = data;
    }
  },
}