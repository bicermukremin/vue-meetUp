<template>
<div class="content ml-0">
    <div class="container-fluid">
        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
        <div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
            <div class="w-50 m-auto">
                <div class="card card-body">
                    <div class="card-header">
                        <h2 class="text-center">REGISTER</h2>
                    </div>
                    <form>


                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" placeholder="Enter your name" class="form-control" 
                            @blur="$v.name.$touch()" 
                            v-model="name" 
                            :class="[{ 'is-invalid': errorFor('name') },{'is-invalid' : $v.name.$error}]" />
                            <small v-if="!$v.name.required" class="form-text text-danger">Bu alan zorunludur...</small>
                            <v-errors :errors="errorFor('name')"></v-errors>
                        </div>


                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" name="email" placeholder="Enter your e-mail" class="form-control" 
                            v-model="email" 
                            @blur="$v.email.$touch()" 
                            :class="[{ 'is-invalid': errorFor('email') },{'is-invalid' : $v.email.$error}]" />
                            <small v-if="!$v.email.required" class="form-text text-danger">Bu alan zorunludur...</small>
                            <small v-if="!$v.email.email" class="form-text text-danger">Lütfen geçerli bir e-posta adresi
                                giriniz...
                            </small>
                            <v-errors :errors="errorFor('email')"></v-errors>
                        </div>



                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" placeholder="Enter your password" class="form-control" 
                            @blur="$v.password_confirmation.$touch()" 
                            v-model="password" 
                            :class="[{ 'is-invalid': errorFor('password') },{'is-invalid' : $v.password.$error}]" />
                            <small v-if="!$v.password.required" class="form-text text-danger">Bu alan zorunludur...</small>
                            <small v-if="!$v.password.minLength" class="form-text text-danger">Lütfen şifreniz en az {{
                            $v.password.$params.minLength.min }} karakterden oluşmalıdır...
                            </small>
                            <small v-if="!$v.password.maxLength" class="form-text text-danger">Lütfen şifreniz en fazla {{
                            $v.password.$params.maxLength.max }} karakterden oluşmalıdır...
                            </small>
                            <v-errors :errors="errorFor('password')"></v-errors>
                        </div>



                        <div class="form-group">
                            <label for="password_confirmation">Password Confirmation</label>
                            <input type="password" name="password_confirmation" placeholder="Enter your password_confirmation" 
                            class="form-control"
                            @blur="$v.password_confirmation.$touch()" 
                            v-model="password_confirmation" 
                            :class="[{ 'is-invalid': errorFor('password_confirmation') },{'is-invalid' : $v.password_confirmation.$error}]" />
                            <small v-if="!$v.password_confirmation.required" class="form-text text-danger">Bu alan zorunludur...
                            </small>
                            <small v-if="!$v.password_confirmation.minLength" class="form-text text-danger">Lütfen şifreniz en az {{
                            $v.password_confirmation.$params.minLength.min }} karakterden oluşmalıdır...
                            </small>
                            <small v-if="!$v.password_confirmation.maxLength" class="form-text text-danger">Lütfen şifreniz en fazla {{
                            $v.password_confirmation.$params.maxLength.max }} karakterden oluşmalıdır...
                            </small>
                            <small v-if="!$v.password_confirmation.sameAs" class="form-text text-danger">Girdiğiniz şifreler
                                birbirleriyle uyuşmuyor...
                            </small>
                            <v-errors :errors="errorFor('password_confirmation')"></v-errors>
                        </div>



                        <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="loading" @click.prevent="register">
                            Log-in
                        </button>

                        <hr />

                        <div>
                            Already have an account?
                            <router-link :to="{ name: 'login' }" class="font-weight-bold">Login</router-link>
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
import {
    logIn
} from "../../shared/utils/auth";
import {
    required,
    email,
    numeric,
    minLength,
    maxLength,
    sameAs,
    between
} from "vuelidate/lib/validators"

export default {
    mixins: [validationErrors],
    data() {
        return {

            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            loading: false
        };
    },
    validations: {
        name: {
            required,

        },
        email: {
            required,
            email
        },

        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(8)
        },
        password_confirmation: {
            required,            
            minLength: minLength(6),
            maxLength: maxLength(8),
            sameAs: sameAs('password'),

        },

    },
    methods: {
        async register() {
            this.loading = true;
            this.errors = null;

            try {
              let user={
                name:this.name,
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation
              }
                const response = await axios.post("/register", user);
                if (201 == response.status) {
                    logIn();
                    this.$store.dispatch("fetchAuthUser");
                    this.$router.push({
                        name: "home"
                    });
                }
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }

            this.loading = false;
        }
    }
};
</script>
