<template>
    <div id="error-wrapper">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    
    export default Vue.extend({
        created() {
            window.addEventListener('unhandledrejection', (rejection) => {
                // @ts-ignore
                this.$log.warn(rejection.reason);
                this.$toasted.show(rejection.reason, {
                    type: "error",
                });
            });

            window.addEventListener('error', (error) => {
                // @ts-ignore
                this.$log.error(error.message);
                this.$toasted.show(error.message, {
                    type: "error",
                });
            });
        },
    })
</script>
