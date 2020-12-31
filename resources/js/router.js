import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from "./views/Board";
import Login from "./views/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'board',
        component: Board
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})
