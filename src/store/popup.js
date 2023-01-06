const state = {
    isVisible: false,
    modalMode: 'Login'
}

const mutations = {
    show: (state) => {
        state.isVisible = true
    },
    hide: (state) => {
        state.isVisible = false
        state.modalMode = 'Login'
    },
    changemode: (state, mode) => {
        state.modalMode = mode
    }
}

const actions = {
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
    }
}

const getters = {
    isVisible: (state) => state.isVisible,
    getMode: (state) => state.modalMode
}

export default {
    state,
    mutations,
    actions,
    getters
}