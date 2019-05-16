<template>
    <mu-flex justify-content='center' align-items="center" class="app-login">
        <mu-paper style="padding: 2em" :z-depth="10">
            <mu-alert color="error" v-show="error">
                <mu-icon left value="warning"></mu-icon>
                {{error}}
            </mu-alert>
            <mu-form :model="form" @submit="submit">
                <div>
                    <mu-text-field label="Email"
                        name="email"
                        type="email" v-model="form.email" required></mu-text-field>
                </div>
                <div>
                    <mu-text-field label="Password"
                        name="password"
                        type="password" v-model="form.password" required></mu-text-field>
                </div>
                <mu-flex justify-content="center">
                    <mu-button type="submit" color="primary">LOGIN</mu-button>
                </mu-flex>
            </mu-form>
        </mu-paper>
    </mu-flex>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator';
    import API from "@/api";

    @Component
export default class Login extends Vue {
    // DATA
    form = {
        email: '',
        password: '',
    };
    error: string = '';


    async submit(ev: Event): Promise<void> {
        ev.preventDefault();
        this.error = '';
        try {
            const res = await API.login({
                email: this.form.email,
                password: this.form.password,
            });

            const accessToken = res.data;
            localStorage.setItem('accessToken', accessToken);
            window.location.href = '/';
        } catch (e) {
            const error = e as Error;
            this.error = error.message;
        }
    }
}

</script>

