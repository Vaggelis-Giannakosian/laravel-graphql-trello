<template>
    <div class="h-full flex flex-col items-stretch bg-purple-500">
        <div class="header text-white flex justify-between items-center mb-2 bg-purple-600">
            <div class="ml-2 w-1/3">X</div>
            <div class="text-xl opacity-50 cursor-pointer hover:opacity-75">Graph Trello</div>
            <div class="mr-2 w-1/3 flex justify-end">
                <div v-if="isLogged" class="flex items-center">
                    <div class="text-sm mr-2" v-text="username"></div>
                    <router-link :to="{name:'logout'}" class="header-btn">Logout</router-link>
                </div>
                <div v-else>
                    <router-link :to="{name:'login'}" class="header-btn">Sign In</router-link>
                    <router-link :to="{name:'register'}" class="header-btn">Register</router-link>
                </div>
            </div>
        </div>

        <div class="h-full flex flex-1 flex-col items-stretch">

            <div class="mx-4 mb-2 text-white font-bold text-lg">
                <span v-if="$apollo.queries.board.loading">Loading...</span>
                <span v-else v-text="board.title"></span>
            </div>

            <div v-if="board" class="flex flex-1 items-start overflow-x-auto mx-2">
                <list
                    @card-deleted="updateQueryCache($event)"
                    @card-added="updateQueryCache($event)"
                    @card-updated="updateQueryCache($event)"
                    v-for="list in board.lists"
                    :list="list"
                    :key="list.id"
                ></list>
            </div>

        </div>

    </div>
</template>

<script>
    import List from "../components/List";
    import BoardQuery from '../graphql/BoardWithListsAndCards.gql'
    import {EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "../constants";
    import {mapState} from 'vuex'

    export default {
        components: {List},
        data() {
            return {
                id: 1
            }
        },
        apollo: {
            board: {
                query: BoardQuery,
                variables() {
                    return {
                        id: this.id
                    }
                }
            }
        },
        computed: mapState({
            isLogged: 'isLogged',
            username: state => state.user.name
        }),
        methods: {
            updateQueryCache(event) {
                const data = event.store.readQuery({
                    query: BoardQuery,
                    variables: {
                        id: Number(this.board.id)
                    }
                })

                this.handleDataMutation(data, event);


                event.store.writeQuery({query: BoardQuery, data})
            },
            handleDataMutation(data, event) {
                const list = data.board.lists.find(list => list.id === event.listId)

                switch (event.type) {
                    case EVENT_CARD_ADDED:
                        list.cards.push(event.data)
                        break;
                    case EVENT_CARD_DELETED:
                        list.cards = list.cards.filter(card => card.id !== event.data.id)
                        break;
                    case EVENT_CARD_UPDATED:
                        list.cards.find(card => card.id === event.data.id).title = event.data.title
                        break;

                }
            }
        }
    }
</script>


<style scoped>
    .header {
        height: 40px
    }

</style>
