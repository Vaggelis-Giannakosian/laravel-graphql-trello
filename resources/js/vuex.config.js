import Vue from 'vue'
import Vuex from 'vuex'
import apollo from './apollo.config'
import Me from './graphql/Me.gql'

Vue.use(Vuex)

function nullUser(){
    return {
        id: null,
        name: null,
        email: null
    };
}

const store = {
    state: {
        isLogged: false,
        user: nullUser()
    },
    mutations: {
        setLogged(state, payload) {
            state.isLogged = Boolean(payload)
        },
        setUser(state,payload){
            state.user = payload
        }
    },
    actions: {
        setLogged({commit}, payload) {
            const isLogged = Boolean(payload)
            window.localStorage.setItem("isLogged", isLogged)
            commit('setLogged', isLogged)
        },
        async fetchCurrentUser({commit, dispatch}) {
            const result = await apollo.defaultClient.query({
                query:Me,
                fetchPolicy: 'no-cache',
            })

            const user = result.data?.me ? result.data.me : nullUser();

            commit("setUser",user)
            dispatch("setLogged",!!user.id)
        }
    }
};

export default new Vuex.Store(store);



