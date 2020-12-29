import './bootstrap';
import Vue from 'vue'
import Board from "./views/Board";
import apolloProvider from './apollo.config';

window.Vue = Vue;


Vue.component('board', Board);


const app = new Vue({
    el: '#app',
    apolloProvider,
});
