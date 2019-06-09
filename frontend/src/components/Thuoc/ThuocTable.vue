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
                               @change="onSortChange"
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
                loaded: false,
                list: [] as ThuocType[],
                page: 1 as number,
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
                ],
            };
        },
        methods: {
            select(index: number, row: ThuocType): void {
                this.$router.push("/thuoc/" + row.id);
            },
            onSortChange() {
                const payload = {
                    page: this.page,
                    sort: this.sort,
                    search: this.search,
                };
                this.$store.dispatch("thuoc/fetchListThuoc", payload).then((list) => {
                    this.$set(this, 'list', list);
                    this.loaded = true;
                });
            },
        },
        watch: {
            search() {
                this.onSortChange();
            },
        },

        created(): void {
            this.$store.dispatch("thuoc/fetchListThuoc").then((list) => {
                this.list = list;
                this.loaded = true;
            });
        }
    });
</script>
