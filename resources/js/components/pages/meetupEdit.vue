<template>
<div class="meetup-detail-page">
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h2 class="subtitle">
                    <!-- TODO: Display meetup start date -->
                    {{ getMeetup.startDate | formatDate }}
                </h2>
                <div class="field">
                    <!-- TODO: Bind meetup title -->
              
                    <input v-model="getMeetup.title"
                     class="title input w-50" type="text">
                </div>
                <article class="media v-center">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <!-- TODO: Display meetup creator avatar -->
                            <img class="is-rounded" :src="getMeetup.meetuper.avatar || ''">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <!-- TODO: Display meetup creator name -->
                                Created by <strong>{{ getMeetup.meetuper.name }}</strong>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
            <div class="is-pulled-right">
                <!-- Update Button -->
                <button @click="updateMeetupHandler" class="button is-success is-large">Update</button>
            </div>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <aside class="is-medium menu">
                        <div class="meetup-side-box">
                            <div class="meetup-side-box-date m-b-sm">
                                <!-- TIMES START -->
                                <p><b>Time</b></p>
                                <!-- TODO - OPTIONAL - Make dates and times working -->
                                <!-- Implementation almost the same as in create meetup -->

                                <!-- 1. Disable Dates -->
                                <!-- 2. Set Date on @input event-->
                                <!-- 3. Display actual meetup startDate in :value -->
                                <datepicker v-model="getMeetup.startDate" valueType="format" :input-class="'input'" :placeholder="new Date() | formatDate()" :disabledDates="disabledDates"></datepicker>
                                <div class="field m-t-md">
                                    <!-- TODO: Implement @change Event -->
                                    <!-- TODO: Bind timeFrom value with v-model -->
                                    <vue-timepicker v-model="getMeetup.timeFrom" :minute-interval="10" @change="changeTime($event, 'timeFrom')"></vue-timepicker>
                                </div>
                                <div class="field">
                                    <!-- TODO: Implement @change Event -->
                                    <!-- TODO: Bind timeTo value with v-model -->
                                    <vue-timepicker v-model="getMeetup.timeTo" :minute-interval="10" @change="changeTime($event, 'timeTo')"></vue-timepicker>
                                </div>
                                <!-- TIMES END -->
                            </div>
                            <div class="meetup-side-box-place m-b-sm">
                                <p><b>Category</b></p>
                                <div class="field">

                                    <div class="m-b-lg">
                                        <div class="select">
                                            <!-- TODO: Get Here Categories -->
                                            <select v-model="getMeetup.category.name" selected>
                                                <option v-for="category of getCategories" :value="category.name" :key="category.id">{{ category.name }}</option>
                                            </select>
                                        </div>
                                                        
                                    </div>
                                </div>
                            </div>
                            <div class="meetup-side-box-place m-b-sm">
                                <p><b>How to find us</b></p>
                                <div class="field">
                                    <!-- TODO: Bind meetup location -->
                                    <input v-model="getMeetup.location" class="input" type="text">
                                </div>
                            </div>
                            <div class="meetup-side-box-more-info">
                                <p><b>Additional Info</b></p>
                                <div class="field">
                                    <!-- TODO: Bind meetup short info -->
                                    <textarea v-model="getMeetup.shortInfo" class="textarea" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="meetup-side-box-map">
                            <img src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png" class="venueMap-mapImg span--100" alt="Location image of meetup venue">
                        </div>
                    </aside>
                </div>
                <div class="column is-7 is-offset-1">
                    <div class="content is-medium">
                        <h3 class="title is-3">About the Meetup</h3>
                        <!-- TODO: Bind meetup description -->
                        <textarea v-model="getMeetup.description" class="textarea" rows="5"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
export default {
  data() {
    return {
      disabledDates: {
        customPredictor: function(date) {
          const today = new Date();
          const yesterday = today.setDate(today.getDate() - 1);
          return date < yesterday;
        }
      }
    };
  },
  components: {
    Datepicker,
    VueTimepicker
  },
  props: {
    meetupId: {
      required: true
    }
  },
  computed: {
    ...mapGetters(["getMeetup"]),
    ...mapGetters(["getCategories"]),

  },
  watch: {
    isMeetupOwner() {
      return this.$store.getters["isMeetupOwner"](this.getMeetup.meetupCreator);
    }
  },
  created() {
    if (this.isMeetupOwner) {
      this.$store.dispatch("getMeetup", this.meetupId);
    } else {
      this.$store.dispatch("getMeetup", this.meetupId);
      //this.$router.push({ path: "/notAuthorized" });
    }
  },
  methods: {
    setDate(date) {
      this.getMeetup.startDate = moment(date).format();
    },
    changeTime({ data }, field) {
      const minutes = data.mm || "00";
      const hours = data.HH || "00";
      this.getMeetup[field] = hours + ":" + minutes;
    },
    updateMeetupHandler() {
      this.$store
        .dispatch("updateMeetup", this.getMeetup)
        .then(() => {
          this.$toasted.success("Meetup Succesfuly Updated!", {
            duration: 3000
          });
        })
        .catch(err => console.log(err));
    },

    parseTime(time) {
      const [HH, mm] = time.split(":");
      return {
        HH,
        mm
      };
    }
  }
};
</script>

<style lang="scss">
.w-50 {
  width: 50%;
}
.tag.is-warning {
  opacity: 0.5;
}
.meetup-detail-page {
  background-color: #f5f5f5;
  .mapouter {
    text-align: right;
    height: 500px;
    width: 600px;
  }
  .gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 500px;
    width: 600px;
  }
  .hero-body {
    background-color: white;
    border: 1px solid rgba(46, 62, 72, 0.12);
    color: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url("https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    > p,
    h1,
    h2,
    strong {
      color: white;
    }
  }
  .meetup-side-box {
    background-color: white;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px;
  }
}
</style>
