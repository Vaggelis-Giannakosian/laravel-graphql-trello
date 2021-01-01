<template>
</template>

<script>
    import Logout from './../graphql/Logout.gql'

    export default {
        name: "Logout",
        created(){
            this.$apollo.mutate({
                mutation:Logout,
                update:(store,{data:{logout}})=>{
                    console.log(logout)
                }
            }).then(resp=>{
                this.$store.dispatch('setLogged',false)
                this.$router.push({name:'login'})
            })
        }
    }
</script>
