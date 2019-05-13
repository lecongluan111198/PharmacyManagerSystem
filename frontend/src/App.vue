<template>
    <div v-if="loading" class="app app-loading">
        <mu-circular-progress :size='64' :stroke-width="5"></mu-circular-progress>
    </div>
    <div v-else id="app" class="app">
        <Sidebar v-if="hasSidebar"></Sidebar>
        <router-view class="app-body"/>
    </div>
</template>

<style lang="scss">
    @import "assets/app.layout";
</style>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar.vue';

export default Vue.extend({
    components: {
        Sidebar,
    },
    data() {
        return {
            loading: true,
        }
    },

    computed: {
        hasSidebar(): boolean {
            return this.$route.path !== "/login";
        },
    },

    mounted() {
        if (this.$route.path === '/login') {
            this.loading = false;
            return;
        }
        this.$store.dispatch("fetchMe")
            .then(()=>{
                this.loading = false;
            })
            .catch((error: Error)=>{
                this.loading = false;
                console.log(error.message);
                this.$router.push('/login');
            });
    },
})
</script>
