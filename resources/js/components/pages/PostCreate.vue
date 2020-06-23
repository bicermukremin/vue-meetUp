<template>
    <!-- <div v-with-warning:red.prevent="'What a nice day (:'"> </div> -->
    <form class="post-create" v-if="canMakePost">
        <div class="field">
            <textarea
                v-auto-expand
                v-model="text"
                class="textarea textarea-post"
                placeholder="Write a post"
                rows="1"
            ></textarea>
            <button
                :disabled="!text"
                @click.prevent="sendPost"
                class="button is-primary m-t-sm"
            >
                Send
            </button>
        </div>
    </form>
</template>

<script>
import autoExpand from "./../../directives/autoExpand";
export default {
    directives: { autoExpand },
    props: ["threadId", "authUserId", "meetupId", "meetuper"],
    data() {
        return {
            text: null
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters["isLoggedIn"];
        },
        isMeetupOwner() {
            return this.$store.getters["isMeetupOwner"](this.meetuper);
        },
        isMember() {
            return this.$store.getters["isMember"](this.meetupId);
        },
        canJoin() {
            return (
                !this.isMeetupOwner && this.isAuthenticated && !this.isMember
            );
        },

        canMakePost() {
            return (
                this.isAuthenticated && (this.isMember || this.isMeetupOwner)
            );
        }
    },

    methods: {
        async sendPost() {
            let data = {
                thread_id: this.threadId,
                user_id: this.authUserId,
                text: this.text
            };
            //console.log(data);
            await axios.post(`/app/posts`, data).then(res => {
                if (res.data.status) {
                    //console.log(res.data.post[0]);

                    this.$store.dispatch("addPostToThread", res.data.post[0]);

                    this.$socket.emit("meetup/postSaved", {
                        post: res.data.post[0],
                        meetup: this.meetupId
                    });
                    this.$store.dispatch("fetchAuthUser");
                    this.text = "";

                    //console.log(res.data);

                    this.$toasted.success(res.data.message, {
                        theme: "bubble",
                        position: "top-center",
                        duration: 5000
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.textarea-post {
    padding-bottom: 30px;
}
.post-create {
    margin-bottom: 15px;
}
</style>
