<template>
   <div>
       <div v-if="!editing"
             @click="startEditing"
             class="list bg-white hover:bg-gray-500 rounded-sm p-2 pr-2 opacity-75 text-black cursor-pointer"
             v-text="'＋ Add another list'">
       </div>

       <div v-else class="bg-gray-300 rounded-sm p-2 list">
           <input type="text"
                  v-model="title"
                  ref="title"
                  class="rounded-sm border-blue-600 border-2 py-1 px-2 outline-none w-full text-gray-800 text-sm"
                  placeholder="Enter list title..."
                  @keyup.esc="hideEditor"

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

    export default {
        name: "ListAddEditor",
        components:{CardEditor},
        data(){
            return {
                editing:false,
                title: null
            }
        },
        methods:{
            hideEditor(){
                this.editing = false
            },
            startEditing(){
                this.editing = true
                this.$nextTick(()=>this.$refs.title.focus())
            },
            createList(){
                this.$apollo.mutate({
                    mutation:'',
                    variables:{

                        title:this.title,
                    },
                    update:(store,{data:{listAdd}})=>{
                        console.log(listAdd)
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
