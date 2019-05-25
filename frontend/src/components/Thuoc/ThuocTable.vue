<template>
    <mu-paper :z-depth="1" >
        <mu-flex direction="column" align-items="stretch" style="height: 100%">
            <mu-data-table style="flex-grow: 1; overflow: auto"
                           :columns="columns" border stripe
                           :data="list" :loading="!loaded"
                           :sort.sync="sort"
                           @row-click="select"
                           @sort-change="handleSortChange">
            </mu-data-table>
            <mu-flex justify-content="center" style="padding: 1em">
                <mu-pagination raised :total="1000"></mu-pagination>
            </mu-flex>
        </mu-flex>
    </mu-paper>
</template>

<script lang="ts">
    import Vue from 'vue';
<<<<<<< HEAD
=======
    import _ from 'lodash';
>>>>>>> master
    import {Thuoc as ThuocType} from "@/types/Thuoc";

    export default Vue.extend({
        name: "thuoc-table",
        data () {
            return {
                loaded: true,
                sort: {
                    name: '',
                    order: 'asc'
                },
                columns: [
                    { title: this.$lang.THUOC.ID, name: 'id', sortable: true },
                    { title: this.$lang.THUOC.NAME, name: 'name', sortable: true },
                    {
                        title: this.$lang.THUOC.PROVIDER, name: 'provider', sortable: true,
                        formatter(value: any) {
                            return value.name;
                        }
                    },
                    {
                        title: this.$lang.THUOC.PRICE, name: 'price', sortable: true,
                        formatter(value: string) {
                            return value.toLocaleString();
                        },
                    },
                    {title: this.$lang.THUOC.IN_STORE, name: 'in_store_count', sortable: true},
                    {title: this.$lang.THUOC.IN_INVENTORY, name: 'in_inventory_count', sortable: true},
                ],
                list: [
                    {
                        id: "ABC123", store_id: 1,
                        name: "Thuốc trị trĩ", price: 10000,
                        provider: {
                            id: 1, store_id: 1,
                            name: "Duoc Hau Giang",
                        },
                        in_store_count: 100,
                        in_inventory_count: 200,
                    },
                    {
                        id: "ABC124", store_id: 1,
                        name: "Thuốc xyz", price: 20000,
                        provider: {
                            id: 1, store_id: 1,
                            name: "Duoc Hau Giang",
                        },
                        in_store_count: 100,
                        in_inventory_count: 50,
                    },
                ] as ThuocType[],
            };
        },
        methods: {
            handleSortChange ({name, order}: any) {
                this.loaded = false;
                setTimeout(()=>{
                    this.list = this.list.sort((a: any, b: any)=>{
                        return (order === 'asc')
                            ? (a[name] > b[name] ? 1 : -1)
                            : (a[name] < b[name] ? 1 : -1);
                    });
                    this.loaded = true;
                }, 1000);
            },

            select(index: number, row: ThuocType): void {
                this.$router.push("/thuoc/" + row.id);
            },
        },
    });
</script>
