<template>
    <div id="admin" style="height: 100%">
        <mu-flex justify-content="center" align-items="center" v-if="!loaded">
            <mu-circular-progress :size="64"></mu-circular-progress>
        </mu-flex>
        <div v-else>
            <div v-if="isAdmin">
                <h1>ADMIN PAGE</h1>
            </div>
            <div v-else>
                <h1>YOU ARE NOT ADMIN</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import {UserRole} from "@/types/User";

    export default Vue.extend({
        data() {
            return {
                loaded: false,
                isAdmin: false,
            };
        },

        computed: {
            ...mapGetters(['me']),
        },

        // HOOK
        mounted() {
            this.loaded = true;
            if (this.me && this.me.role === UserRole.ADMIN) {
                this.isAdmin = true;
            }
        },
    });
</script>
