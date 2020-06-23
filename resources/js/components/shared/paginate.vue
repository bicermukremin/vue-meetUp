<template>
    <div class="text-center">
        <v-pagination
            v-model="currentPage"
            :length="lastPage"
            :total-visible="8"
        ></v-pagination>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    watch: {
        currentPage(newVal, oldVal) {
            this.paginatePage(newVal);
        }
    },

    computed: {
        ...mapGetters(["getMeetups"]),
        currentPage: {
            get() {
                return this.getMeetups.current_page;
            },
            set(value) {
                this.$store.commit("setCurrentPage", value);
            }
        },
        lastPage: {
            get() {
                return this.getMeetups.last_page;
            }
        }
    },
    methods: {
        paginatePage(pageNumber) {
            this.$store.dispatch("getList", pageNumber);
        }
    }
};
</script>
