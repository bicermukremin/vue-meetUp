const state = {
    users: {}
};

const getters = {
    getusers: state => {
        return state.users;
    },

    getUser(state) {
        return key =>
            state.users.filter(element => {
                return element.key == key;
            });
    }
};

const actions = {
    initAppUser({ commit }) {
        axios.get("app/users").then(response => {
            let data = response.data;

            commit("setusers", data);
            localStorage.setItem("users", JSON.stringify(data));
        });
    },

    setusers({ commit }, payload) {
        commit("setusers", payload);
        localStorage.setItem("users", JSON.stringify(state.users));
    },
    setUser({ commit }, payload) {
        commit("setUser", payload);
        localStorage.setItem("users", JSON.stringify(state.users));
    },

    loadStateusers(context) {
        const users = localStorage.getItem("users" || []);

        if (users) {
            context.commit("setusers", JSON.parse(users));
        }
    },

    addToUsers({ commit, state }, payload) {
        commit("addUser", payload);

        localStorage.setItem("users", JSON.stringify(state.users));
    },

    removeFromUsers({ commit, state }, payload) {
        commit("removeUser", payload);
        localStorage.setItem("users", JSON.stringify(state.users));
    }
};

const mutations = {
    addUser(state, payload) {
        state.users.push(payload);
    },

    removeUser(state, payload) {
        state.users.splice(payload.index, 1);
    },

    setusers(state, payload) {
        state.users = payload;
    },

    setUser(state, payload) {
        state.users.splice(payload.index, 1, payload.user);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
