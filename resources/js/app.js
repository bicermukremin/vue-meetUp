require("./bootstrap");
window.Vue = require("vue");
import router from "./router";
import { store } from "./store/store";
import ValidationErrors from "./shared/components/ValidationErrors";

import common from "./shared/mixins/common";
import { isLoggedIn } from "./shared/utils/auth";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.mixin(common);

Vue.component("v-errors", ValidationErrors);

window.axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (401 === error.response.status) {
            store.dispatch("logout");
        }

        return Promise.reject(error);
    }
);

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

Vue.component("mainapp", require("./components/mainapp.vue").default);

const app = new Vue({
    el: "#app",
    router,
    store,
    async beforeCreate() {
        this.$store.dispatch("loadStateUser");

        this.$store.dispatch("initAppRole");
    }
});
