<template>
    <div class="w-full mb-4">
        <input class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
               :type="type"
               :placeholder="label"
               :value="value"
               @input="$emit('input',$event.target.value)">
    </div>
</template>

<script>
    export default {
        name: "TextInput",
        props:{
            value: String,
            label:String,
            type:{
                type:String,
                default:'text'
            }
        }
    }
</script>

<style scoped>

</style>
