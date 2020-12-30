<template>
    <div>
        <textarea name=""
                  class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
                  placeholder="Enter a title for this card"
                  :value="value"
                  ref="editor"
                  @keyup.esc="close"
                  @keyup.enter.exact="saved"
                  @input="$emit('input',$event.target.value)"
        >
        </textarea>

        <div class="flex">
            <button
                class="rounded-sm text-white px-3 py-1 bg-indigo-700 cursor-pointer hover:bg-indigo-600 outline-none"
                @click="saved"
            >{{ label }}
            </button>

            <button
                class="py-1 px-3 ml-1 rounded-mg hover:bg-gray-400 cursor-pointer text-gray-500"
                @click="close"
            >Cancel
            </button>

        </div>
    </div>
</template>

<script>

    export default {
        name: "CardEditor",
        props: ['value','label'],
        methods: {
            close() {
                this.$emit('closed')
            },
            saved(){
                this.$emit("saved")
            }
        },
        mounted() {
            this.$refs.editor.focus()
        }
    }
</script>
