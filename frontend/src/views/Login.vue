<template>
    <mu-flex justify-content='center'>
        <mu-paper>
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
                <mu-button type="submit" color="primary">LOGIN</mu-button>
            </mu-form>
        </mu-paper>
    </mu-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import axios from '@/axios';

@Component
export default class Login extends Vue {
    // DATA
    form = {
        email: '',
        password: '',
    }


    async submit(ev: Event): Promise<void> {
        ev.preventDefault();

        const res = await axios.post('/api/login', {
            email: this.form.email,
            password: this.form.password,
        });

        if (res.status >= 200 && res.status < 300) {
            const accessToken = res.data.token;
            localStorage.setItem('accessToken', accessToken);
        }
    }
}

</script>

