<template>
    <div class="content ml-0">
        <div class="container">
            <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
            <div
                class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
            >
                <div class="w-50 m-auto ">
                    <div class="card card-body">
                        <div class="card-header">
                            <h2 class="text-center">LOGIN</h2>
                        </div>
                        <form>


                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter your e-mail"
                                    class="form-control"
                                    @blur="$v.email.$touch()"
                                    v-model="email"
                                    :class="[{ 'is-invalid': errorFor('email') },{'is-invalid' : $v.email.$error}]"/>
                                <small v-if="!$v.email.required" class="form-text text-danger">Bu alan zorunludur...</small>
                                <small v-if="!$v.email.email" class="form-text text-danger">Lütfen geçerli bir e-posta adresi
                            giriniz...
                        </small>
                                <v-errors
                                    :errors="errorFor('email')"
                                ></v-errors>
                            </div>



                            <div class="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    class="form-control"
                                    v-model="password"
                                     @blur="$v.password.$touch()"
                                    :class="[{ 'is-invalid': errorFor('password') },{'is-invalid' : $v.password.$error}]"/>
                        <small v-if="!$v.password.required" class="form-text text-danger">Bu alan zorunludur...</small>
                        <small v-if="!$v.password.minLength" class="form-text text-danger">Lütfen şifreniz en az {{
                            $v.password.$params.minLength.min }} karakterden oluşmalıdır...
                        </small>
                        <small v-if="!$v.password.maxLength" class="form-text text-danger">Lütfen şifreniz en fazla {{
                            $v.password.$params.maxLength.max }} karakterden oluşmalıdır...
                        </small>
                                <v-errors
                                    :errors="errorFor('password')"
                                ></v-errors>
                            </div>



                            <button
                                type="submit"
                                class="btn btn-primary btn-lg btn-block"
                                :disabled="loading"
                                :loading="loading"
                                @click.prevent="login"
                            >
                                Log-in
                            </button>

                            <hr />

                            <div>
                                No account yet?
                                <router-link
                                    :to="{ name: 'register' }"
                                    class="font-weight-bold"
                                    >Register</router-link
                                >
                            </div>

                            <div>
                                Forgotten password?
                                <router-link
                                    :to="{ name: 'home' }"
                                    class="font-weight-bold"
                                    >Reset password</router-link
                                >
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import validationErrors from "../../shared/mixins/validationErrors";
import { logIn } from "../../shared/utils/auth";
 import {required, email, numeric, minLength, maxLength, sameAs, between} from "vuelidate/lib/validators"
export default {
  mixins: [validationErrors],
  data() {
    return {
      email: null,
      password: null,
      loading: false
    };
  },
          validations: {
            email: {
                required,
                email
                },
          
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(8)
            },
            
            
           
        },
  methods: {
    async login() {
      this.loading = true;
      this.errors = null;

      try {
        await axios.get("/sanctum/csrf-cookie");
        await axios
          .post("/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            if (response.status) {
              logIn();
              this.$store.dispatch("fetchAuthUser");
              this.$store.dispatch("isAdmin");
              this.$store.dispatch("initAppPermission");

              this.$router.push({
                name: "home"
              });
            }
          });
      } catch (error) {
        this.errors = error.response && error.response.data.errors;
      }

      this.loading = false;
    }
  }
};
</script>
