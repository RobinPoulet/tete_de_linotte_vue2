import Category from '../../services/CategoryService'

const state = {
    categories: [],
    categoryLoading: true,
    categoryApiStat: '',
    categoryApiErrors: {},
}

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    },
    SET_LOADING(state, loading) {
    state.categoryLoading = loading
    },
    SET_API_STATUS: (state, status) => {
    state.categoryApiStat = status;
    },
    SET_API_ERRORS: (state, errors) => {
        state.categoryApiErrors = errors;
    }
}  

const actions = {
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
      }
}

const getters = {
    getAllCategories: state => state.categories,
    isCategoryLoading: state => state.categoryLoading,
    getCategoryApiStatus: state => state.categoryApiStat,
    getCategoryApiErrors: state => state.categoryApiErrors
}

export default {
    state,
    mutations,
    actions,
    getters
}
