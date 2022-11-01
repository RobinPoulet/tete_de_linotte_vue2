import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'vue-universal-cookies'

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
    addElement: {isAddElement : "none", elementAdd: {}}
  },
  getters: {
    getAllProducts: (state) => state.products,
    getAllCategories: (state) => state.categories,
    isLoading: (state) => state.loading,
    isVisible: (state) => state.isVisible,
    getMode: (state) => state.modalMode,
    isAuthenticated: (state) => state.authenticated,
    authStatus: (state) => state.status,
    getErrors: (state) => state.errors,
    isAddElement: (state) => state.addElement,
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
    addElementSuccess: (state, element) => {
      state.addElement = {isAddElement: "success", elementAdd: element};
    },
    resetAddElement: (state) => {
      state.addElement = {isAddElement: "none", elementAdd: {}};
    }
  },
  actions: {
    getProducts({commit}) {
      axios
      .get("https://api-tdl-backend.herokuapp.com/api/product")
      .then(response => {
        commit('SET_PRODUCTS', response.data.products);
        commit('SET_LOADING', false);
      })
      .catch(e => console.log(e))
    },
    getCategories({commit}) {
      axios
      .get("https://api-tdl-backend.herokuapp.com/api/category")
      .then(response => {
        commit('SET_CATEGORIES', response.data.categories);
        commit('SET_LOADING', false);
      })
      .catch(e => console.log(e))
    },
    nuxtServerInit({ dispatch }, { req }) {
      const cookies = new Cookies(req.headers.cookie);
      if (cookies.get('token_mysite')) {
          dispatch('setAuthenticated');
      }
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
    signup: async function ({ commit }, user) {
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
      await axios
      .post("https://api-tdl-backend.herokuapp.com/api/auth/signup", user)
      .then(() => {
          commit('authSuccess');
          commit('hide', null, { root: true });
      })
      .catch(err => {
          commit('authError', [err.response.data]);
      });
  },
  login: async function({ commit }, user) {
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
      await axios
      .post("https://api-tdl-backend.herokuapp.com/api/auth/login", user)
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
    addCategory({ commit }, category) {
      axios.post("https://api-tdl-backend.herokuapp.com/api/category", category)
      .then(() => {
        commit('addElementSuccess', { type: 'category', name: category.name})
        this.dispatch("getCategories")
      })
      .catch(e => {
        console.log('requete post echoué', category)
        console.log(e)
      })
    },
    resetAddElement({ commit }) {
      commit('resetAddElement')
    }
  },
  modules: {
  }
})
