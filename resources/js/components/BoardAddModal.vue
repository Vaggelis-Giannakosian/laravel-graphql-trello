<template>
    <Modal :show="show"
           :width="300"
           :height="250"
           @closed="$emit('closed')"
    >

        <div class="flex">
            <div class="rounded-sm p-4 text-black w-full mr-2 bg-teal-700">
                <input type="text"
                       class="title rounded-sm text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-100"
                       placeholder="Add board title">
            </div>
        </div>

        <div class="mt-4">
            <button class="rounded-sm py-2 px-4 text-black cursor-pointer bg-teal-300 hover:bg-teal-500">Create</button>
        </div>

    </Modal>
</template>

<script>
    import Modal from './Modal'

    export default {
        name: "BoardAddModal",
        components:{Modal},
        props: {
            show:Boolean
        }
    }
</script>

<style scoped>
    .title{
        background-color: hsla(0,0%,100%,0);
    }

    .title:hover, .title:focus{
        background-color: hsla(0,0%,100%,0.2);
    }
</style>
