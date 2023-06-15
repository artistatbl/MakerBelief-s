import { createRouter, createWebHistory } from 'vue-router';


import Login from "../components/Login.vue"
import Header from '../components/Header.vue'
import Signup from "../components/Signup.vue"
import Dashboard  from "../components/Dashboard.vue"
import NotFound from '../components/NotFound.vue'
import Article from "../components/Article.vue"


const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if (loggedIn) {
        next()
        return
    }
    next('/Login')
}

const routes = [

    //
    //
    {
        path: "/Header",
        component: Header
       
    },
    //==========================================================================
    // Login Page
    //==========================================================================
    {
        path: "/Login",
        component: Login
      
       
    },
    {
        path: "/Signup",
        component: Signup

    },
    {
        path: "/Dashboard",
        component: Dashboard

    },
    {
        path: "/Article",
        component: Article
    
    },

    {
        path: "/:pathMatch(.*)*",
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,

});





export default router;