import Product from '../../services/ProductService'

const state = {
    products: [],
    productLoading: true,
    productApiStat: '',
    productApiErrors: {},
}

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_LOADING(state, loading) {
        state.productLoading = loading
    },
    SET_API_STATUS: (state, status) => {
        state.productApiStat = status;
    },
    SET_API_ERRORS: (state, errors) => {
        state.productApiErrors = errors;
    },
}

const actions = {
    getAllProducts({commit}) {
        Product.getAll()
          .then(response => {
            commit('SET_PRODUCTS', response.products);
            commit('SET_LOADING', false);
            commit('SET_API_STATUS', "success");
          })
          .catch(err => {
            commit('SET_API_STATUS', "error")
            commit('SET_API_ERRORS', {apiCall: 'getAllProducts', name: err.name, message: err.message});
          });
      },
}

const getters = {
    getAllProducts: state => state.products,
    getProductApiStatus: state => state.productApiStat,
    getProductApiErrors: state => state.productApiErrors,
    isProductLoading: state => state.productLoading,
}

export default {
    state,
    mutations,
    actions,
    getters
}