<template>
    <mu-flex id="receipt-history" direction="row" wrap="nowrap" align-items="stretch">
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
            <paginate-table style="height: 100%"
                            :row-class-name="rowClassName"
                            :loading="loading"
                            :page.sync="page"
                            :total="total"
                            :columns="tableColumns"
                            :data="listReceipt"></paginate-table>
        </div>
    </mu-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapGetters} from "vuex";
    import moment from "moment";
    const PaginateTable = ()=>import('@/components/PaginateTable/index.vue');

    export default Vue.extend({
        name: 'kho-view',
        components: {
            PaginateTable,
        },
        data() {
            return {
                filter: {
                    import: false,
                    export: false,
                },

                loading: false,

                tableColumns: [
                    {title: this.$lang.THUOC.ID, name: 'id'},
                    {title: this.$lang.DATETIME, name: 'created_at',
                        formatter(val: any): string {
                            const m = moment(val);
                            return m.format('DD/MM/YY') + ", " + m.fromNow();
                        }
                    },
                    {title: this.$lang.INVENTORY.TYPE, name: 'type',
                        formatter(val: number) {
                            return val === 0 ? "Nhập" : "Xuất";
                        }},
                    {title: this.$lang.NOTE, name: 'note'},
                ],
            }
        },
        computed: {
            ...mapGetters([
                'receipt/list',
                'receipt/page',
                'receipt/total',
            ]),

            listReceipt() {
                return (<any>this)['receipt/list'];
            },
            total() {
                return (this as any)['receipt/total'];
            },
            page: {
                get() {
                    return this.$store.getters['receipt/page'];
                },
                set(page: number) {
                    this.$store.commit('receipt/setPage', page);
                    this.reload();
                }
            },
        },

        watch: {
            filter: {
                handler(val: any = {}) {
                    if (val.import === val.export) {
                        // (true, true) same as (false, false)
                        this.$store.commit('receipt/setType', null)
                    } else if (val.import) {
                        this.$store.commit('receipt/setType', 0)
                    } else if (val.export) {
                        this.$store.commit('receipt/setType', 1)
                    }
                    this.reload()
                },
                deep: true,
            }
        },

        methods: {
            rowClassName(index: number, item: any) {
                return item.type === 0 ? 'import' : 'export';
            },

            async reload() {
                this.loading = true;
                await this.$store.dispatch("receipt/getList");
                this.loading = false;
            }
        },

        created(): void {
            this.reload();
        }
    });

</script>

<style lang="scss">
    #receipt-history {
        table tr {
            &.export {
                background-color: lightsalmon;
            }
            &.import {
                background-color: lightblue;
            }
        }
    }
</style>
