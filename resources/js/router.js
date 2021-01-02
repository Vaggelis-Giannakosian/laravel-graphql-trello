import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from "./views/Board";
import Login from "./views/Login";
import Register from "./views/Register";

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
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})
