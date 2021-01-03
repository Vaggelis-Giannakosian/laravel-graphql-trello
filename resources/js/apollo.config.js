import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import store from './vuex.config'
import {normalizeGQLErrors, AuthenticationError} from "./utils";

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    uri: 'http://graphtrello.test/graphql',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    credentials: 'include',
    onError: (err) => {
        try {
            normalizeGQLErrors(err)
        } catch (err) {
            if (err instanceof AuthenticationError) {
                store.dispatch('logout');
            }
        }
    }
})

export default new VueApollo({
    defaultClient: apolloClient,
})
