<template>
    <div v-if="loading" class="app app-loading">
        <mu-circular-progress :size='64' :stroke-width="5"></mu-circular-progress>
    </div>
    <div v-else id="app" class="app">
        <Sidebar v-if="hasSidebar"></Sidebar>
        <router-view class="app-body"/>
        <mu-dialog width="800"
                   transition="slide-top"
                   scrollable :open="!!$route.meta.isModal" v-on:close="onModalClose">
            <router-view name="modal_content"></router-view>
        </mu-dialog>
    </div>
</template>

<style lang="scss">
    @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
    @import "../node_modules/ag-grid-community/dist/styles/ag-theme-material.css";
    @import "assets/app.layout";
</style>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

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

    methods: {
        onModalClose() {
            const lastPath = this.$store.state.parentModalPath || '/';
            this.$router.push(lastPath);
        }
    },

    mounted() {
        if (this.$route.path === '/login') {
            this.loading = false;
            console.log("LOGIN");
            return;
        }
        this.$store.dispatch("fetchMe")
            .catch((error: Error)=>{
                console.log(error.message);
                this.$router.push('/login');
            }).finally(()=>{
                this.loading = false;
            });
    },
})
</script>
