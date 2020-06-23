import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import MeetUp from "./modules/meetup";
import Category from "./modules/category";
import Thread from "./modules/thread";
import Post from "./modules/post";
import Profile from "./modules/profile";
import Users from "./modules/users";
import Roles from "./modules/role";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        User,
        MeetUp,
        Category,
        Thread,
        Post,
        Profile,
        Users,
        Roles
    }
});
