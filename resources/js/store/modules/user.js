import { isLoggedIn, logOut } from "./../../shared/utils/auth";

const state = {
    user: {},
    isLoggedIn: false,
    isAdmin: null
};

const getters = {
    authUser(state) {
        return state.user;
    },
    isLoggedIn(state) {
        return state.isLoggedIn;
    },
    isAdmin(state) {
        return state.isAdmin;
    }
};

const actions = {
    async fetchAuthUser({ commit, dispatch }) {
        if (isLoggedIn()) {
            try {
                const user = (await axios.get("/user")).data;

                commit("setAuthUser", user);
                commit("setLoggedIn", true);
            } catch (error) {
                dispatch("logout");
            }
        }
    },
    isAdmin({ commit, state }) {
        axios.get("app/isAdmin").then(response => {
            let data = response.data;
            commit("setAdmin", data);
            localStorage.setItem("isAdmin", JSON.stringify(data));
        });
    },

    logout({ commit }) {
        commit("setAuthUser", {});
        commit("setLoggedIn", false);
        commit("setAdmin", false);
        logOut();
    },

    loadStateUser(context) {
        context.commit("setLoggedIn", isLoggedIn());
    }
};

const mutations = {
    setAuthUser(state, user) {
        state.user = user;
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setAdmin(state, payload) {
        state.isAdmin = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
