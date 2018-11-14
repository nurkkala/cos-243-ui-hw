<template>
    <div>
        <h4 class="display-1">Sign Up</h4>

        <instructions details="Sign up for our nifty site."/>

        <v-form v-model="valid">
            <v-text-field
                    v-model="email"
                    v-bind:rules="rules.email"
                    error-count="10"
                    type="email"
                    label="Your email address">
            </v-text-field>
            <v-text-field
                    v-model="password"
                    v-bind:rules="rules.password"
                    error-count="10"
                    type="password"
                    label="Non-trivial password"
                    required>
            </v-text-field>
            <v-btn v-bind:disabled="!valid"
                   v-on:click="handleSubmit">Sign Up
            </v-btn>
        </v-form>

        <div class="text-xs-center">
            <v-dialog v-model="dialogVisible" width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        Account Created
                    </v-card-title>

                    <v-card-text>
                        We've created your account. Welcome.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="closeDialog">
                            Okay
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    import Instructions from "../components/Instructions.vue";

    export default {
        name: 'SignUpPage',
        components: {
            Instructions
        },
        data: function () {
            return {
                valid: false,
                email: "",
                password: "",
                dialogVisible: false,
                rules: {
                    email: [
                        val => /^\w+@\w+\.\w{2,}$/.test(val) || 'Invalid e-mail'
                    ],
                    password: [
                        val => /[A-Z]/.test(val) || 'Need upper case letter',
                        val => /[a-z]/.test(val) || 'Need lower case letter',
                        val => /\d/.test(val) || 'Need digit',
                        val => val.length >= 8 || 'Minimum 8 characters'
                    ]
                }
            };
        },
        methods: {
            handleSubmit: function () {
                this.dialogVisible = true;
            },
            closeDialog: function () {
                this.dialogVisible = false;
                this.$router.push({name: 'home-page'})
            }
        }
    };
</script>