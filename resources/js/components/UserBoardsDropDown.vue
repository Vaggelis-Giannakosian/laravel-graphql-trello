<template>
    <div>
        <button @click="showBoards=!showBoards" class="header-btn">Boards</button>

        <DropDownMenu :show="showBoards" v-if="!$apollo.loading" @closed="showBoards=false">
            <router-link v-for="board in userBoards"
                         :key="board.id"
                         :to="{name:'board',  params: { id: board.id }}"
                         :class="bgColor100(board.color)"
                         class="m-2 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex"
            >
                <div class="w-10 rounded-sm rounded-r-none" :class="bgColor200(board.color)"></div>
                <div class="p-2" v-text="board.title"></div>
            </router-link>
        </DropDownMenu>
    </div>
</template>

<script>
    import DropDownMenu from "./DropDownMenu";
    import {mapState} from 'vuex'
    import UserBoards from '../graphql/UserBoards.gql'
    import {colorMap100,colorMap200} from '../utils'

    export default {
        name: "UserBoardsDropDown",
        components:{DropDownMenu},
        data(){
            return {
                showBoards:false
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
