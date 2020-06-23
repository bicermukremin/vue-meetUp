<template>
    <div class="content ml-0">
        <div class="container-fluid">
            <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
            <div
                class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
            >
                <div class="w-50 m-auto">
                    <div class="card card-body">
                        <div class="card-header">
                            <h2 class="text-center">Change Password</h2>
                        </div>
                        <form>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    class="form-control"
                                    v-model="password"
                                    @blur="$v.password.$touch()"
                                    :class="[
                                        { 'is-invalid': errorFor('password') },
                                        { 'is-invalid': $v.password.$error }
                                    ]"
                                />
                                <div
                                    v-if="$v.password.$error"
                                    class="form-error"
                                >
                                    <small
                                        v-if="!$v.password.required"
                                        class="form-text text-danger"
                                        >Bu alan zorunludur...</small
                                    >
                                    <small
                                        v-if="!$v.password.minLength"
                                        class="form-text text-danger"
                                        >Lütfen şifreniz en az
                                        {{ $v.password.$params.minLength.min }}
                                        karakterden oluşmalıdır...
                                    </small>
                                    <small
                                        v-if="!$v.password.maxLength"
                                        class="form-text text-danger"
                                        >Lütfen şifreniz en fazla
                                        {{ $v.password.$params.maxLength.max }}
                                        karakterden oluşmalıdır...
                                    </small>
                                </div>
                                <v-errors
                                    :errors="errorFor('password')"
                                ></v-errors>
                            </div>

                            <div class="form-group">
                                <label for="password_confirmation"
                                    >Password Confirmation</label
                                >
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Enter your password_confirmation"
                                    class="form-control"
                                    v-model="password_confirmation"
                                    @blur="$v.password_confirmation.$touch()"
                                    :class="[
                                        {
                                            'is-invalid': errorFor(
                                                'password_confirmation'
                                            )
                                        },
                                        {
                                            'is-invalid':
                                                $v.password_confirmation.$error
                                        }
                                    ]"
                                />
                                <div
                                    v-if="$v.password_confirmation.$error"
                                    class="form-error"
                                >
                                    <small
                                        v-if="
                                            !$v.password_confirmation.required
                                        "
                                        class="form-text text-danger"
                                        >Bu alan zorunludur...
                                    </small>
                                    <small
                                        v-if="
                                            !$v.password_confirmation.minLength
                                        "
                                        class="form-text text-danger"
                                        >Lütfen şifreniz en az
                                        {{
                                            $v.password_confirmation.$params
                                                .minLength.min
                                        }}
                                        karakterden oluşmalıdır...
                                    </small>
                                    <small
                                        v-if="
                                            !$v.password_confirmation.maxLength
                                        "
                                        class="form-text text-danger"
                                        >Lütfen şifreniz en fazla
                                        {{
                                            $v.password_confirmation.$params
                                                .maxLength.max
                                        }}
                                        karakterden oluşmalıdır...
                                    </small>
                                    <small
                                        v-if="!$v.password_confirmation.sameAs"
                                        class="form-text text-danger"
                                        >Girdiğiniz şifreler birbirleriyle
                                        uyuşmuyor...
                                    </small>
                                </div>
                                <v-errors
                                    :errors="errorFor('password_confirmation')"
                                ></v-errors>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary btn-lg btn-block"
                                :disabled="loading"
                                @click.prevent="changePassword"
                            >
                                Change Password
                            </button>

                            <hr />
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
    required,
    minLength,
    maxLength,
    sameAs
} from "vuelidate/lib/validators";

export default {
    mixins: [validationErrors],
    props: {
        id: {
            required: true
        }
    },
    data() {
        return {
            password: null,
            password_confirmation: null,
            loading: false
        };
    },
    validations: {
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(8)
        },
        password_confirmation: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(8),
            sameAs: sameAs("password")
        }
    },
    methods: {
        async changePassword() {
            this.loading = true;
            this.errors = null;

            try {
                let data = {
                    password: this.password,
                    id: this.id
                };
                const response = await axios.post("/app/reset-password", data);
                if (response.status) {
                    this.$toasted.success(response.data.message, {
                        theme: "bubble",
                        position: "top-center",
                        duration: 5000
                    });
                    this.$router.push({
                        name: "login"
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
