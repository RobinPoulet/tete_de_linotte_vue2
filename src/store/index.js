import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'vue-universal-cookies'
import Category from '../../services/CategoryService'
import Product from '../../services/ProductService'
import User from '../../services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    loading: true,
    isVisible: false,
    modalMode: 'Login',
    status: '',
    authenticated: false,
    errors: [],
    apiStat: '',
    apiErrors: {},
  },
  getters: {
    getAllProducts: (state) => state.products,
    getAllCategories: (state) => state.categories,
    isLoading: (state) => state.loading,
    isVisible: (state) => state.isVisible,
    getMode: (state) => state.modalMode,
    isAuthenticated: (state) => state.authenticated,
    authStatus: (state) => state.status,
    apiStatus: (state) => state.apiStat,
    getApiErrors: (state) => state.apiErrors,
    getErrors: (state) => state.errors,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    show: (state) => {
      state.isVisible = true
    },
    hide: (state) => {
        state.isVisible = false
        state.modalMode = 'Login'
    },
    changemode: (state, mode) => {
        state.modalMode = mode
    },
    authRequest: (state) => {
      state.status        = 'loading';
      state.authenticated = false;
      state.errors        = [];
    },
    authSuccess: (state) => {
        state.status        = 'success';
        state.authenticated = true;
        state.errors        = [];
    },
    authError: (state, errors) => {
        state.status        = 'error';
        state.authenticated = false;
        state.errors        = errors;
    },
    SET_API_STATUS: (state, status) => {
      state.apiStat = status;
    },
    SET_API_ERRORS: (state, errors) => {
        state.apiErrors = errors;
    },
    logout: (state) => {
        state.status        = '';
        state.authenticated = false;
        state.errors        = [];
        const cookies       = new Cookies();
        cookies.remove('token_mysite');
    },
    reset: (state) => {
        state.status = '';
        state.errors =  [];
    },
  },
  actions: {
    getAllProducts({commit}) {
      Product.getAll()
        .then(response => {
          commit('SET_PRODUCTS', response.data.products);
          commit('SET_LOADING', false);
          commit('SET_API_STATUS', "success");
        })
        .catch(err => {
          commit('SET_API_STATUS', "error")
          commit('SET_API_ERRORS', {apiCall: 'getAllProducts', name: err.name, message: err.message});
        });
    },
    getAllCategories({commit}) {
      Category.getAll()
        .then(response => {
          commit('SET_CATEGORIES', response.categories);
          commit('SET_LOADING', false);
          commit('SET_API_STATUS', "success")
        })
        .catch(err => {
          commit('SET_API_STATUS', "error")
          commit('SET_API_ERRORS', {apiCall: 'getAllCategories', name: err.name, message: err.message});
        });
    },
    show: ({ commit }) => {
      return new Promise((resolve) => {
          commit('show')
          resolve()
      })
    },
    hide: ({ commit }) => {
        return new Promise((resolve) => {
            commit('hide')
            resolve()
        })
    },
    changeMode: ({ commit }, mode) => {
        return new Promise((resolve) => {
            commit('changemode', mode)
            resolve()
        })
    },
    signup: ({ commit }, user) => {
      let errs = [];
      commit('authRequest');
      if (user.email.length === 0) {
          errs.push('email_required');
      }
      if (user.password.length === 0) {
          errs.push('password_required');
      }
      if (user.password !== user.passwordConfirm) {
          errs.push('passwords_must_be_same');
      }
      if (errs.length > 0) {
          commit('authError', errs);
          return;
      }
      User.signup(user)
        .then(() => {
            commit('authSuccess');
            commit('hide', null, { root: true });
        })
        .catch(err => {
            commit('authError', [err.response.data]);
        });
  },
  login: ({ commit }, user) => {
      let errs = [];
      commit('authRequest');
      if (user.email.length === 0) {
          errs.push('email_required');
      }
      if (user.password.length === 0) {
          errs.push('password_required');
      }
      if (errs.length > 0) {
          commit('authError', errs);
          return;
      }
      User.login(user)
        .then(() => {
            commit('authSuccess');
            commit('hide', null, { root: true });
        })
        .catch(err => {
            commit('authError', [err.response.data]);
        });
    },
    logout: async function({ commit }) {
        commit('logout');
    },
    setAuthenticated: async function({ commit }) {
        commit('authSuccess');
    },
  },
  modules: {
  }
})
