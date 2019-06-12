<template>
    <mu-paper :z-depth="1">
        <mu-flex direction="column" align-items="stretch" style="height: 100%">
            <mu-data-table style="flex-grow: 1; overflow: auto"
                           :columns="columns" border stripe
                           :data="list" :loading="!loaded"
                           :sort.sync="sort"
                           :no-data-text="$lang.EMPTY_DATA"
                           :key="sort.name"
                           @sort-change="onSortChange"
                           @row-click="select">
            </mu-data-table>
            <mu-flex justify-content="center" style="padding: 1em">
                <mu-pagination raised
                               :current.sync="page" :total="$store.getters['thuoc/total']" :page-size="20"></mu-pagination>
            </mu-flex>
        </mu-flex>
    </mu-paper>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Thuoc as ThuocType} from "@/types/Thuoc";

    export default Vue.extend({
        name: "thuoc-table",
        props: {
            search: String,
        },
        data() {
            return {
                list: [] as ThuocType[],
                sort: {
                    name: '',
                    order: 'asc',
                },
                columns: [
                    {title: this.$lang.THUOC.ID, name: 'id', sortable: true},
                    {title: this.$lang.THUOC.NAME, name: 'name', sortable: true},
                    {
                        title: this.$lang.THUOC.PROVIDER, name: 'provider', sortable: false,
                        formatter(value: any) {
                            return value ? value.name : '';
                        }
                    },
                    {
                        title: this.$lang.CATEGORY.TITLE, name: 'category', sortable: true,
                        formatter(value: any) {
                            return value ? value.name : '';
                        },
                    },
                    {
                        title: this.$lang.THUOC.PRICE, name: 'cost', sortable: true,
                        formatter(value: string) {
                            return value.toLocaleString();
                        },
                    },
                    {title: this.$lang.QUANTITY, name: 'amount'},
                ],
            };
        },
        computed: {
            page: {
                get(): number {
                    return (this as any).$store.getters['thuoc/page'];
                },
                set(page: number) {
                    const _this = this as any;
                    _this.$store.dispatch("thuoc/fetchListThuoc", {page}).then((list: any) => {
                        Vue.set(_this, 'list', list);
                    });
                },
            },
            loaded() {
                return !this.$store.getters['thuoc/loading'];
            },
        },
        methods: {
            select(index: number, row: ThuocType): void {
                this.$router.push("/thuoc/" + row.id);
            },
            onSortChange() {
                const _this = this as any;
                const payload = {
                    sort: _this.sort,
                    search: _this.search,
                };
                _this.$store.dispatch("thuoc/fetchListThuoc", payload).then((list: any) => {
                        _this.$set(this, 'list', list);
                });
            },
        },
        watch: {
            search() {
                (this as any).onSortChange();
            },
        },

        created(): void {
            this.$store.dispatch("thuoc/fetchListThuoc").then((list) => {
                this.$set(this, 'list', list);
            });
        }
    });
</script>
