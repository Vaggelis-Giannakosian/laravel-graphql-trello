<template>
    <div @click="$emit('changed',color)"
         :class="[colors[color]]"
         class="color-box w-6 h-6 md:w-8 md:h-9 mr-1 md:mr-2 rounded-sm cursor-pointer flex justify-center items-center text-white text-xl">

        <span v-if="activeColor === color" class="check" v-text="'✓'"></span>

    </div>
</template>

<script>
    import {colorMap500} from "../utils";

    export default {
        name: "BoardColor",
        props:['color','activeColor'],
        computed: {
            colors(){
                return colorMap500
            }
        }
    }
</script>

<style scoped>
    .color-box,span.check{
        text-shadow: 0 0 0 #ffffff;
        color: transparent;
    }
</style>
