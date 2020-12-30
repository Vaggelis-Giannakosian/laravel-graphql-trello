<template>
    <CardEditor @saved="addCard" @closed="close" v-model="title"></CardEditor>
</template>

<script>
    import CardAdd from './../graphql/CardAdd.gql'
    import {EVENT_CARD_ADDED} from '../constants'
    import CardEditor from './CardEditor'

    export default {
        name: "CardAddEditor",
        components:{CardEditor},
        props: ['list'],
        data() {
            return {
                title: null
            }
        },
        methods: {
            addCard() {
                this.$apollo.mutate({
                    mutation: CardAdd,
                    variables: {
                        'title': this.title,
                        'order': this.list.cards.length + 1,
                        'listId': this.list.id,
                        'ownerId': 1,
                    },
                    update: (store, {data: {cardAdd}}) => {
                        this.$emit("added", {
                            store,
                            data: cardAdd,
                            type: EVENT_CARD_ADDED
                        })
                        this.close()
                    }
                })
            },
            close() {
                this.$emit('closed')
            }
        }
    }
</script>
