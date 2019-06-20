<template>
    <div v-if="loading" class="app app-loading">
        <mu-circular-progress :size='64' :stroke-width="5"></mu-circular-progress>
    </div>
    <div v-else id="app" class="app">
        <Sidebar v-if="hasSidebar"></Sidebar>
        <router-view class="app-body"/>
        <mu-dialog transition="slide-top"  scrollable
                   :open="!!$route.meta.isModal"
                   @close="onModalClose">
            <router-view name="modal_content"></router-view>
        </mu-dialog>

        <mu-dialog width="600"
                   :open.sync="error.open">
            <template slot="title">
                <h2 style="color: brown; margin: auto">
                    ERROR
                </h2>
            </template>
            {{error.content}}
        </mu-dialog>
    </div>
</template>

<style lang="scss">
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
            error: {
                open: false,
                content: '',
            },
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
        },

        handleError(e: ErrorEvent | PromiseRejectionEvent | any) {
            this.error = {
                open: true,
                content: e.message || e.reason,
            };
        },

        handleKeyDown(e: KeyboardEvent) {
            if (e.altKey) {
                let matchKey = true;
                this.$store.commit("showAllHotkey");

                switch (e.key) {
                    case "1":
                        this.$router.push('/');
                        break;
                    case "2":
                        this.$router.push('/hoadon');
                        break;
                    case "3":
                        this.$router.push('/thuoc');
                        break;

                    default:
                        matchKey = false;
                }
                if (matchKey) {
                    e.preventDefault();
                }
            }
        },
        handleKeyUp(e: KeyboardEvent) {
            this.$store.commit("showAllHotkey", false);
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

    created(): void {
        window.addEventListener("unhandledrejection", this.handleError.bind(this));
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    },
    destroyed(): void {
        window.removeEventListener('error', this.handleError);
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    },
})
</script>
