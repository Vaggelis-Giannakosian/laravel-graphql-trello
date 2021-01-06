<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold" v-text="list.title"></div>
            <span @click="deleteList" class="px-3 pb-2 cursor-pointer leading-none text-xl font-bold hover:opacity-50 ">&times;</span>
        </div>

        <card @deleted="$emit('card-deleted',{...$event,listId:list.id})"
              @updated="$emit('card-updated',{...$event,listId:list.id})"
              v-for="card in list.cards"
              :key="card.id"
              :card="card"></card>


        <CardAddEditor  :list="list" @closed="editing=false"
                        @added="$emit('card-added',{...$event, listId:list.id})"
                        v-if="editing"></CardAddEditor>


        <CardAddButton v-if="canAddCard" @click="editing=true"></CardAddButton>

    </div>
</template>

<script>
    import Card from "./Card";
    import CardAddButton from "./CardAddButton";
    import CardAddEditor from "./CardAddEditor";
    import {mapState} from 'vuex'
    import ListDelete from './../graphql/ListDelete.gql'
    import {EVENT_LIST_DELETED} from "../constants";

    export default {
        name: "List",
        props:['list'],
        components:{Card,CardAddButton,CardAddEditor},
        data(){
            return {
                editing:false
            }
        },
        computed:{
            canAddCard(){
                return !this.editing && this.user.id === this.list.board.owner_id
            },
            ...mapState({
                user: 'user'
            }),
        },
        methods:{
            deleteList(){
                if(confirm('Are you sure? Everything will be deleted...'))
                {
                    this.$apollo.mutate({
                        mutation:ListDelete,
                        variables:{
                            id:this.list.id
                        },
                        update:(store, {data:{listDelete}})=>{
                            this.$emit('list-deleted',{
                                store,
                                data:listDelete,
                                type:EVENT_LIST_DELETED
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .list{
        width:250px;
        min-width: 250px;
    }
</style>
