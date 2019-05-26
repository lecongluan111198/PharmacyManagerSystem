<template>

    <div id="search-thuoc">
        <mu-menu placement="bottom" :open="listSearch.length > 0" >
            <template>
                <mu-form :model="form" @submit="search" v-if="selected === null">
                    <mu-flex align-items="center"
                             justify-content="center">
                        <mu-flex>
                            <mu-text-field :label="$lang.THUOC.SEARCH"
                                           type="text"
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
                            <mu-button flat>
                                <mu-text-field
                                    style="width: 100px;"
                                    autofocus
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
                <mu-data-table border striped
                               :no-data-text="$lang.EMPTY_DATA"
                               :columns="listSearchColumns"
                               @row-click="(idx, row)=>{selected = row}"
                               :data="listSearch"></mu-data-table>
            </template>
        </mu-menu>
    </div>

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
                listSearch: [] as Thuoc[],
                listSearchColumns: [
                    {title: 'ID', name: 'id', width: 100},
                    {title: this.$lang.THUOC.NAME, name: 'name', width: 200},
                ],
                selected: null,
                quantity: 1,
            };
        },

        methods: {
            async search(e: Event) {
                e.preventDefault();
                const list = await this.$store.dispatch("thuoc/findThuocByName", this.form.search_name);

                this.listSearch = list;
            },
            choose() {
                if (this.selected != null) {
                    this.$store.dispatch("hoa_don/add", {
                        thuoc_id: (this.selected as any).id,
                        quantity: this.quantity,
                    }).then(_=>{
                        this.selected = null;
                        this.quantity = 1;
                        this.form.search_name = '';
                    });
                }
            },
        },
    });
</script>

<style lang="scss">
    .medicine-name {
        overflow: hidden;
        white-space: nowrap;
        min-width: 0;
        text-overflow: ellipsis;
    }
</style>
