<template>
    <div class="columns">
        <div class="container profile">
            <div class="section profile-heading">
                <div class="columns is-mobile is-multiline">
                    <div class="column is-2">
                        <figure class="image  header-icon user-profile-image">
                            <!-- TODO: Get user avatar here -->
                            <img
                                class="is-rounded"
                                :src="getUserProfile.user[0].avatar"
                            />
                        </figure>
                    </div>
                    <div class="column is-4-tablet is-10-mobile name">
                        <p>
                            <!-- TODO: Display user name here -->
                            <span class="title is-bold">{{
                                getUserProfile.user[0].name
                            }}</span>
                            <br />
                            <!-- Here will be user update functionality -->
                            <ProfileUpdate
                                @emitProfile="saveProfile"
                                :payload="authUser"
                            />
                            <br />
                        </p>
                        <!-- TODO: User Info Here if any -->
                        <p class="tagline">
                            {{ getUserProfile.user[0].info }}
                        </p>
                    </div>
                    <!-- TODO: Set Active Tab to 'meetups' and class to 'isActive' -->
                    <div
                        :class="{ isActive: activeTab === 'meetups' }"
                        @click="activeTab = 'meetups'"
                        class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
                    >
                        <p class="stat-val">
                            {{ getUserProfile.user[0].meetups_count }}
                        </p>
                        <p class="stat-key">Meetups</p>
                    </div>
                    <div
                        :class="{ isActive: activeTab === 'Ownermeetups' }"
                        @click="activeTab = 'Ownermeetups'"
                        class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
                    >
                        <p class="stat-val">
                            {{ getUserProfile.owncount }}
                        </p>
                        <p class="stat-key">Owner/Meetups</p>
                    </div>
                    <!-- TODO: Set Active Tab to 'threads' and class to 'isActive' -->
                    <div
                        :class="{ isActive: activeTab === 'threads' }"
                        @click="activeTab = 'threads'"
                        class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
                    >
                        <p class="stat-val">
                            {{ getUserProfile.user[0].threads_count }}
                        </p>
                        <p class="stat-key">Threads</p>
                    </div>
                    <!-- TODO: Set Active Tab to 'posts' and class to 'isActive' -->
                    <div
                        :class="{ isActive: activeTab === 'posts' }"
                        @click="activeTab = 'posts'"
                        class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
                    >
                        <p class="stat-val">
                            {{ getUserProfile.user[0].posts_count }}
                        </p>
                        <p class="stat-key">Posts</p>
                    </div>
                </div>
            </div>
            <!-- TODO: Display this div when activeTab === 'meetups' -->
            <div
                class="columns is-mobile is-multiline"
                v-if="activeTab === 'meetups'"
            >
                <!-- TODO: Iterate over meetups -->
                <div
                    style="height=100%; width=85px"
                    class="column is-3-tablet is-6-mobile"
                    v-for="meetup in getUserProfile.user[0].meetups"
                    :key="meetup.id"
                >
                    <!-- THREADS -->
                    <div class="card is-shadow">
                        <router-link
                            tag="div"
                            :to="{
                                name: 'meetupDetail',
                                params: { id: meetup.id }
                            }"
                        >
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <!-- TODO: Display Meetup Image -->
                                    <img :src="meetup.image" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <!-- TODO: Display Meetup title -->
                                        <p class="title is-4">
                                            {{ meetup.title }}
                                        </p>
                                        <!-- TODO: Display Category name -->
                                        <p class="subtitle is-6">
                                            <span
                                                class="tag is-dark subtitle"
                                                >{{
                                                    meetup.category.name
                                                }}</span
                                            >
                                        </p>
                                    </div>
                                </div>
                                <div class="content">
                                    <!-- TODO: Display Meetup shortInfo -->
                                    <p>
                                        {{ meetup.shortInfo }}
                                    </p>
                                </div>
                            </div>
                        </router-link>
                        <footer class="card-footer">
                            <a class="card-footer-item">Share</a>
                        </footer>
                    </div>
                    <br />
                </div>
            </div>
            <div
                class="columns is-mobile is-multiline"
                v-if="activeTab === 'Ownermeetups'"
            >
                <!-- TODO: Iterate over meetups -->

                <div
                    style="height=100%; width=85px"
                    class="column is-3-tablet is-6-mobile"
                    v-for="meetup in getUserProfile.ownmeetups"
                    :key="meetup.id"
                >
                    <!-- THREADS -->
                    <div class="card is-shadow">
                        <router-link
                            tag="div"
                            :to="{
                                name: 'meetupDetail',
                                params: { id: meetup.id }
                            }"
                        >
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <!-- TODO: Display Meetup Image -->
                                    <img :src="meetup.image" />
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <!-- TODO: Display Meetup title -->
                                        <p class="title is-4">
                                            {{ meetup.title }}
                                        </p>
                                        <!-- TODO: Display Category name -->
                                        <p class="subtitle is-6">
                                            <span class="tag is-dark subtitle">
                                                Category
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div class="content">
                                    <!-- TODO: Display Meetup shortInfo -->
                                    <p>
                                        {{ meetup.shortInfo }}
                                    </p>
                                </div>
                            </div>
                        </router-link>
                        <footer class="card-footer">
                            <router-link
                                :to="{
                                    name: 'meetupEdit',
                                    params: { meetupId: meetup.id }
                                }"
                                class="card-footer-item"
                                >Edit</router-link
                            >
                            <a
                                @click="deleteMeetup(meetup.id)"
                                class="card-footer-item"
                                >Delete</a
                            >
                        </footer>
                    </div>
                    <br />
                </div>
            </div>
            <!-- TODO: Display this div when activeTab === 'threads' -->
            <div
                class="columns is-mobile is-multiline"
                v-if="activeTab === 'threads'"
            >
                <!-- TODO: Iterate over threads -->
                <div
                    class="column is-3-tablet is-6-mobile"
                    v-for="thread in getUserProfile.user[0].threads || {}"
                    :key="thread.id"
                >
                    <!-- THREADS -->
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <!-- TODO: Display thread thread title -->
                                    <p class="title is-4">{{ thread.title }}</p>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item">Share</a>
                            <a class="card-footer-item">Delete</a>
                        </footer>
                    </div>
                    <br />
                </div>
            </div>
            <!-- TODO: Display this div when activeTab === 'posts' -->
            <div
                class="columns is-mobile is-multiline"
                v-if="activeTab === 'posts'"
            >
                <!-- TODO: Iterate over posts -->
                <div
                    class="column is-3-tablet is-6-mobile"
                    v-for="post in getUserProfile.user[0].posts || {}"
                    :key="post.id"
                >
                    <!-- THREADS -->
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <!-- TODO: Display post text -->
                                    <p class="title is-4">{{ post.text }}</p>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item">Share</a>
                            <a class="card-footer-item">Delete</a>
                        </footer>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileUpdate from "./ProfileUpdate";
