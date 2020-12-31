<template>
    <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
        <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>Graph Trello</span>
            </div>

            <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm: px-12">
                <div class="w-full text-center text-gray-600 font-bold mb-8">Log in to Graph Trello</div>

                <form @submit.prevent="onSubmit">

                    <div class="w-full mb-4">
                        <input class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
                               type="text"
                               placeholder="Enter email"
                               v-model="email">
                    </div>

                    <div class="w-full mb-4">
                        <input class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
                               type="password"
                               placeholder="Enter password"
                               v-model="password">
                    </div>

                    <div class="w-full mb-6">
                        <button type="submit"
                                class="rounded px-4 py-2 bg-green-500 font-bold outline-none focus:outline-none hover:opacity-75 w-full text-sm text-white disbled:opacity-25  ">Login</button>
                    </div>
                </form>

                <div class="bg-gray-400 h-px w-full mb-6"></div>

                <div class="text-center text-sm">
                    <a href="#" class="text-blue-600 hover:underline">Sign up for an account</a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                email:null,
                password:null
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
