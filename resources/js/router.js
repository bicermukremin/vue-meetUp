import Router from "vue-router";
import Vue from "vue";
Vue.use(Router);

// admin project pages
import home from "./components/pages/home";
import login from "./components/auth/Login";
import register from "./components/auth/Register";

const routes = [
    //projects routes....

    {
        path: "/",
        component: home,
        name: "home",
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "login",
        component: login,
        meta: { title: "login" }
    },
    {
        path: "/register",
        name: "register",
        component: register,
        meta: { title: "register" }
    }
];

export default new Router({
    mode: "history",
    routes
});
