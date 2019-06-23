
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
                    <table>
                        <tr>
                            <td><strong>{{'Mã đơn thuốc'}}</strong></td>
                            <td>{{hoadon.id}}</td>
                        </tr>
                    </table>
                    <tr>
                        <td><strong>{{'Mã nhà thuốc'}}</strong></td>
                        <td>{{hoadon.store_id}}</td>
                    </tr>
                </mu-flex>
                <mu-flex fill direction="column">
                    <table>
                        <tr>
                            <td>
                                <strong>{{'Mã nhân viên'}}</strong>:
                            </td>
                            <td>
                                <mu-button flat>{{hoadon.created_by.id}}</mu-button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{{'Tên nhân viên'}}</strong>
                            </td>
                            <td>
                                <mu-button flat>
                                    <mu-icon left value="account_box"></mu-icon>
                                    {{hoadon.created_by.name}}
                                </mu-button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{{'Ngày nhập'}}</strong>
                                <span>:</span>
                            </td>
                            <td>
                                <mu-button flat>
                                    <mu-icon left value="date_range"></mu-icon>
                                    {{invoiceDate}}
                                </mu-button>
                            </td>
                        </tr>
                    </table>
                </mu-flex>
            </mu-flex>
            <mu-flex>
                <h3>
                    <strong>{{$lang.PRESCRIPTION.TOTAL_COST}}</strong>
                    <span>:</span>
                    {{getTotalCost}}
                    <span>đ</span>
                </h3>
            </mu-flex>
            <editable-table-hoa-don :width='500'
                                    @change="onChange"
                                    v-model="hoadon.medicines">

            </editable-table-hoa-don>
            <mu-flex style="margin: 1em 0" justify-content="between">
                <div>
                    <mu-button color="error" small>
                        <mu-icon left value="delete"></mu-icon>
                        {{$lang.DELETE}}
                    </mu-button>
                </div>
                <div v-if="isChange">
                    <mu-button @click="reloadCurrent" color="gray">Cancel</mu-button>
                    <mu-button @click="save" color="blue">Save</mu-button>
                </div>
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
    import EditableTableHoaDon from "@/components/EditableTableHoaDon.vue";
    import _ from 'lodash';
    import {ICTHoaDon} from "@/types/ICTHoaDon";

    export default Vue.extend({
        name: 'chi-tiet-hoa-don',
        components: {
            Loader,
            EditableTableHoaDon,
        },
        data() {
            return {
                hoadon: null as HoaDon | null,
                origin: null as HoaDon | null,
                isChange: false,
            };
        },
        computed: {
            hoaDonId(): number {
                return +this.$route.params.id;
            },
            loaded(): boolean {
                return !this.$store.getters['hoa_don/detail/loading'];
            },
            invoiceDate(): string {
                return this.hoadon ? moment(this.hoadon.created_at).format("dd - DD/MM/YY") : "";
            },
            getTotalCost(): string {
                if (!this.hoadon) return "0";
                const total = this.hoadon.medicines.reduce((sum: number, cthd: any)=>{
                    return sum + cthd.amount.amount * cthd.cost;
                }, 0);
                return total.toLocaleString('vi');
            },
        },
        methods: {
            reloadCurrent() {
                // debugger;
                this.origin = this.$store.getters['hoa_don/detail/current'];
                this.hoadon = _.cloneDeep(this.origin);
                this.isChange = false;
            },
            onChange(value: any) {
                if (!this.origin) return;
                this.isChange = !(_.isEqual(value, this.origin.medicines));
            },
            save() {
                this.$store.dispatch('hoa_don/detail/saveChange', this.hoadon);
            },
        },
        async mounted() {
            await this.$store.dispatch('hoa_don/detail/load', this.hoaDonId);
            this.reloadCurrent();
        },
    });
</script>

<style lang='scss'>
</style>
