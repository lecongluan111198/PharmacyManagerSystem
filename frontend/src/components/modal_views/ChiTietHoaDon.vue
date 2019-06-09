
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
                        <p>{{computedHoaDon.id}}</p>
                    </div>
                </mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>Created at</h2>
                        <p>{{computedHoaDon.created_at}}</p>
                    </div>
                </mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>By</h2>
                        <p>
                            <a :to="'/profile/' + computedHoaDon.created_by.id">
                                {{computedHoaDon.created_by.name}}
                            </a>
                        </p>
                    </div>
                </mu-flex>
                <mu-flex fill>
                    <div>
                        <h2>{{$lang.PRESCRIPTION.TOTAL_COST}}</h2>
                        <p>{{computedHoaDon.total}}</p>
                    </div>
                </mu-flex>
            </mu-flex>
            <mu-data-table :columns="showColumns"
                           border
                           :height="300"
                           :data="computedHoaDon.cthd"></mu-data-table>
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
            <div>Loading...</div>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {HoaDon} from "@/types/HoaDon";
    import moment from "moment";

    export default Vue.extend({
        name: 'chi-tiet-hoa-don',
        data() {
            return {
                loaded: false,
                hoadon: null as HoaDon | null,
                showColumns: [
                    {title: 'id', name: 'id', width: 100},
                    {title: this.$lang.THUOC.NAME, name: 'name'},
                    {title: this.$lang.QUANTITY, name: 'quantity'},
                    {title: this.$lang.PRESCRIPTION.TOTAL_COST, name: 'total'},
                ],
            };
        },
        computed: {
            hoaDonId(): number {
                return +this.$route.params.id;
            },
            computedHoaDon(): any {
                if (!this.hoadon) return null;
                return [];
            }
        },
        mounted(): void {
            this.$store.dispatch("hoa_don/getHoaDon", {id: this.hoaDonId}).then(hoadon=>{
               this.loaded = true;
               Vue.set(this, 'hoadon', hoadon);
            });
        }
    });
</script>

<style lang='scss'>
</style>
