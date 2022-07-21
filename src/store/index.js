import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    loading: true,
  },
  getters: {
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    getProducts({commit}) {
      axios
      .get("http://localhost:9000/api/product")
      .then(response => {
        commit('SET_PRODUCTS', response.data.products)
        commit('SET_LOADING', false)
      })
      .catch(e => console.log(e))
    }
  },
  modules: {
  }
})
