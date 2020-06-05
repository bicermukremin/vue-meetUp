const state = {
    tags: {}
};

const getters = {
    getTags: state => {
        return state.tags;
    },

    getTag(state) {
        return key =>
            state.tags.filter(element => {
                return element.key == key;
            });
    }
};

const actions = {
    initAppTag({ commit }) {
        axios.get("app/tags").then(response => {
            let data = response.data;

            commit("setTags", data);
            localStorage.setItem("tags", JSON.stringify(data));
        });
    },

    setTags({ commit }, payload) {
        commit("setTags", payload);
        localStorage.setItem("tags", JSON.stringify(state.tags));
    },
    setTag({ commit }, payload) {
        commit("setTag", payload);
        localStorage.setItem("tags", JSON.stringify(state.tags));
    },

    loadStateTags(context) {
        const tags = localStorage.getItem("tags" || []);

        if (tags) {
            context.commit("setTags", JSON.parse(tags));
        }
    },

    addToTags({ commit, state }, payload) {
        commit("addTag", payload);

        localStorage.setItem("tags", JSON.stringify(state.tags));
    },

    removeFromTags({ commit, state }, payload) {
        commit("removeTag", payload);
        localStorage.setItem("tags", JSON.stringify(state.tags));
    }
};

const mutations = {
    addTag(state, payload) {
        state.tags.push(payload);
    },

    removeTag(state, payload) {
        state.tags.splice(payload.index, 1);
    },

    setTags(state, payload) {
        state.tags = payload;
    },

    setTag(state, payload) {
        state.tags.splice(payload.index, 1, payload.tag);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
