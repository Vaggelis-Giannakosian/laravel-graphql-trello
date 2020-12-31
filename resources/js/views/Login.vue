<template>
    <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
        <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>Graph Trello</span>
            </div>

            <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm: px-12">
                <div class="w-full text-center text-gray-600 font-bold mb-8">Log in to Graph Trello</div>

                <form @submit.prevent="authenticate">

                    <TextInput type="text" label="Enter email" v-model="email"></TextInput>

                    <TextInput type="password" label="Enter password" v-model="password"></TextInput>

                    <SubmitButton label="Login"></SubmitButton>

                </form>

                <div class="bg-gray-400 h-px w-full mb-6"></div>

                <div class="text-center text-sm">
                    <router-link :to="{name:'register'}" class="text-blue-600 hover:underline">Sign up for an account</router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import TextInput from "../components/FormFields/TextInput";
    import SubmitButton from "../components/FormFields/SubmitButton";
    import LoginQuery from "../graphql/Login.gql"

    export default {
        name: "Login",
        components:{TextInput, SubmitButton},
        data(){
            return {
                email:null,
                password:null
            }
        },
        methods:{
            authenticate(){
                this.$apollo.mutate({
                    mutation:LoginQuery,
                    variables:{
                        email:this.email,
                        password:this.password
                    },
                    update:(store,{data:{login}})=>{
                        console.log(login)
                    }
                });
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
