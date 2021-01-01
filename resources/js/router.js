import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from "./views/Board";
import Login from "./views/Login";
import Register from "./views/Register";
import Logout from "./views/Logout";

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
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})
