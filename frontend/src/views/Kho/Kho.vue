<template>
    <mu-flex direction="column" align-items="stretch" style="height: 100%">
        <div style="flex: 0 0 auto">
            <h1>{{'Ten Nha Thuoc'}}</h1>
            <mu-flex class="kho-control">
                <mu-button color="info">
                    <mu-icon left value="cloud_download"></mu-icon>
                    {{$lang.INVENTORY.IMPORT}}
                </mu-button>
                <mu-button color="error">
                    <mu-icon left value="cloud_upload"></mu-icon>
                    {{$lang.INVENTORY.EXPORT}}
                </mu-button>
            </mu-flex>
        </div>
        <mu-flex fill>
            <paginate-table style="height: 100%;width: 100%"
                            :loading="loading"
                            :columns="tableColumns"></paginate-table>
        </mu-flex>
    </mu-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import PaginateTable from '@/components/PaginateTable/index.vue';

    export default Vue.extend({
        name: 'kho-view',
        components: {
            PaginateTable,
        },
        data() {
            return {
                loading: false,
                tableColumns: [
                    {title: this.$lang.THUOC.ID, name: 'id'},
                    {title: this.$lang.THUOC.NAME, name: 'name'},
                    {title: this.$lang.QUANTITY, name: 'quantity'},
                    {title: this.$lang.NOTE, name: 'note'},
                ],
            }
        },
    });

</script>


<style lang="scss">
    .kho-control {
        padding: 0.5em;
        > button {
            margin-right: 1em;
        }
    }
</style>
