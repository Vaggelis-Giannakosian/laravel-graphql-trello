<template>
    <div>

        <div v-if="!isEditing"
             class="group bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between">
            <div class="" v-text="card.title"></div>
            <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500">
                <div v-if="canUpdate" @click="isEditing=true" class="text-gray-400 pr-2 hover:text-yellow-700">E</div>
                <div v-if="canDelete" @click="deleteCard" class="text-gray-400 hover:text-yellow-700">D</div>
            </div>
        </div>

        <CardEditor v-else class="mb-2" @saved="updateCard" @closed="isEditing=false" label="Update Card"
                    v-model="title"></CardEditor>
    </div>

</template>

<script>
    import CardDelete from "../graphql/CardDelete.gql";
    import CardEditor from "./CardEditor";
    import CardUpdate from './../graphql/CardUpdate.gql'
    import {mapState} from 'vuex';
    import {EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from '../constants'

    export default {
        name: "Card",
        props: ['card'],
        components: {CardEditor},
        data() {
            return {
                isEditing: false,
                title: this.card.title
            }
        },
        computed: mapState({
            userId: state => state.user.id,
            canUpdate() {
                return this.userId === this.card.owner_id
            },
            canDelete() {
                return this.userId === this.card.owner_id
            }
        }),
        methods: {
            deleteCard() {
                this.$apollo.mutate({
                    mutation: CardDelete,
                    variables: {
                        id: this.card.id
                    },
                    update: (store, {data: {cardDelete}}) => {
                        this.$emit("deleted", {
                            store,
                            data: cardDelete,
                            type: EVENT_CARD_DELETED,
                        })
                    }
                }).catch(err=>{})
            },
            updateCard() {
                this.$apollo.mutate({
                    mutation: CardUpdate,
                    variables: {
                        id: this.card.id,
                        title: this.title
                    },
                    update: (store, {data: {cardUpdate}}) => {
                        this.$emit("updated", {
                            store,
                            data: cardUpdate,
                            type: EVENT_CARD_UPDATED,
                        })

                        this.isEditing = false
                    }
                }).catch(err=>{})
            }
        }
    }
</script>
