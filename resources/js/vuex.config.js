import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
    state: {
        isLogged: false
    },
    mutations: {
        setLogged(state, payload) {
            state.isLogged = Boolean(payload)
        }
    },
    actions: {
        setLogged({commit}, payload) {
            const isLogged = Boolean(payload)
            window.localStorage.setItem("isLogged", isLogged)
            commit('setLogged', isLogged)
        }
    }
};

export default new Vuex.Store(store);



