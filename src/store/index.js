import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import products from './products'
import categories from './categories'
import users from './users'
import popup from './popup'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['products', 'categories', 'users'] 
})

export default new Vuex.Store({
  modules: {
    products,
    categories,
    users,
    popup
  },
  plugins: [vuexLocal.plugin]
})
