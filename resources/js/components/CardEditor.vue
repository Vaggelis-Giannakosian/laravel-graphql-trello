<template>
    <div>
        <textarea name=""
                  class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
                  placeholder="Enter a title for this card"
                  v-model="title"
                  ref="editor"
                  @keyup.esc="close"
                  @keyup.enter.exact="addCard"
        >
        </textarea>

        <div class="flex">
            <button
                class="rounded-sm text-white px-3 py-1 bg-indigo-700 cursor-pointer hover:bg-indigo-600 outline-none"
                @click="addCard"
            >Add Card
            </button>

            <button
                class="py-1 px-3 ml-1 rounded-mg hover:bg-gray-400 cursor-pointer text-gray-500"
                @click="close"
            >Cancel
            </button>

        </div>
    </div>
</template>

<script>
    import CardAdd from './../graphql/CardAdd.gql'
    import {EVENT_CARD_ADDED} from './../constants'

    export default {
        name: "CardEditor",
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
        },
        mounted() {
            this.$refs.editor.focus()
        }
    }
</script>
