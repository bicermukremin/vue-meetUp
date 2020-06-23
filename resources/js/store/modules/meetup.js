import { applyFilters } from "./../../components/helpers/index";
const state = {
    meetups: {},
    meetup: {},
    isLoaded: false
};

const getters = {
    getMeetups: state => {
        return state.meetups;
    },
    getMeetup: state => {
        return state.meetup;
    },
    isLoaded: state => {
        return state.isLoaded;
    }
};

const actions = {
    getList({ commit, state }, options) {
        const url = applyFilters("/app/meetups", options.filter);

        axios.get(url).then(response => {
            let data = response.data.meetup;
            console.log(data);

            commit("setMeetups", data);

            localStorage.setItem("meetups", JSON.stringify(data));
            state.isLoaded = true;
        });
    },

    setMeetups({ commit }, payload) {
        console.log(payload);
        commit("setMeetups", payload);
        localStorage.setItem("meetups", JSON.stringify(state.meetups));
    },
    setMeetup({ commit }, payload) {
        commit("setMeetup", payload);
        localStorage.setItem("meetups", JSON.stringify(state.meetups));
    },
    updateMeetup({ commit }, meetupData) {
        meetupData.city =
            meetupData.location
                .toLowerCase()
                .replace(/[\s,]+/g, "")
                .trim() || "";
        axios.patch(`/app/meetups/${meetupData.id}`, meetupData).then(res => {
            const updatedMeetup = res.data;
            console.log(updatedMeetup);
            commit("setMeetup", updatedMeetup);
        });
    },
    getMeetup({ commit }, payload) {
        axios.get(`/app/meetups/${payload}`).then(response => {
            if (response.status) {
                //console.log(response.data.meetup[0]);
                commit("getMeetup", response.data.meetup[0]);
            }
        });
    },

    loadStateMeetups(context) {
        const meetups = localStorage.getItem("meetups" || []);

        if (meetups) {
            context.commit("setMeetups", JSON.parse(meetups));
        }
    },

    addToMeetups({ commit, state }, payload) {
        commit("addMeetup", payload);

        localStorage.setItem("meetups", JSON.stringify(state.meetups));
    },

    removeFromMeetups({ commit, state }, payload) {
        commit("removeMeetup", payload);
        localStorage.setItem("meetups", JSON.stringify(state.meetups));
    }
};

const mutations = {
    addMeetup(state, payload) {
        state.meetups.data.push(payload);
    },

    removeMeetup(state, payload) {
        state.meetups.splice(payload.index, 1);
    },

    setMeetups(state, payload) {
        state.meetups = payload;
    },
    getMeetup(state, payload) {
        state.meetup = payload;
    },

    setMeetup(state, payload) {
        state.meetup = payload;
    },
    isLoaded(state, payload) {
        state.isLoaded = payload;
    },
    setCurrentPage(state, data) {
        state.meetups.current_page = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
