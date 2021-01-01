import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
    state: {
        isLogged:false
    },
    mutations:{
        setLogged(state,payload){
            state.isLogged = Boolean(payload)
        }
    },
    actions:{}
};

export default new Vuex.Store(store);



