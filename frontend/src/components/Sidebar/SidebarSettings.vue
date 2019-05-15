<template>
    <mu-menu>
        <mu-button icon>
            <mu-icon value="settings"></mu-icon>
        </mu-button>
        <mu-list slot="content" style="width: 200px">
            <template v-if="isAdmin">
                <mu-sub-header>Admin</mu-sub-header>
                <mu-list-item button to="/admin">
                    <mu-icon value="font_download"></mu-icon>&nbsp;
                    Admin
                </mu-list-item>
                <mu-list-item button to="/admin/nhanvien">
                    <mu-icon value="supervised_user_circle"></mu-icon>&nbsp;
                    Nhân viên
                </mu-list-item>
                <mu-list-item button to="/all/report">
                    <mu-icon value="insert_chart"></mu-icon>&nbsp;
                    Báo cáo
                </mu-list-item>
                <mu-divider></mu-divider>
            </template>
            <template>
                <mu-sub-header>General</mu-sub-header>
                <mu-list-item button to="/profile">
                    <mu-icon value="account_box"></mu-icon>&nbsp;
                    Profile
                </mu-list-item>
                <mu-list-item button @click="logout">
                    <mu-icon value="exit_to_app"></mu-icon>&nbsp;
                    Logout
                </mu-list-item>
            </template>
        </mu-list>
    </mu-menu>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import {UserRole} from "@/types";

    export default Vue.extend({
        name: "SidebarSettings",
        methods: {
            logout(): void {
                localStorage.removeItem("accessToken");
                window.location.href = '/login';
            },
        },
        computed: {
            ...mapGetters(['me']),

            isAdmin(): boolean {
                const self = this as any;
                return self.me && self.me.role === UserRole.ADMIN;
            },
        }
    })
</script>
