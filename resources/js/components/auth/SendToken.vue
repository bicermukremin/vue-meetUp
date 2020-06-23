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
                            <h2 class="text-center">RESET PASSWORD</h2>
                        </div>
                        <form v-if="sendEmail">
                            <div class="form-group">
                                <label for="email">Token</label>
                                <input
                                    type="text"
                                    name="token"
                                    placeholder="Enter your token"
                                    class="form-control"
                                    v-model="token"
                                    @blur="$v.token.$touch()"
                                    :class="[
                                        { 'is-invalid': errorFor('token') },
                                        { 'is-invalid': $v.token.$error }
                                    ]"
                                />
                                <div v-if="$v.token.$error" class="form-error">
                                    <small
                                        v-if="!$v.token.required"
                                        class="form-text text-danger"
                                        >Bu alan zorunludur...</small
                                    >
                                </div>
                                <v-errors
                                    :errors="errorFor('token')"
                                ></v-errors>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary btn-lg btn-block"
                                :disabled="loading"
                                :loading="loading"
                                @click.prevent="validateToken"
                            >
                                Validate Token
                            </button>
                        </form>
                        <form v-else>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter your e-mail"
                                    class="form-control"
                                    v-model="email"
                                    @blur="$v.email.$touch()"
                                    :class="[
                                        { 'is-invalid': errorFor('email') },
                                        { 'is-invalid': $v.email.$error }
                                    ]"
                                />
                                <div v-if="$v.email.$error" class="form-error">
                                    <small
                                        v-if="!$v.email.required"
                                        class="form-text text-danger"
                                        >Bu alan zorunludur...</small
                                    >
                                    <small
                                        v-if="!$v.email.email"
                                        class="form-text text-danger"
                                        >Lütfen geçerli bir e-posta adresi
                                        giriniz...
                                    </small>
                                </div>
                                <v-errors
                                    :errors="errorFor('email')"
                                ></v-errors>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary btn-lg btn-block"
                                :disabled="loading"
                                :loading="loading"
                                @click.prevent="sendToken"
                            >
                                Send Token
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import validationErrors from "../../shared/mixins/validationErrors";

import { required, email } from "vuelidate/lib/validators";
export default {
    mixins: [validationErrors],
    data() {
        return {
            email: null,
            token: null,
            loading: false,
            sendEmail: false
        };
    },
    validations: {
        email: {
            required,
            email
        },
        token: {
            required
        }
    },
    methods: {
        async sendToken() {
            this.loading = true;
            this.errors = null;

            try {
                await axios
                    .post("/app/send-token", {
                        email: this.email
                    })
                    .then(response => {
                        if (response.status) {
                            this.sendEmail = true;
                            this.$toasted.success(response.data.message, {
                                theme: "bubble",
                                position: "top-center",
                                duration: 5000
                            });
                        }
                    });
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }

            this.loading = false;
        },
        async validateToken() {
            this.loading = true;
            this.errors = null;

            try {
                await axios
                    .post("/app/validate-token", {
                        token: this.token
                    })
                    .then(response => {
                        if (response.status) {
                            this.$router.push({
                                name: "changePassword",

                                params: { id: response.data.user.id }
                            });

                            this.$toasted.info(response.data.message, {
                                theme: "bubble",
                                position: "top-center",
                                duration: 5000
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
