import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import Tag from "./modules/tag";
import Category from "./modules/category";
import Users from "./modules/users";
import Roles from "./modules/role";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        User,
        Tag,
        Category,
        Users,
        Roles
    }
});
