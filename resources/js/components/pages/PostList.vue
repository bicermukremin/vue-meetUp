<template>
    <div>
        <article class="media post-item">
            <figure class="media-left is-rounded user-image">
                <p class="image is-32x32">
                    <img class="is-rounded" :src="post.user.avatar" />
                </p>
            </figure>
            <div class="media-content" v-bg-color="isLoggedIn">
                <div class="content is-medium">
                    <div class="post-content">
                        <!-- Post User Name -->
                        <strong class="author">{{ post.user.name }}</strong>
                        {{ " " }}
                        <!-- Post Updated at -->
                        <span>
                            <small class="post-time">{{
                                post.updated_at | fronNow
                            }}</small>
                        </span>
                        <br />
                        <p class="post-content-message">
                            {{ post.text }}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import bgColor from "./../../directives/bgColor";
export default {
    directives: { bgColor },
    props: {
        post: {
            type: Object
        }
    },
    computed: {
        ...mapGetters(["isLoggedIn"])
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
    margin-bottom: 5px;
    width: 100px;
}
.media-left.user-image {
    margin: 0;
    margin-right: 15px;
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
        font-size: 14px;
    }
}
</style>
