<template>
    <div v-if="errors.length" class="p-2 bg-red-600 text-gray-100 rounded-sm mb-6 text-sm text-center">
        <div v-for="(error, index) in errors" :key="index" v-text="error.message"></div>
    </div>
</template>

<script>
    export default {
        name: "Errors",
        props: {
            errors: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style scoped>

</style>
