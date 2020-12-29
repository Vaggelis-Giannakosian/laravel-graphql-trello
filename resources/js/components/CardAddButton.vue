<template>
    <div @click="addCard" class="rounded-sm p-2 text-gray-600 cursor-pointer hover:bg-gray-400 hover:text-gray-800 text-sm">
        Add new card
    </div>
</template>

<script>
    import CardAdd from './../graphql/CardAdd.gql'

    export default {
        name: "CardAddButton",
        props: ['listId,ownerId'],
        methods:{
            addCard(){

                this.$apollo.mutate({
                    mutation:CardAdd,
                    variables: {
                        'title':'Added through mutation',
                        'order':3,
                        'listId': 1,
                        'ownerId':1,
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>
