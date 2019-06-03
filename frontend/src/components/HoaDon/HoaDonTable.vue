<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/3/19 11:27 AM
  -
  -->
<template>
    <mu-flex direction="column" align-items="stretch" style="height: 100%">
        <mu-flex justify-content="between">
            <h1>{{$lang.PRESCRIPTION.HISTORY}}</h1>
            <div style="width: 500px">
                <mu-text-field
                    full-width
                    type="search"
                    icon="search" :label="$lang.PRESCRIPTION.SEARCH" label-float=""></mu-text-field>
            </div>
        </mu-flex>
        <div style="flex: 1 1 auto">
            <paginate-table style="height: 100%"
                            @row-click="handleClick"
                            :data="tableItems"
                            :columns="columns"></paginate-table>
        </div>
    </mu-flex>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import PaginateTable from '@/components/PaginateTable/index.vue';
    import moment from 'moment';
    import {User} from "@/types/User";

    export default Vue.extend({
        name: 'hoa-don-table',
        components: {
            PaginateTable,
        },
        data() {
            return {
                columns: [
                    {title: 'ID', name: 'id', width: 200},
                    {title: 'Created At', name: 'created_at', sort: true,
                        formatter(val: number): string {
                            return moment(val).fromNow();
                        },
                    },
                    {title: 'Costs', name: 'total', sort: true},
                    {title: 'By', name: 'created_by',
                        formatter(val: User): string {
                            return val.name;
                        }
                    },
                ],

            };
        },
        computed: {
            ...mapGetters([
                'hoa_don/history',
            ]),

            tableItems(): any[] {
                const _this = this as any;
                return _this['hoa_don/history'];
            },
        },

        methods: {
            handleClick(item: any) {
                this.$router.push({
                    name: "ChiTietHoaDon",
                    params: {
                        id: item.id,
                    },
                });
            },
        },
    });
</script>

<style lang='scss'>
</style>
