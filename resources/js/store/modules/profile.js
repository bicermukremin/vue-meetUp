const state = {
    userProfile: {}
};

const getters = {
    getUserProfile: state => {
        return state.userProfile;
    }
};

const actions = {
    fetchUserProfile({ commit }, userId) {
        axios.get(`/app/users/${userId}`).then(response => {
            let data = response.data;
            console.log(data);
            commit("setUserProfile", data);
            //localStorage.setItem("threads", JSON.stringify(data));
        });
    },
    updateProfile({ commit }, meetup) {
        debugger;
        commit("setUserProfile", meetup);
    }
};

const mutations = {
    setUserProfile(state, payload) {
        state.userProfile = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
