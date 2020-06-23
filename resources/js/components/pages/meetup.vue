<template>
    <div class="column is-one-third ">
        <div class="card large is-shadow">
            <router-link
                tag="div"
                :to="{ name: 'meetupDetail', params: { id: meetup.id } }"
                class="card-meetup-link"
            >
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img :src="meetup.image" :alt="meetup.title" />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="level m-b-md">
                        <div class="media-left">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="title">
                                        {{
                                            meetup.startDate | formatDate("MMM")
                                        }}
                                    </p>

                                    <p class="title">
                                        {{ meetup.startDate | formatDate("D") }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="media-content">
                            <p class="title is-4 no-padding is-marginless">
                                {{ meetup.title }}
                            </p>
                            <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
                            <span class="tag is-success">{{
                                meetup.category.name | capitalize
                            }}</span>
                            <p class="subtitle is-7">
                                {{ meetup.location }}
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        {{ meetup.shortInfo }}...
                        <div class="background-icon">
                            <span class="icon-twitter"></span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        meetup: {
            required: true,
            type: Object
        }
    }
};
</script>
<style scoped lan="scss">
.card-meetup-link {
    color: black;
}

.is-shadow:hover {
    cursor: pointer;
    transition: 0.3s;
    -webkit-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    -moz-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
}
</style>
