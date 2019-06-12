<template>
    <div id="current-prescription">
        <mu-flex style="margin-bottom: 1em" justify-content="between" align-items="end">
            <div class="prescription-control">
                <mu-button :disabled="!selects.length" @click="removeMedicine">
                    <mu-icon value="delete"></mu-icon>
                    remove
                </mu-button>
                <mu-button color="success" @click="submitHoaDon" :disabled="submitting || list_medicine.length === 0">
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
                           :loading="submitting"
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
    import {ICTHoaDon} from "@/types/ICTHoaDon";

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
                            return value ? value.toLocaleString() + "đ" : "";
                        },
                    },
                    {title: this.$lang.QUANTITY, name: 'quantity'},
                    {title: this.$lang.PRESCRIPTION.TOTAL_COST, name: 'total_cost',
                        formatter(value: any) {
                            return value ? value.toLocaleString() + "đ" : "";
                        },
                    },
                ],
            }
        },
        computed: {
            ...mapGetters('hoa_don/add', [
                'list',
                'submitting',
            ]),

            list_medicine(): any[] {
                return (this as any).list.map((val: ICTHoaDon)=>{
                    return {...val.medicine,
                        quantity: val.amount,
                        total_cost: (+val.amount) * val.medicine.cost,
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
                const selected = [...this.selects];
                this.selects.length = 0;
                for (const index of selected) {
                    const id = this.list_medicine[index].id;
                    this.$store.commit("hoa_don/add/remove", id);
                }
            },

            submitHoaDon() {
                this.$store.dispatch("hoa_don/add/submit");
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
