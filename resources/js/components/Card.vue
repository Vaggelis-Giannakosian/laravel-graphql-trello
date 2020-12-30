<template>
    <div class="bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2" v-text="card.title"></div>
</template>

<script>
    export default {
        name: "Card",
        props:['card'],
    }
</script>
