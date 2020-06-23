<template>
    <div class="meetup-create-page">
        <AppHero />
        <section class="section">
            <div class="container">
                <MeetupCreateWizard @meetupCreate="createMeetup" />
            </div>
        </section>
    </div>
</template>

<script>
import MeetupCreateWizard from "./../MeetupCreate/MeetupCreateWizard";
export default {
  components: {
    MeetupCreateWizard
  },
  methods: {
    async createMeetup(payload) {
      await axios.post("/app/meetups", payload).then(res => {
        if (res.status) {
          this.$store.dispatch("addToMeetups", res.data.meetup);
          this.$store.dispatch("getList");
          this.$router.push(`/meetups/${res.data.meetup[0].id}`);
          this.$toasted.success(res.message, {
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
.meetup-create-page {
  min-height: 100vh;
  //background-color: rgb(127, 167, 154)
}
</style>
