require("./bootstrap");
window.Vue = require("vue");
import { router } from "./router";
import { store } from "./store/store";
import ValidationErrors from "./shared/components/ValidationErrors";
import moment from "moment";
import common from "./shared/mixins/common";
import { isLoggedIn, isAdmin } from "./shared/utils/auth";
import Vuelidate from "vuelidate";
import AppDropdown from "./components/shared/AppDropdown";
import AppHero from "./components/shared/AppHero";
import AppSpinner from "./components/shared/AppSpinner";
import Toasted from "vue-toasted";
import AppSocket from "./plugins/socket";
import Vuetify from "./plugins/vuetify";


Vue.component("pagination", require("laravel-vue-pagination"));
Vue.config.productionTip = false;
Vue.use(moment);
Vue.component("AppHero", AppHero);
Vue.component("AppDropdown", AppDropdown);
Vue.component("AppSpinner", AppSpinner);


Vue.use(AppSocket, { connection: "http://localhost:3001" });
Vue.use(Vuetify);

Vue.use(Toasted);
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
    store.dispatch("fetchAuthUser").then(() => {
        const isAdmin = store.getters["isAdmin"];
        if (to.meta.onlyAuthUser) {
            if (isAdmin) {
                next();
            } else {
                next({ name: "PageNotAuthenticated" });
            }
        } else if (to.meta.onlyGuestUser) {
            if (isLoggedIn()) {
                next();
            } else {
                next({ name: "login" });
            }
        } else {
            next();
        }
    });
});
Vue.filter("capitalize", function(value) {
    if (value && typeof value === "string") {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return "";
});
Vue.filter("formatDate", function(value, formatType = "LL") {
    if (!value) return "";
    return moment(value).format(formatType);
});
Vue.filter("fronNow", function(value) {
    if (!value) return "";
    return moment(value).fromNow();
});
Vue.component("mainapp", require("./components/mainapp.vue").default);

const app = new Vue({
    el: "#app",
    router,
    store,
    beforeCreate() {
        this.$store.dispatch("loadStateUser");
        this.$store.dispatch("initAppCategory");
        this.$store.dispatch("initAppRole");
        this.$store.dispatch("getList", 0);
    }
});
