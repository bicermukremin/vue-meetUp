<template>
    <div>
        <TheNavbar />
        <div class="page-wrapper">
          <transition name="fade" mode="out-in"><router-view :key="$route.path"  /></transition>
        </div>
        <TheFooter />
    </div>
</template>

<script>
import Home from "./pages/home";
import TheNavbar from "./shared/TheNavbar";
import TheFooter from "./shared/TheFooter";
import { mapState, mapGetters } from "vuex";
export default {
  name: "mainapp",
  components: {
    Home,
    TheNavbar,
    TheFooter
  },
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

<style lang="scss">
@import "~bulma/bulma.sass";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.page-wrapper {
  min-height: 55vh;
}
.bold {
  font-weight: bold;
}
.cover {
  background-size: cover;
  /*background-position: center;*/
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.hero {
  position: relative;
}
.hero-body {
  padding: 3rem 1.5rem;
}
.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: 0.3s ease-out;
}
.fade-leave {
}
.fade-leave-active {
  transition: 0.3s ease-out;
  opacity: 0;
}
</style>
