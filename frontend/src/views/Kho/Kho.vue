<template>
    <mu-flex direction="column" align-items="stretch" style="height: 100%">
        <div style="flex: 0 0 auto">
            <mu-flex class="kho-control" align-items="center">
                <h1>{{'Ten Nha Thuoc'}}</h1>
                <mu-button color="info"
                           to="/kho/nhap"
                           v-tooltip="{content: 'Alt + I', show: showAllHotkey}">
                    <mu-icon left value="cloud_download"></mu-icon>
                    {{$lang.INVENTORY.IMPORT}}
                </mu-button>

                <mu-button color="error"
                           to="/kho/nhap"
                           v-tooltip="{content: 'Alt + E', show: showAllHotkey}">
                    <mu-icon left value="cloud_upload"></mu-icon>
                    {{$lang.INVENTORY.EXPORT}}
                </mu-button>

            </mu-flex>
        </div>
        <mu-flex fill>
            <thuoc-table style="width: 100%"></thuoc-table>
        </mu-flex>
    </mu-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapGetters} from "vuex";
    const ThuocTable = ()=>import("@/components/Thuoc/ThuocTable.vue");

    export default Vue.extend({
        name: 'kho-view',
        components: {
            ThuocTable,
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
        computed: {
            ...mapGetters([
                'showAllHotkey',
            ]),
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
