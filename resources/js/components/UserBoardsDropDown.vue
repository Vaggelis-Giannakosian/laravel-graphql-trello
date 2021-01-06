<template>
    <div>
        <button @click="showBoards=!showBoards" class="header-btn">Boards</button>

        <DropDownMenu :show="showBoards" v-if="!$apollo.loading" @closed="hideDropDown">
            <router-link v-for="board in userBoards"
                         :key="board.id"
                         :to="{name:'board',  params: { id: board.id }}"
                         :class="bgColor100(board.color)"
                         class="rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex mb-1"
                         @click.native="hideDropDown()"
            >
                <div class="w-10 rounded-sm rounded-r-none" :class="bgColor200(board.color)"></div>
                <div class="p-2" v-text="board.title"></div>
                <span @click.stop.prevent="deleteBoard(board)" class="px-3 p-1 cursor-pointer leading-none text-xl font-bold hover:opacity-50 ml-auto">&times;</span>
            </router-link>

            <div @click="showModal=true" class="rounded-sm hover:bg-gray-200 p-2 underline cursor-pointer mt-2">Create new board...</div>


            <BoardAddModal :show="showModal"
                           @closed="showModal=false"
            ></BoardAddModal>

        </DropDownMenu>
    </div>
</template>

<script>
    import DropDownMenu from "./DropDownMenu";
    import {mapState} from 'vuex'
    import UserBoards from '../graphql/UserBoards.gql'
    import {colorMap100,colorMap200} from '../utils'
    import BoardAddModal from "./BoardAddModal";
    import BoardDelete from './../graphql/BoardDelete.gql'
    import BoardQuery from "../graphql/BoardWithListsAndCards.gql";

    export default {
        name: "UserBoardsDropDown",
        components:{DropDownMenu,BoardAddModal},
        data(){
            return {
                showBoards:false,
                showModal:false
            }
        },
        computed:mapState({
           userId: state => state.user.id
        }),
        methods:{
            bgColor200(color){
                return {
                    [colorMap200[color]]:true
                }
            },
            bgColor100(color){
                return {
                    [colorMap100[color]]:true
                }
            },
            hideDropDown(){
                this.showBoards = false;
            },
            deleteBoard(board){
                if(!confirm(`Are you sure you want to delete board "${board?.title}" Everything will be deleted...`)) return;

                this.$apollo.mutate({
                    mutation: BoardDelete,
                    variables:{
                        id: board.id
                    },
                    update:(store,{data:{boardDelete}})=>{
                        const data = store.readQuery({
                            query:UserBoards,
                            variables:{owner:this.userId}
                        })

                        const boardIndex = data.userBoards.findIndex(board=>board.id === boardDelete.id);
                        data.userBoards.splice(boardIndex,1)

                        store.writeQuery({
                            query: UserBoards,
                            variables:{owner:this.userId},
                            data
                        })
                    }
                })
            }
        },
        apollo:{
            userBoards:{
                query:UserBoards,
                variables(){
                    return {
                        owner:this.userId
                    }
                },
                skip(){
                    return ! this.userId;
                }
            }
        }
    }
</script>

<style scoped>

</style>
