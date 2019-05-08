<template>
    <ErrorWraper>
        <div v-if="loading">
            <mu-flex justify-content="center" align-items="center" style="height: 100vh">
                <mu-circular-progress :stroke-width="10" :size="100"></mu-circular-progress>
            </mu-flex>
        </div>
        <div v-else id="app" class="app">
            <Sidebar></Sidebar>
            <router-view class="app-content"/>
        </div>
    </ErrorWraper>
</template>

<style lang="scss">
    @import "./assets/styles/app_layout.scss";
</style>


<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import ErrorWraper from '@/components/ErrorWrapper.vue';
import {mapActions} from 'vuex';

export default Vue.extend({
    name: "App",
    components: {
        Sidebar,
        ErrorWraper,
    },
    data() {
        return {
            loading: true,
        }
    },
    created() {
        this.$store.dispatch('user/fetchMe')
            .then(()=>{
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
                if (this.$route.path !== "/login" && this.$route.path !== "/logout") {
                    this.$router.replace('/login');
                }
            })
    }
})
</script>
