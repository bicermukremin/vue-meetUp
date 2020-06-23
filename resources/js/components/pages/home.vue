<template>
    <div>
        <AppHero />
        <div v-if="isLoaded" class="container">
            <section class="section">
                <div class="m-b-lg">
                    <h1 class="title is-inline">
                        Featured Meetups in "Location"
                    </h1>
                    <AppDropdown />
                    <router-link
                        :to="{ name: 'meetupCreate' }"
                        class="button is-primary is-pulled-right m-r-sm"
                    >
                        Create Meetups
                    </router-link>
                    <router-link
                        :to="{ name: 'meetupFind' }"
                        class="button is-primary is-pulled-right m-r-sm"
                    >
                        All
                    </router-link>
                </div>
                <div class="row columns">
                    <meetup
                        v-for="(meetup, i) in getMeetups.data"
                        :key="i"
                        :meetup="meetup"
                    />
                    
                </div>
                <div class="row justify-content-md-center">
                 <pagination
                        :limit="2"
                        :data="getMeetups"
                        @pagination-change-page="getResults"
                    ></pagination>
                </div>
            </section>
            <section class="section">
                <div>
                    <h1 class="title">Categories</h1>
                    <div class="columns cover is-multiline is-mobile">
                        <categoryItem
                            v-for="(category, i) in getCategories"
                            :key="i"
                            :category="category"
                        />
                    </div>
                </div>
            </section>
        </div>
        <div v-else class="container">
            <AppSpinner />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import categoryItem from "./categoryItem";
import meetup from "./meetup";
export default {
  data() {
    return {
      filter: {},
      align: "center"
    };
  },
  components: {
    categoryItem,
    meetup
  },
  computed: {
    ...mapGetters(["getCategories"]),
    ...mapGetters(["getMeetups"]),
    ...mapGetters(["isLoaded"])
  },
  beforeCreate() {
    this.$store.dispatch("getList", 0);
  },
  methods: {
    getResults(page = 1) {
      this.filter["page"] = page;
      this.$store
        .dispatch("getList", { filter: this.filter })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lan='scss'>
</style>

