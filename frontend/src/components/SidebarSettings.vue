<template>
    <mu-menu>
        <mu-button icon>
            <mu-icon value="settings"></mu-icon>
        </mu-button>
        <mu-list slot="content">
            <mu-list-item button>
                <mu-list-item-action>
                    <mu-icon value="account_box"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>Profile</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="logout">
                <mu-list-item-action>
                    <mu-icon value="exit_to_app"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>Logout</mu-list-item-title>
            </mu-list-item>
        </mu-list>
    </mu-menu>
</template>

<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        name: "SidebarSettings",
        methods: {
            logout(): void {
                localStorage.removeItem("accessToken");
                window.location.href = '/login';
            },
        }
    })
</script>