import { mapGetters } from "vuex";
import swal from "sweetalert";
export default {
    components: {
        ProfileUpdate
    },
    data() {
        return {
            activeTab: "meetups"
        };
    },
    computed: {
        ...mapGetters(["authUser"]),
        ...mapGetters(["getUserProfile"]),
        user: state => state.userProfile.user
    },
    created() {
        this.$store.dispatch("fetchUserProfile", this.authUser.id);
    },
    methods: {
        async saveProfile(userData) {
            await axios
                .patch(`/app/users/${userData.user.id}`, userData.user)
                .then(res => {
                    if (res.data.status) {
                        const user = res.data.user;
                        //console.log(res.data.user);
                        this.$store.dispatch("updateProfile", user).then(() => {
                            this.$toasted.success(res.data.message, {
                                theme: "bubble",
                                position: "top-center",
                                duration: 5000
                            });
                            userData.done();
                        });
                    }
                });
        },
        deleteMeetup(meetupId) {
            swal({
                title: "Are you sure?",
                text:
                    "Once deleted, you will not be able to recover this meetup!",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    axios
                        .delete(`/app/meetups/${meetupId}`, meetupId)
                        .then(res => {
                            if (res.status) {
                                console.log(res.data);
                                this.$store.dispatch("updateProfile", res.data);
                                this.$store.dispatch(
                                    "fetchUserProfile",
                                    this.authUser.id
                                );
                                swal("Poof! Your meetup has been deleted!", {
                                    icon: "success"
                                });
                            }
                        })
                        .catch(err => console.log(err));
                } else {
                    swal("Your meetup is safe!");
                }
            });
        }
    }
};
</script>

<!-- Styles -->
<style scoped>
body {
    background: #f5f7fa;
}
.is-shadow:hover {
    cursor: pointer;
    transition: 0.3s;
    -webkit-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    -moz-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
}
.stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
}
.stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
}
.stats-tab.isActive {
    border-bottom: 2px solid black;
}
.stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
}
.stat-key {
    font-size: 1.4em;
    font-weight: 200;
}
.section.profile-heading
    .column.is-2-tablet.has-text-centered
    + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, 0.2);
}
.container.profile {
    margin-top: 1%;
}
.control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
}
.modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada;
}
.container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f1f1f1;
}
</style>
