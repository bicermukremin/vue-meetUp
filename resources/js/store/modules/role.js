const state = {
    roles: {},
    userPermission: null
};

const getters = {
    getUserPermission: state => {
        return state.userPermission;
    },

    getRoles: state => {
        return state.roles;
    },

    getRole(state) {
        return key =>
            state.roles.filter(element => {
                return element.key == key;
            });
    }
};

const actions = {
    initAppRole({ commit }) {
        axios.get("app/roles").then(response => {
            let data = response.data;

            commit("setRoles", data);
            localStorage.setItem("roles", JSON.stringify(data));
        });
    },
    initAppPermission({ commit }) {
        axios.get("app/permission").then(response => {
            let data = response.data;

            commit("setUserPermission", data);
            localStorage.setItem("permission", JSON.stringify(data));
        });
    },

    updatePermission({ commit }, payload) {
        commit("setUserPermission", payload);
        localStorage.setItem("permission", payload);
    },

    setRoles({ commit }, payload) {
        commit("setRoles", payload);
        localStorage.setItem("roles", JSON.stringify(state.roles));
    },
    setRole({ commit }, payload) {
        commit("setRole", payload);
        localStorage.setItem("roles", JSON.stringify(state.roles));
    },

    loadStateRoles(context) {
        const roles = localStorage.getItem("roles" || []);

        if (roles) {
            context.commit("setRoles", JSON.parse(roles));
        }
    },

    addToRoles({ commit, state }, payload) {
        commit("addRole", payload);

        localStorage.setItem("roles", JSON.stringify(state.roles));
    },

    removeFromRoles({ commit, state }, payload) {
        commit("removeRole", payload);
        localStorage.setItem("roles", JSON.stringify(state.roles));
    }
};

const mutations = {
    setUserPermission(state, payload) {
        state.userPermission = payload;
    },

    addRole(state, payload) {
        state.roles.push(payload);
    },

    removeRole(state, payload) {
        state.roles.splice(payload.index, 1);
    },

    setRoles(state, payload) {
        state.roles = payload;
    },

    setRole(state, payload) {
        state.roles.splice(payload.index, 1, payload.role);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
