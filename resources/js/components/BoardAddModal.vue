<template>
    <Modal :show="show"
           :width="400"
           :height="250"
           @closed="$emit('closed')"
    >

        <div class="flex">
            <div class="rounded-sm p-4 text-black w-full mr-2" :class="[colors[color]]">
                <input type="text"
                       v-model="title"
                       class="title rounded-sm text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-100"
                       placeholder="Add board title">
            </div>

            <div>
                <div :class="{'mb-2': i !== colorGrid.length -1 }" class="flex justify-between" v-for="(row,i) in colorGrid" :key="i">
                    <BoardColor v-for="(gridColor,j) in row"
                                :key="j"
                                :color="gridColor"
                                :activeColor="color"
                                @changed="color = $event"
                    ></BoardColor>
                </div>
            </div>
        </div>

        <div class="mt-4 inline-block">
            <button :disabled="!title.trim()"
                    class="rounded-sm py-2 px-4 text-black cursor-pointer text-white hover:opacity-75 disabled:opacity-25"
                    :class="[colors[color]]"
                    @click="createBoard"
            >Create</button>
        </div>

    </Modal>
</template>

<script>
    import Modal from './Modal'
    import BoardColor from "./BoardColor";
    import {colorGrid, colorMap500} from "../utils";
    import BoardAdd from './../graphql/BoardAdd.gql'
    import UserBoards from './../graphql/UserBoards.gql'
    import {mapState} from 'vuex';
    import {EVENT_BOARD_ADDED} from "../constants";

    export default {
        name: "BoardAddModal",
        components: {Modal, BoardColor},
        props: {
            show: Boolean
        },
        data(){
            return {
                color: "orange",
                title: ''
            }
        },
        computed: {
            colors: () => colorMap500,
            colorGrid: () => colorGrid,
            ...mapState({
                userId: state => state.user.id
            })
        },
        methods:{
            createBoard(){
                this.$apollo.mutate({
                    mutation:BoardAdd,
                    variables:{
                        title:this.title,
                        color:this.color
                    },
                    update: (store, {data:{boardAdd}})=>{

                        const data = store.readQuery({
                            query: UserBoards,
                            variables:{owner:this.userId}
                        })

                        data.userBoards.push(boardAdd)

                        store.writeQuery({
                            query: UserBoards,
                            variables:{owner:this.userId},
                            data
                        })

                        this.$emit('closed')
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .title {
        background-color: hsla(0, 0%, 100%, 0);
    }

    .title:hover, .title:focus {
        background-color: hsla(0, 0%, 100%, 0.2);
    }
</style>
