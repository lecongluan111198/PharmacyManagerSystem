<template>

    <mu-flex justify-content="center" id="search-thuoc">
        <mu-menu placement="bottom" :open="listSearch.length > 0" >
            <template>
                <mu-form :model="form" style="width: 100%"
                         @submit="search"
                         v-if="selected === null">
                    <mu-flex align-items="center"
                             justify-content="center">
                        <mu-flex>
                            <mu-text-field :label="$lang.THUOC.SEARCH"
                                           type="text"
                                           ref="search_input"
                                           :help-text="$lang.SEARCH.ENTER_TO_SEARCH"
                                           v-model="form.search_name"
                                           label-float></mu-text-field>
                        </mu-flex>
                        <mu-flex :shrink="0">
                            <mu-button icon>
                                <mu-icon value="search"></mu-icon>
                            </mu-button>
                        </mu-flex>
                    </mu-flex>
                </mu-form>
                <mu-paper v-else :z-depth="2">
                    <mu-flex align-items="center">
                        <mu-button icon @click="selected = null">
                            <mu-icon value="clear"></mu-icon>
                        </mu-button>
                        <mu-button flat>{{selected.id}}</mu-button>
                        <mu-flex fill class="medicine-name">{{selected.name}}</mu-flex>
                        <mu-flex>
                            <mu-button>
                                <mu-text-field
                                    style="width: 100px;"
                                    ref="amount_input"
                                    solo v-model="quantity"
                                    min="1"
                                    suffix="(sl)"
                                    type="number"
                                    :placeholder="$lang.THUOC.IN_STORE"></mu-text-field>
                            </mu-button>
                        </mu-flex>
                        <mu-button color="primary" @click="choose">
                            <mu-icon left value="check"></mu-icon>
                            {{$lang.ADD}}
                        </mu-button>
                    </mu-flex>
                </mu-paper>
            </template>

            <template slot="content" v-if="selected === null">
                <mu-data-table id="search-thuoc-table"
                                border striped :fit="false"
                               :loading="loading"
                               :no-data-text="$lang.EMPTY_DATA"
                               :columns="listSearchColumns"
                               @row-click="chooseInTable"
                               :data="listSearch"></mu-data-table>
            </template>
        </mu-menu>
    </mu-flex>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {Thuoc} from "@/types/Thuoc";

    export default Vue.extend({
        name: 'search-box',
        data() {
            return {
                form: {
                    search_id: '',
                    search_name: '',
                },
                loading: false,
                listSearch: [] as Thuoc[],
                listSearchColumns: [
                    {title: 'ID', name: 'id'},
                    {title: this.$lang.THUOC.NAME, name: 'name'},
                ],
                selected: null,
                quantity: 1,
            };
        },

        methods: {
            async search(e: Event) {
                e.preventDefault();
                this.loading = true;
                const list = await this.$store.dispatch("thuoc/findThuocByName", this.form.search_name);
                this.listSearch = list;
                this.loading = false;
            },
            choose() {
                if (this.selected != null) {
                    this.$store.commit("hoa_don/add/update", {
                        medicine: this.selected,
                        amount: this.quantity,
                    });

                    this.selected = null;
                    this.quantity = 1;
                    this.form.search_name = '';
                    this.$nextTick(()=>{
                        (<any>this.$refs.search_input).$refs.input.focus();
                    })
                }
            },
            chooseInTable(idx: number, row: any){
                this.selected = row;
                this.$nextTick(()=>{
                    (<any>this.$refs.amount_input).$refs.input.focus();
                });
            }
        },
    });
</script>

<style lang="scss">
    .medicine-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 200px;
    }

    #search-thuoc-table {
        table {
            width: 300px !important;
        }
    }
</style>
