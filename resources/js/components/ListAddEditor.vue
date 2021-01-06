<template>
   <div>
       <div v-if="!editing"
             @click="startEditing"
             class="list bg-white hover:bg-gray-500 rounded-sm p-2 pr-2 opacity-75 text-black cursor-pointer"
             v-text="'＋ Add another list'">
       </div>

       <div v-else class="bg-gray-300 rounded-sm p-2 list" v-onClickway="hideEditor">
           <input type="text"
                  v-model="title"
                  ref="title"
                  class="rounded-sm border-blue-600 border-2 py-1 px-2 outline-none w-full text-gray-800 text-sm"
                  placeholder="Enter list title..."
                  @keyup.esc="hideEditor"
                  @keyup.enter="createList"
           >

           <div class="flex">
               <button @click="createList" class="mt-2 rounded-sm py-1 px-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 outline-none">Add List</button>
               <div @click="hideEditor" class="mt-2 ml-1 rounded-md px-3 hover:bg-gray-400 cursor-pointer text-gray-500 text-xl font-bold">
                   ×
               </div>
           </div>
       </div>

   </div>
</template>

<script>
    import CardEditor from "./CardEditor";
    import { directive as onClickway} from 'vue-clickaway'
    import ListAdd from './../graphql/ListAdd.gql'
    import {EVENT_LIST_ADDED} from "../constants";

    export default {
        name: "ListAddEditor",
        props:['board_id'],
        components:{CardEditor},
        data(){
            return {
                editing:false,
                title: null
            }
        },
        directives:{onClickway},
        methods:{
            hideEditor(){
                this.editing = false
            },
            startEditing(){
                this.editing = true
                this.$nextTick(()=>this.$refs.title.focus())
            },
            createList(){
                if(!this.title)
                {
                    alert('Provide title')
                    return;
                }

                this.$apollo.mutate({
                    mutation:ListAdd,
                    variables:{
                        board_id:this.board_id,
                        title:this.title,
                    },
                    update:(store,{data:{listAdd}})=>{

                        this.$emit('list-added',{
                            store,
                            data:listAdd,
                            type: EVENT_LIST_ADDED
                        })

                        this.hideEditor()
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .list{
        text-shadow: 0 0 0 #000;
        color: transparent;
    }
</style>
