<template>
    <div id="login-page" style="height: 100%">
        <mu-flex align-items="center" style="height: 100%">
            <mu-form class="login-form" @submit="onSubmit" :model="form">
                <div>
                    <mu-text-field label="Email" label-float type="email" 
                        v-model="form.email"
                        autofocus
                        required
                        name="email"></mu-text-field>
                </div>
                <div>
                    <mu-text-field label="Password" label-float type="password" 
                        v-model="form.password"
                        required
                        name="password"></mu-text-field>
                </div>
                <mu-flex justify-content="center">
                    <mu-button type="submit" color='primary'>LOGIN</mu-button>
                </mu-flex>
            </mu-form>
        </mu-flex>
    </div>
</template>

<style lang="scss" scoped>
    #login-page {
        background-color: #0008;
        background-image: url("../assets/login.jpg");
        background-size: cover;
        background-origin: 50% 0;
        background-blend-mode: darken;
    }
    .login-form {
        width: auto;
        padding: 2em;
        margin-left: 300px;
        background: white;
        box-shadow: 0px 10px 40px #0002;
    }
</style>


<script lang="ts">
import Vue from 'vue'
import {auth} from '@/firebase';

export default Vue.extend({
    name: "LoginPage",
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        onSubmit(ev: Event) {
            ev.preventDefault();
            auth.signInWithEmailAndPassword(this.form.email, this.form.password)
            .then(credential=>{
                if (credential.user) {
                    this.$router.replace('/');
                }
            });
        }
    }
})
</script>
