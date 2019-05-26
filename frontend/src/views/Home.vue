<template>
    <div class="sale">
        <search-box ></search-box>
        <prescription-current></prescription-current>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import SearchBox from "@/components/Thuoc/SearchBox.vue";
    import PrescriptionCurrent from "@/components/Thuoc/PrescriptionCurrent.vue";

    export default Vue.extend({
        components: {
            SearchBox,
            PrescriptionCurrent,
        },
    });
</script>
