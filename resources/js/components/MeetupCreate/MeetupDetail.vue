<template>
    <form @input="sendEmitData">
        <div class="field">
            <label class="title m-b-sm">Choose Title</label>
            <input
                v-model="form.title"
                @blur="$v.form.title.$touch()"
                class="input"
                type="text"
                placeholder="Enter Title"
            />
            <div v-if="$v.form.title.$error">
                <span v-if="!$v.form.title.required" class="help is-danger"
                    >Title is required</span
                >
            </div>
        </div>
        <div class="field">
            <label class="title m-b-sm">Starts At</label>
            <datepicker
                v-model="form.startDate"
                @blur="$v.form.startDate.$touch()"
                valueType="format"
                :input-class="'input'"
                :placeholder="new Date() | formatDate()"
                :disabledDates="disabledDates"
            ></datepicker>
            <div v-if="$v.form.startDate.$error">
                <span v-if="!$v.form.startDate.required" class="help is-danger"
                    >Starts at is required</span
                >
            </div>
        </div>
        <div class="field">
            <label class="title m-b-sm">From</label>
            <vue-timepicker
                :minute-interval="10"
                @change="changeTime($event, 'timeFrom')"
            ></vue-timepicker>
            <div v-if="$v.form.timeFrom.$error">
                <span v-if="!$v.form.timeFrom.required" class="help is-danger"
                    >Time from is required</span
                >
            </div>
        </div>
        <div class="field">
            <label class="title m-b-sm">To</label>
            <vue-timepicker
                :minute-interval="10"
                @change="changeTime($event, 'timeTo')"
            ></vue-timepicker>
            <div v-if="$v.form.timeTo.$error">
                <span v-if="!$v.form.timeTo.required" class="help is-danger"
                    >Time to is required</span
                >
            </div>
        </div>
        <div class="field">
            <label class="title m-b-sm">Please Choose the Category.</label>
            <div class="m-b-lg">
                <div class="select">
                    <!-- TODO: Get Here Categories -->
                    <select
                        v-model="form.category"
                        @blur="$v.form.category.$touch()"
                        @change="sendEmitData"
                    >
                        <option
                            v-for="category of getCategories"
                            :value="category"
                            :key="category.id"
                            >{{ category.name }}</option
                        >
                    </select>
                </div>
                <div v-if="$v.form.category.$error">
                    <span
                        v-if="!$v.form.category.required"
                        class="help is-danger"
                        >Category is required</span
                    >
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
export default {
  components: {
    Datepicker,
    VueTimepicker
  },
  data() {
    return {
      disabledDates: {
        customPredictor: function(date) {
          const today = new Date();
          const yesterday = today.setDate(today.getDate() - 1);
          return date < yesterday;
        }
      },
      form: {
        title: null,
        startDate: null,
        timeTo: null,
        timeFrom: null,
        category: null
      }
    };
  },
  computed: {
    ...mapGetters(["getCategories"])
  },
  validations: {
    form: {
      title: { required },
      startDate: { required },
      category: { required },
      timeTo: { required },
      timeFrom: { required }
    }
  },
  methods: {
    sendEmitData() {
      this.$emit("sendEmitData", {
        data: this.form,
        isValid: !this.$v.$invalid
      });
    },
    setDate(date) {
      this.form.startDate = moment(date).format();
      this.sendEmitData();
    },
    changeTime({ data }, field) {
      const minutes = data.mm || "00";
      const hours = data.HH || "00";
      this.form[field] = hours + ":" + minutes;
      this.sendEmitData();
    }
  }
};
</script>

<style scoped>
.time-picker {
  display: block;
}
</style>
