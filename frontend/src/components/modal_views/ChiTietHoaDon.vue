
<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/3/19 12:48 PM
  -
  -->

<template>
    <div>
        <h1 class="is-center">Chi tiết đơn thuốc</h1>
        <div v-if="loaded && hoadon">
            <mu-flex>
                <mu-flex fill direction="column">
                    <div>
                        <strong>{{'Mã đơn thuốc'}}</strong>: {{hoadon.id}}
                    </div>
                    <div>
                        <strong>{{'Mã nhà thuốc'}}</strong>: {{hoadon.store_id}}
                    </div>
                </mu-flex>
                <mu-flex fill direction="column">
                    <div>
                        <strong>{{'Mã nhân viên'}}</strong>: {{hoadon.created_by.id}}
                    </div>
                    <div>
                        <strong>{{'Tên nhân viên'}}</strong>: {{hoadon.created_by.name}}
                    </div>
                    <div>
                        <strong>{{'Ngày nhập'}}</strong>: {{invoiceDate}}
                    </div>
                </mu-flex>
            </mu-flex>
            <mu-flex>
                <h3>
                    <strong>{{$lang.PRESCRIPTION.TOTAL_COST}}</strong>: {{hoadon.cost.toLocaleString('vi')}}
                    <span>đ</span>
                </h3>
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
    import moment from "moment";

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
                            return val && val.amount ? val.amount.amount : '';
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
            },
            invoiceDate(): string {
                return moment(this.hoadon.created_at).format("dd - DD/MM/YY");
            }
        },
        mounted(): void {
            this.$store.dispatch('hoa_don/detail/load', this.hoaDonId);
        }
    });
</script>

<style lang='scss'>
</style>
