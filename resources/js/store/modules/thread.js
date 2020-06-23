import vue from "vue";

const state = {
    meetupThreads: []
};

const getters = {
    getMeetupThread: state => {
        return state.meetupThreads;
    }
};

const actions = {
    initAppThread({ commit }) {
        axios.get("/app/threads").then(response => {
            let data = response.data.thread;
            commit("setThreads", data);
            localStorage.setItem("threads", JSON.stringify(data));
        });
    },

    getMeetupThread({ commit }, payload) {
        axios.get(`/app/threads/${payload}`).then(response => {
            if (response.status) {
                //console.log(response.data.thread);
                commit("getMeetupThread", response.data.thread);
            }
        });
    }
};

const mutations = {
    getMeetupThread(state, payload) {
        state.meetupThreads = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
