<template>
    <transition name="appear">
        <div v-if="show"
             v-on-clickaway="close"
             class="dropdown-menu absolute bg-gray-200 rounded-sm mt-2 text-sm text-gray-600 border-gray-200 shadow w-64 overflow-y-auto z-10 p-2">
            <div class="text-gray-600 text-xs font-semibold mb-2 ml-2">BOARDS</div>

            <slot></slot>

        </div>
    </transition>
</template>

<script>
    import { directive as onClickaway } from 'vue-clickaway';

    export default {
        name: "DropDownMenu",
        props: ['show'],
        directives: {
            onClickaway: onClickaway,
        },
        methods:{
            close(){
                this.$emit('closed')
            },
        }
    }
</script>

<style scoped>
    .dropdown-menu {
        max-height: 80%;
    }
</style>
