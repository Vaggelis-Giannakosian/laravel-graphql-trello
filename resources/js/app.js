
require('./bootstrap');

window.Vue = require('vue');


Vue.component('board', require('./views/Board.vue').default);


const app = new Vue({
    el: '#app',
});
