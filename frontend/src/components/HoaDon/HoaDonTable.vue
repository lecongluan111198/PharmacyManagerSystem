<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/3/19 11:27 AM
  -
  -->
<template>
    <mu-flex direction="column" align-items="stretch" style="height: 100%">
        <mu-flex justify-content="between" align-items="center">
            <h1>{{$lang.PRESCRIPTION.HISTORY}}</h1>
            <div>
                <el-date-picker v-model="daterange"
                                start-placeholder="Ngày bắt đầu"
                                end-placeholder="Ngày kết thúc"
                                @change="refresh"
                                type="daterange"></el-date-picker>
            </div>
        </mu-flex>
        <div style="flex: 1 1 auto; overflow: auto">
            <paginate-table style="height: 100%"
                            :selects="selects"
                            :loading="loading"
                            @row-click="handleClick"
                            :data="tableItems"
                            :total="total" :page.sync="page"
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
    import {DatePicker} from 'element-ui';

    Vue.use(DatePicker);

    export default Vue.extend({
        name: 'hoa-don-table',
        components: {
            PaginateTable,
        },
        data() {
            return {
                selects: [],
                columns: [
                    {title: 'ID', name: 'id', width: 100},
                    {title: 'Created At', name: 'created_at', sort: true,
                        formatter(val: number): string {
                            return moment(val).utc(true).fromNow();
                        },
                    },
                    {title: 'Costs', name: 'cost', sort: true},
                    {title: 'By', name: 'created_by',
                        formatter(val: User): string {
                            return val ? val.name : '---';
                        }
                    },
                ],
            };
        },
        computed: {
            ...mapGetters([
                'hoa_don/list',
                'hoa_don/page',
                'hoa_don/total',
                'hoa_don/daterange',
            ]),

            page: {
                get(): number {
                    const _this = this as any;
                    return _this['hoa_don/page'];
                },
                async set(page: number) {
                    await this.$store.dispatch("hoa_don/fetchList", {page});
                },
            },
            total(): number {
                const _this = this as any;
                return _this['hoa_don/total'];
            },

            daterange: {
                get(): Date[] {
                    const _this = this as any;
                    return _this['hoa_don/daterange'];
                },
                set(daterange: Date[]) {
                    const _this = this as any;
                    _this.$store.commit('hoa_don/daterange', daterange);
                },
            },

            loading(): boolean {
                return this.$store.getters['hoa_don/loading'];
            },

            tableItems(): any[] {
                const _this = this as any;
                return _this['hoa_don/list'];
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
            refresh() {
                this.$store.dispatch("hoa_don/fetchList");
            }
        },

        async mounted() {
            await this.$store.dispatch("hoa_don/fetchList");
            console.debug("loaded");
        }
    });
</script>

<style lang='scss'>
</style>
