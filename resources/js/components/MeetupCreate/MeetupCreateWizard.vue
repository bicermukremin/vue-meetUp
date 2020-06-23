<template>
    <div class="meetup-create-form">
        <div class="current-step is-pulled-right">
            {{ currentStep }} of {{ allSteps }}
        </div>
        <!-- Form Steps -->
        <keep-alive>
            <MeetupLocation
                v-if="currentStep === 1"
                @sendEmitData="getEmitData"
                ref="currentComponent"
            />
            <MeetupDetail
                v-if="currentStep === 2"
                @sendEmitData="getEmitData"
                ref="currentComponent"
            />
            <MeetupDescription
                v-if="currentStep === 3"
                @sendEmitData="getEmitData"
                ref="currentComponent"
            />
            <MeetupConfirmation
                v-if="currentStep === 4"
                :meetupPayload="form"
                ref="currentComponent"
            />
        </keep-alive>
        <progress class="progress" :value="progressBar" max="100"
            >{{ progressBar }}%</progress
        >
        <div class="controll-btns m-b-md">
            <button
                v-if="currentStep !== 1"
                class="button is-primary m-r-sm"
                @click="moveToBackStep"
            >
                Back
            </button>
            <button
                class="button is-primary"
                v-if="currentStep !== allSteps"
                @click="moveToNextStep"
                :disabled="!canProceed"
            >
                Next
            </button>
            <!-- Confirm Data -->
            <button v-else class="button is-primary" @click.prevent="createMeetup">Confirm</button>
        </div>
        <!-- Just To See Data in the Form -->
        <pre><code>{{form}}</code></pre>
    </div>
</template>

<script>
import MeetupLocation from "./MeetupLocation";
import MeetupDetail from "./MeetupDetail";
import MeetupDescription from "./MeetupDescription";
import MeetupConfirmation from "./MeetupConfirmation";
export default {
  components: {
    MeetupLocation,
    MeetupDetail,
    MeetupDescription,
    MeetupConfirmation
  },
  data() {
    return {
      currentStep: 1,
      allSteps: 4,
      canProceed: false,
      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null
      }
    };
  },
  computed: {
    progressBar() {
      return 100 / this.allSteps * this.currentStep;
    }
  },
  methods: {
    moveToNextStep() {
      this.currentStep++;

      this.$nextTick(() => {
        this.canProceed = !this.$refs["currentComponent"].$v.$invalid;
      });
    },
    moveToBackStep() {
      this.currentStep--;
      this.canProceed = true;
    },
    getEmitData(emitData) {
      this.form = { ...this.form, ...emitData.data };
      this.canProceed = emitData.isValid;
    },
    createMeetup() {
      this.$emit("meetupCreate", this.form);
    }
  }
};
</script>

<style scoped>
.meetup-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}
</style>
