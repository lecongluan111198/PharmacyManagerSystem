<template>
    <div id="app-sidebar" :class="sidebarClass" v-if="hasSidebar">
        <mu-list class="nav">
            <mu-list-item button icon @click="open = !open">
                <mu-list-item-action class="nav-item-action">
                    <mu-icon :value="open ? 'arrow_left' : 'arrow_right'"></mu-icon>
                </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button color="dark" class="nav-item" to="/" active-class='active'>
                <mu-list-item-action class="nav-item-action">
                    <mu-icon value='home'></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title class='nav-title'>
                    Home
                </mu-list-item-title>
            </mu-list-item>
        </mu-list>

        <mu-list class="nav nav-bottom">
            <mu-list-item button to='/settings' class="nav-item">
                <mu-list-item-action class="nav-item-action">
                    <mu-icon value="settings"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title class="nav-title">Setting</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="logout" class="nav-item">
                <mu-list-item-action class="nav-item-action">
                    <mu-icon value="exit_to_app"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title class="nav-title">Log out</mu-list-item-title>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {auth} from '@/firebase';

    export default Vue.extend({
        name: "Sidebar",
        data() {
            return {
                open: true,
            };
        },
        computed: {
            hasSidebar(): boolean {
                return this.$route.name !== "LoginPage" && this.$route.name !== "SignupPage";
            },

            sidebarClass(): Object {
                return {
                    "app-sidebar": true,
                    "open": this.open,
                };
            }
        },
        methods: {
            logout(): void {
                auth.signOut().then(_=>{
                    this.$router.replace('/login');
                });
            }
        }
    })
</script>
