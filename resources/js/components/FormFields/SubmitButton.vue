<template>
    <div class="w-full mb-6">
        <button type="submit"
                class="rounded px-4 py-2 bg-green-500 font-bold outline-none focus:outline-none hover:opacity-75 w-full text-sm text-white disbled:opacity-25"
                v-text="label"
        ></button>
    </div>
</template>

<script>
    export default {
        name: "SubmitButton",
        props:['label']
    }
</script>

<style scoped>

</style>
