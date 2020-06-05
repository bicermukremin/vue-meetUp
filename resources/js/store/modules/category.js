const state = {
    categories: {}
};

const getters = {
    getCategories: state => {
        return state.categories;
    },

    getCategory(state) {
        return key =>
            state.categories.filter(element => {
                return element.key == key;
            });
    }
};

const actions = {
    initAppCategory({ commit }) {
        axios.get("app/categories").then(response => {
            let data = response.data;

            commit("setCategories", data);
            localStorage.setItem("categories", JSON.stringify(data));
        });
    },

    setCategories({ commit }, payload) {
        commit("setCategories", payload);
        localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    setCategory({ commit }, payload) {
        commit("setCategory", payload);
        localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    loadStateCategories(context) {
        const categories = localStorage.getItem("categories" || []);

        if (categories) {
            context.commit("setCategories", JSON.parse(categories));
        }
    },

    addToCategories({ commit, state }, payload) {
        commit("addCategory", payload);

        localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    removeFromCategories({ commit, state }, payload) {
        commit("removeCategory", payload);
        localStorage.setItem("categories", JSON.stringify(state.categories));
    }
};

const mutations = {
    addCategory(state, payload) {
        state.categories.push(payload);
    },

    removeCategory(state, payload) {
        state.categories.splice(payload.index, 1);
    },

    setCategories(state, payload) {
        state.categories = payload;
    },

    setCategory(state, payload) {
        state.categories.splice(payload.index, 1, payload.category);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
