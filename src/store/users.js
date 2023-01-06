import User from '../../services/UserService'
import Cookies from 'vue-universal-cookies'

const state = {
    status: '',
    authenticated: false,
    errors: []
}

const mutations = {
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
      }
}

const actions = {
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
    }
}

const getters = {
    isAuthenticated: state => state.authenticated,
    authStatus: state => state.status,
    getErrors: state => state.errors
}

export default {
    state,
    mutations,
    actions,
    getters
}