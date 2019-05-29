<template>
    <mu-paper :z-depth="1">
        <mu-flex direction="column" align-items="stretch" style="height: 100%">
            <mu-data-table class="paginate-table"
                           stripe border :selectable="selectable"
                           :selects.sync="computed_selects" select-all
                           :columns="columns"
                           :data="data"></mu-data-table>
            <div class="paginate-table-paginate">
                <mu-pagination :current.sync="computed_page" :total="total"></mu-pagination>
            </div>
        </mu-flex>
    </mu-paper>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'paginate-table',
        props: {
            data: {
                type: Array,
                default: [],
            },
            columns: {
                type: Array,
                default: [],
            },
            selectable: {
                type: Boolean,
                default: false,
            },
            selects: {
                type: Array,
                default: [],
            },
            page: {
               type: Number,
               default: 1,
               min: 1,
            },
            total: {
                type: Number,
                default: 1,
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            computed_selects: {
                get(): any[] {
                    const _this = this as any;
                    return _this.selects.map((selected: any)=>{
                        return _this.data.findIndex((row: any) => row.id == selected.id);
                    });
                },

                set(value: any[]) {
                    const _this = this as any;
                    const filtered = _this.data.filter((val: any, idx: number) => {
                         return value.includes(idx);
                    });
                    _this.$emit("update:selects", filtered);
                },
            },

            computed_page: {
                get: function() {
                    return (this as any).page;
                },
                set: function (val: number) {
                    const _this = this as any;
                    _this.$emit("update:page", val);
                    _this.$emit("page-change", val);
                },
            },
        },
    });
</script>


<style lang="scss">
    .paginate-table {
        flex: 1 1 auto;
        &-paginate {
            flex: 0 0 auto;
            display: flex;
            justify-content: center;
            padding: 1em;
        }
    }
</style>
