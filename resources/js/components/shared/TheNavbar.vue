<template>
    <nav
        class="navbar is-spaced"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{ name: 'home' }">
                <h1 class="title is-4">VueMeetuper</h1>
            </router-link>
            <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link  class="navbar-item" :to="{ name: 'home' }">
                    Home
                </router-link>

                <router-link :to="{ name: 'meetupFind' }" class="navbar-item">
                    Find
                </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider" />
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div v-if="isLoggedIn">Welcome {{ userName }}</div>
                </div>
                <div
                    v-if="isLoggedIn"
                    class="navbar-item has-dropdown is-hoverable"
                >
                    <a class="navbar-link">
                        Account
                    </a>
                    <div class="navbar-dropdown">
                        <router-link
                            :to="{ name: 'profile' }"
                            href="#"
                            class="navbar-item"
                        >
                            Profile
                        </router-link>
                        <hr class="navbar-divider" />
                        <a class="navbar-item" @click.prevent="logout">
                            Logout
                        </a>
                    </div>
                </div>
                <div v-else class="navbar-item has-dropdown ">
                    <div class="buttons">
                        <router-link
                            :to="{ name: 'register' }"
                            class="button is-primary"
                        >
                            <strong>Sign up</strong>
                        </router-link>
                        <router-link
                            :to="{ name: 'login' }"
                            class="button is-light"
                        >
                            Log in
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["userName"])
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

<style scoped></style>
