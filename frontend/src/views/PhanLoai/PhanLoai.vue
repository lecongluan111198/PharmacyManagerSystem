<template>
    <mu-flex direction="column" align-items="stretch">
        <div>
            <h1>{{$lang.CATEGORY.TITLE}}</h1>
            <mu-flex justify-content="between">
                <mu-button color="green">{{$lang.ADD}}</mu-button>
                <mu-button color="brown">{{$lang.DELETE}}</mu-button>
            </mu-flex>
        </div>
        <mu-flex fill>
            <paginate-table
                :columns="columns"
                style="height: 100%"></paginate-table>
        </mu-flex>
    </mu-flex>
</template>

<script lang='ts'>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'phan-loai',
        components: {
            PaginateTable: ()=>import("@/components/PaginateTable/index.vue"),
        },
        data() {
            return {
                columns: [
                    {title: this.$lang.CATEGORY.NAME, name: 'name'},
                    {title: this.$lang.QUANTITY, name: 'medicine_amount'},
                ],
            };
        },
    });
</script>

<style lang='scss'>
</style>
