<template>
    <div id="current-prescription">
        <mu-flex style="margin-bottom: 1em" justify-content="between" align-items="end">
            <div class="prescription-control">
                <mu-button small :disabled="!selects.length" @click="removeMedicine">
                    <mu-icon value="delete"></mu-icon>
                    remove
                </mu-button>
                <mu-button small color="success">
                    <mu-icon left value="check"></mu-icon>
                    {{$lang.ADD}}
                </mu-button>
            </div>

            <mu-flex>
                <mu-paper :z-depth="1">
                    <div class="prescription-total">
                        <strong>{{$lang.PRESCRIPTION.TOTAL_COST}}: </strong>
                        {{totalCostPrescription}} đ
                    </div>
                </mu-paper>
            </mu-flex>
        </mu-flex>
        <mu-paper :z-depth="1">
            <mu-data-table :columns="columns"
                           border striped
                           checkbox selectable select-all
                           :selects.sync="selects"
                           :no-data-text="$lang.EMPTY_DATA"
                           :data="list_medicine">
            </mu-data-table>
        </mu-paper>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapGetters} from 'vuex';
    import {ICTHoaDon} from "@/store/HoaDon";

    export default Vue.extend({
        name: 'prescription-current',
        data() {
            return {
                selects: [] as any[],
                columns: [
                    {title: "ID", name: 'id'},
                    {title: this.$lang.THUOC.NAME, name: 'name'},
                    {title: this.$lang.THUOC.PRICE, name: 'cost',
                        formatter(value: any) {
                            return value.toLocaleString() + "đ";
                        },
                    },
                    {title: this.$lang.QUANTITY, name: 'quantity'},
                    {title: this.$lang.PRESCRIPTION.TOTAL_COST, name: 'total_cost',
                        formatter(value: any) {
                            return value.toLocaleString() + "đ";
                        },
                    },
                ],
            }
        },
        computed: {
            ...mapGetters([
                'hoa_don/current',
            ]),

            list_medicine(): any[] {
                const that = this as any;
                return that['hoa_don/current'].map((cthd: ICTHoaDon)=>{
                    return {
                        id: cthd.medicine.id,
                        name: cthd.medicine.name,
                        cost: cthd.medicine.cost,
                        quantity: cthd.quantity,
                        total_cost: cthd.quantity * cthd.medicine.cost,
                    };
                })
            },

            totalCostPrescription(): string {
                return this.list_medicine.reduce((total: number, row: any)=>{
                    return total + (+row.total_cost);
                }, 0).toLocaleString();
            }
        },

        methods: {
            removeMedicine() {
                const selectedRows = this.list_medicine.filter((val, idx)=>{
                    return this.selects.indexOf(idx) >= 0;
                });

                selectedRows.forEach(async row=>{
                    await this.$store.dispatch("hoa_don/remove", {
                        thuoc_id: row.id,
                        quantityRemove: -1,
                    });
                });
            },
        },
    });

</script>

<style lang="scss">
    .prescription-total {
        padding: 1em;
        font-size: 1.5em;
    }
    .prescription-control {
        > * {
            margin-right: 1em;
        }
    }
</style>
