<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/23/19 4:49 PM
  -
  -->

<template>
    <table class="full-width mu-table-border editable-table">
        <thead>
            <tr>
                <th v-for="(col, idx) in columns"
                    :key="idx">
                    {{col.name}}
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, idx) in dataTable" :key="idx">
                <td>{{row.id}}</td>
                <td>{{row.name}}</td>
                <td class="d-flex flex-row justify-content-center">
                    <el-input-number size="small"
                                     :min="1"
                                     v-model="row.amount.amount"></el-input-number>
                </td>
                <td>{{row.cost * row.amount.amount}}</td>
                <td>
                    <mu-button icon small
                               @click="dataTable.splice(idx, 1)"
                               :disabled="editable || dataTable.length <= 1">
                        <mu-icon value="close" color="red"></mu-icon>
                    </mu-button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {ICTHoaDon} from "@/types/ICTHoaDon";
    import {InputNumber} from 'element-ui';

    Vue.use(InputNumber);

    export default Vue.extend({
        name: 'editable-table-hoa-don',
        props: {
            value: {
                type: Array as ()=>Array<ICTHoaDon>,
                default: [],
            },
            editable: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                columns: [
                    {title: 'id', name: 'id', width: 100},
                    {title: this.$lang.THUOC.NAME, name: 'name'},
                    {title: this.$lang.QUANTITY, name: 'amount'},
                    {title: this.$lang.PRESCRIPTION.TOTAL_COST, name: 'cost'},
                ],
            };
        },
        watch: {
            dataTable: {
                handler(val) {
                    (this as any).$emit("change", val);
                    (this as any).$emit("input", val);
                },
                deep: true,
            },
        },
        computed: {
            dataTable() {
                return this.value;
            },
        },
    });
</script>

<style lang='scss'>
    .editable-table {
        td, th {
            padding: 1em;
        }
    }
</style>
