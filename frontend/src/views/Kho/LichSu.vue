<template>
    <mu-flex direction="row" wrap="nowrap" align-items="stretch">
        <!-- FILTER -->
        <mu-list style="flex: 0 0 auto; width: 220px">
            <mu-list-item>
                <mu-list-item-action>
                    <mu-checkbox v-model="filter.import"></mu-checkbox>
                </mu-list-item-action>
                <mu-list-item-title>{{$lang.INVENTORY.IMPORT}}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
                <mu-list-item-action>
                    <mu-checkbox v-model="filter.export"></mu-checkbox>
                </mu-list-item-action>
                <mu-list-item-title>{{$lang.INVENTORY.EXPORT}}</mu-list-item-title>
            </mu-list-item>
        </mu-list>

        <!-- DATA -->
        <div style="flex: 1 1 auto">
            <mu-paper :z-depth="2" style="height: 100%">
                <mu-data-table :no-data-text="$lang.EMPTY_DATA"
                               style="height: 100%"
                               border striped
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
                filter: {
                    import: false,
                    export: false,
                },

                tableColumns: [
                    {title: this.$lang.THUOC.ID, name: 'id'},
                    {title: this.$lang.DATETIME, name: 'date'},
                    {title: this.$lang.INVENTORY.TYPE, name: 'type'},
                    {title: this.$lang.NOTE, name: 'note'},
                ],
            }
        },
    });

</script>
