<template>
    <div class="box">
        <!-- Thread title -->
        <h4 id="const" class="title is-3">{{ thread.title }}?</h4>
        <!-- Create new post, handle later -->

        <PostCreate
            :threadId="thread.id"
            :authUserId="authUser.id"
            :meetupId="thread.meetup_id"
            :meetuper="meetuper"
        />
        <!-- Create new post END, handle later -->
        <!-- Posts START -->
        <PostList v-for="post in getThreadPost" :key="post.id" :post="post" />
        <!-- Posts END -->
    </div>
</template>
<script>
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import { mapGetters } from "vuex";
export default {
    components: {
        PostCreate,
        PostList
    },
    props: {
        thread: {
            type: Object
        },
        meetuper: {
            required: true,
            type: Number
        }
    },
    computed: {
        ...mapGetters(["authUser"]),
        ...mapGetters(["getThreadPost"])
    },
    created() {
        this.$store.dispatch("getThreadPost", this.thread.id);
    }
};
</script>
<style scoped lang="scss">
.content {
    figure {
        margin-bottom: 0;
    }
}
.media-content {
    background-color: #f1f1f1;
    padding: 3px 20px;
    border-radius: 10px;
    margin-right: 40px;
    width: 100px;
}
.media-left.user-image {
    margin: 0;
    margin-right: 15px;
}
.post-item {
}
.media + .media {
    border: none;
    margin-top: 0;
}
.post-content {
    margin: 0;
    &-message {
        font-size: 16px;
    }
    .author {
        font-size: 18px;
    }
    .post-time {
        font-size: 16px;
    }
}
</style>
