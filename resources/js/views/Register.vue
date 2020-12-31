<template>
    <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
        <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>Graph Trello</span>
            </div>

            <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm: px-12">
                <div class="w-full text-center text-gray-600 font-bold mb-8">Log in to Graph Trello</div>

                <form @submit.prevent="onSubmit">

                    <TextInput type="text" label="Enter email" v-model="email"></TextInput>

                    <TextInput type="text" label="Enter full name" v-model="name"></TextInput>

                    <TextInput type="password" label="Enter password" v-model="password"></TextInput>

                    <SubmitButton label="Signup"></SubmitButton>

                </form>

                <div class="bg-gray-400 h-px w-full mb-6"></div>

                <div class="text-center text-sm">
                    <router-link :to="{name:'login'}" class="text-blue-600 hover:underline">Already have an account? Log in</router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import TextInput from "../components/FormFields/TextInput";
    import SubmitButton from "../components/FormFields/SubmitButton";

    export default {
        name: "Register",
        components:{TextInput, SubmitButton},
        data(){
            return {
                email:null,
                name:null,
                password:null,
            }
        },
        methods:{
            onSubmit(){
                console.log(this.email,this.password)
            }
        }
    }
</script>

<style scoped>
    .container{
        max-width: 300px;
    }

    @media(min-width: 640px)
    {
        .container{
            max-width: 400px;
        }
    }
</style>
