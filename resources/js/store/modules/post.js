const state = {
    threadPosts: []
};

const getters = {
    getThreadPost: state => {
        return state.threadPosts;
    }
};

const actions = {
    initAppPost({ commit }) {
        axios.get("/app/posts").then(response => {
            let data = response.data.post;
            commit("setPosts", data);
            localStorage.setItem("posts", JSON.stringify(data));
        });
    },

    getThreadPost({ commit }, payload) {
        axios.get(`/app/posts/${payload}`).then(response => {
            if (response.status) {
                //console.log(response.data.post);
                commit("getThreadPost", response.data.post);
            }
        });
    },

    addPostToThread({ commit, state }, post) {
        const posts = state.threadPosts;

        posts.unshift(post);
        commit("savePostToThread", posts);
    }
};

const mutations = {
    savePostToThread(state, posts) {
        state.threadPosts = posts;
    },

    getThreadPost(state, payload) {
        state.threadPosts = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
