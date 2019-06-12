
<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/3/19 12:48 PM
  -
  -->

<template>
    <div>
        <div v-if="loaded && hoadon">
            <mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>{{$lang.THUOC.ID}}</h2>
                        <p>{{hoadon.id}}</p>
                    </div>
                </mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>Created at</h2>
                        <p>{{hoadon.created_at}}</p>
                    </div>
                </mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>By</h2>
                        <p>
                            <a :to="'/profile/' + hoadon.created_by.id">
                                {{hoadon.created_by.name}}
                            </a>
                        </p>
                    </div>
                </mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>{{$lang.PRESCRIPTION.TOTAL_COST}}</h2>
                        <p>{{hoadon.cost.toLocaleString('vi')}}</p>
                    </div>
                </mu-flex>
            </mu-flex>
            <mu-data-table :columns="showColumns"
                           border
                           :height="300"
                           :data="hoadon.medicines"></mu-data-table>
            <mu-flex style="margin: 1em 0" justify-content="end">
                <mu-button color="error" icon>
                    <mu-icon value="delete"></mu-icon>
                </mu-button>
                <mu-tooltip :content="$lang.EDIT">
                    <mu-button color="primary" icon>
                        <mu-icon value="edit"></mu-icon>
                    </mu-button>
                </mu-tooltip>
            </mu-flex>
        </div>
        <div v-else>
            <loader></loader>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {HoaDon} from "@/types/HoaDon";

    // @ts-ignore
    import Loader from 'vue-spinner/src/GridLoader.vue';

    export default Vue.extend({
        name: 'chi-tiet-hoa-don',
        components: {
            Loader,
        },
        data() {
            return {
                showColumns: [
                    {title: 'id', name: 'id', width: 100},
                    {title: this.$lang.THUOC.NAME, name: 'name'},
                    {title: this.$lang.QUANTITY, name: 'amount',
                        formatter(val: any) {
                            return val ? val.amount : '';
                        }
                    },
                    {title: this.$lang.PRESCRIPTION.TOTAL_COST, name: 'cost',
                        formatter(val: number) {
                            return val.toLocaleString('vi') + ' đ';
                        }
                    },
                ],
            };
        },
        computed: {
            hoaDonId(): number {
                return +this.$route.params.id;
            },
            loaded(): boolean {
                return !this.$store.getters['hoa_don/detail/loading'];
            },
            hoadon(): HoaDon {
                return this.$store.getters['hoa_don/detail/current'];
            }
        },
        mounted(): void {
            this.$store.dispatch('hoa_don/detail/load', this.hoaDonId);
        }
    });
</script>

<style lang='scss'>
</style>
