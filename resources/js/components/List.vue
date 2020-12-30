<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold" v-text="list.title"></div>
        </div>

        <card @deleted="$emit('card-deleted',{...$event,listId:list.id})"
              @updated="$emit('card-updated',{...$event,listId:list.id})"
              v-for="card in list.cards"
              :key="card.id"
              :card="card"></card>


        <CardAddEditor  :list="list" @closed="editing=false"
                        @added="$emit('card-added',{...$event, listId:list.id})"
                        v-if="editing"></CardAddEditor>


        <CardAddButton @click="editing=true" v-else></CardAddButton>

    </div>
</template>

<script>
    import Card from "./Card";
    import CardAddButton from "./CardAddButton";
    import CardAddEditor from "./CardAddEditor";

    export default {
        name: "List",
        props:['list'],
        components:{Card,CardAddButton,CardAddEditor},
        data(){
            return {
                editing:false
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
