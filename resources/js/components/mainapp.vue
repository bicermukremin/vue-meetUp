<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            isLoggedIn: "isLoggedIn"
        })
    },
    methods: {
        logout() {
            try {
                axios.post("/logout").then(response => {
                    if (response.status) {
                        this.$store.dispatch("logout");
                        this.$router.push({
                            name: "login"
                        });
                    }
                });
            } catch (error) {
                this.$store.dispatch("logout");
            }
        }
    }
};
</script>
