<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold" v-text="list.title"></div>
        </div>

        <card v-for="card in list.cards" :key="card.id" :card="card"></card>


        <CardEditor :list="list" @closed="editing=false" v-if="editing"></CardEditor>
        <CardAddButton @click="editing=true" v-else></CardAddButton>

    </div>
</template>

<script>
    import Card from "./Card";
    import CardAddButton from "./CardAddButton";
    import CardEditor from "./CardEditor";

    export default {
        name: "List",
        props:['list'],
        components:{Card,CardAddButton,CardEditor},
        data(){
            return {
                editing:false
            }
        },
    }
</script>

<style scoped>
    .list{
        width:250px;
        min-width: 250px;
    }
</style>
