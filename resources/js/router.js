import VueRouter from "vue-router";

import Vue from "vue";
Vue.use(VueRouter);

// admin project pages
import home from "./components/pages/home";
import meetupDetail from "./components/pages/meetupDetail.vue";
import meetupEdit from "./components/pages/meetupEdit";
import meetupFind from "./components/pages/meetupFind";
import notFound from "./components/pages/PageNotFound";
import meetupCreate from "./components/pages/meetupCreate";
import Profile from "./components/pages/Profile";
import PageNotAuthenticated from "./components/pages/PageNotAuthenticated";

import login from "./components/auth/Login";
import register from "./components/auth/Register";
import sendToken from "./components/auth/SendToken";
import changePassword from "./components/auth/ChangePassword";
const routes = [
    {
        path: "/",
        component: home,
        name: "home"
        //meta: { onlyGuestUser: true }
    },
    {
        path: "/meetups/:id",
        component: meetupDetail,
        name: "meetupDetail"
        //meta: { onlyGuestUser: true }
    },
    {
        path: "/meetups/:meetupId/edit",
        component: meetupEdit,
        name: "meetupEdit",
        props: true,
        meta: { onlyGuestUser: true }
    },
    {
        path: "/meetup/new",
        component: meetupCreate,
        name: "meetupCreate",
        meta: { onlyGuestUser: true }
    },
    {
        path: "/profile",
        component: Profile,
        name: "profile",
        meta: { onlyGuestUser: true }
    },
    {
        path: "/find/:category",
        name: "PageMeetupFindCategory",
        component: meetupFind,
        props: true
    },
    {
        path: "/find",
        component: meetupFind,
        name: "meetupFind"
    },
    {
        path: "/401",
        name: "PageNotAuthenticated",
        component: PageNotAuthenticated
    },
    {
        path: "*",
        component: notFound,
        name: "notFound"
        //meta: { requiresAuth: true }
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
    },
    {
        path: "/send-token",
        name: "sendToken",
        component: sendToken,
        meta: { title: "sendToken" }
    },
    {
        path: "/change-password/:id",
        name: "changePassword",
        component: changePassword,
        props: true,
        meta: { title: "changePassword" }
    }
];

export const router = new VueRouter({
    mode: "history",
    routes
});
