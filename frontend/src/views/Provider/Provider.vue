<template>
    <mu-flex direction="column" align-items="stretch">
        <div>
            <h1>{{$lang.PROVIDER.TITLE}}</h1>
        </div>
        <div style="flex: 1 1 auto;">
            <mu-paper :z-depth="1" style="height: 100%">
                <mu-data-table :no-data-text="$lang.EMPTY_DATA"
                               style="height: 100%"
                               border striped
                               @row-click="showProvider"
                               :columns="tableColumns">

                </mu-data-table>
            </mu-paper>
        </div>
    </mu-flex>
</template>


<script lang="ts">
    import Vue from 'vue';


    export default Vue.extend({
        name: 'kho-view',
        data() {
            return {
                tableColumns: [
                    {title: this.$lang.THUOC.ID, name: 'id'},
                    {title: this.$lang.PROVIDER.NAME, name: 'date'},
                    {title: this.$lang.ADDRESS, name: 'address'},
                    {title: this.$lang.PHONE, name: 'phoneContact'},
                ],
            }
        },

        methods: {
            showProvider(idx: number, row: any) {
                const id = row.id;
                this.$router.push(`/provider/${id}`);
            },
        },
    });

</script>
