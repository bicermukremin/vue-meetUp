import { isLoggedIn, logOut } from "./../../shared/utils/auth";

const state = {
    user: {},
    userName: "",
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
    },
    userName(state) {
        return (state.userName = localStorage.getItem("userName"));
    },
    isMeetupOwner: state => meetupCreatorId => {
        if (!state.user) return false;
        return state.user.id === meetupCreatorId;
    },
    isMember: state => meetupId => {
        if (state.user && state.user["meetups"]) {
            const i = state.user.meetups.findIndex(
                meetup => meetup.id == meetupId
            );

            if (i > -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};

const actions = {
    async fetchAuthUser({ commit, dispatch }) {
        if (isLoggedIn()) {
            try {
                const user = (await axios.get("/user")).data;
                const userMeetup = (await axios.get("/app/userMeetup")).data;
                //console.log(userMeetup.userMeetup[0]);
                localStorage.setItem("userName", JSON.stringify(user.username));
                commit("setAuthUser", userMeetup.userMeetup[0]);
                commit("setLoggedIn", true);
                commit("userName", user.username);
            } catch (error) {
                dispatch("logout");
            }
        }
    },

    updateProfile({ commit }, payload) {
        commit("setAuthUser", payload);
    },
    isAdmin({ commit, state }) {
        axios.get("/app/isAdmin").then(response => {
            let data = response.data;
            commit("setAdmin", data);
            localStorage.setItem("isAdmin", JSON.stringify(data));
        });
    },

    logout({ commit }) {
        commit("setAuthUser", {});
        commit("setLoggedIn", false);
        commit("setAdmin", false);
        commit("userName", "");
        localStorage.setItem("userName", "");

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
    },
    userName(state, payload) {
        state.userName = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
