import Vue from 'vue'
import Vuex from 'vuex'

import products from './products'
import categories from './categories'
import users from './users'
import popup from './popup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    categories,
    users,
    popup
  }
})
