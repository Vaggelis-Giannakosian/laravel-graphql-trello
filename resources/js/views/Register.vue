<template>
    <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
        <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>Graph Trello</span>
            </div>

            <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm: px-12">

                <Errors :errors="errors"></Errors>

                <div class="w-full text-center text-gray-600 font-bold mb-8">Log in to Graph Trello</div>

                <form @submit.prevent="registerUser">

                    <TextInput type="text" label="Enter email" v-model="email"></TextInput>

                    <TextInput type="text" label="Enter full name" v-model="name"></TextInput>

                    <TextInput type="password" label="Enter password" v-model="password"></TextInput>

                    <SubmitButton label="Signup"></SubmitButton>

                </form>

                <div class="bg-gray-400 h-px w-full mb-6"></div>

                <div class="text-center text-sm">
                    <router-link :to="{name:'login'}" class="text-blue-600 hover:underline">Already have an account? Log
                        in
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import TextInput from "../components/FormFields/TextInput";
    import SubmitButton from "../components/FormFields/SubmitButton";
    import Register from "./../graphql/Register.gql"
    import Errors from "../components/Errors";
    import {normalizeGQLErrors} from "../utils";

    export default {
        name: "Register",
        components: {TextInput, SubmitButton, Errors},
        data() {
            return {
                email: null,
                name: null,
                password: null,
                errors: []
            }
        },
        methods: {
            async registerUser() {
                try {
                    await this.$apollo.mutate({
                        mutation: Register,
                        variables: {
                            input: {
                                email: this.email,
                                password: this.password,
                                name: this.name,
                            }

                        },
                        update: (store, {data: {register}}) => {
                            console.log(register)
                        }
                    })

                    this.$store.dispatch('setLogged',true)
                    this.$router.push({name: 'board'})

                } catch (err) {
                    this.errors = normalizeGQLErrors(err)
                }

            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 300px;
    }

    @media (min-width: 640px) {
        .container {
            max-width: 400px;
        }
    }
</style>
