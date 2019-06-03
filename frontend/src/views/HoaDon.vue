<template>
    <div>
        <hoa-don-table></hoa-don-table>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import HoaDonTable from '@/components/HoaDon/HoaDonTable.vue';

    export default Vue.extend({
        name: 'hoa-don',
        components: {
            HoaDonTable,
        },
        data() {
            return {};
        },
    });
</script>

<style lang='scss'>
</style>
