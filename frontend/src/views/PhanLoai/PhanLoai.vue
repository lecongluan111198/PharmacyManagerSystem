<template>
    <mu-flex id="phan-loai-page" direction="column" align-items="stretch">
        <div>
            <h1>{{$lang.CATEGORY.TITLE}}</h1>
            <mu-flex justify-content="between">
                <div>
                    <mu-button color="green">
                        <mu-icon value="add"></mu-icon>
                        {{$lang.ADD}}
                    </mu-button>
                    <mu-button icon @click="reload">
                        <mu-icon value="refresh"></mu-icon>
                    </mu-button>
                </div>

                <mu-button color="brown" v-show="selects.length">{{$lang.DELETE}}</mu-button>
            </mu-flex>
        </div>
        <mu-flex fill>
            <paginate-table
                :selects.sync="selects"
                :columns="columns"
                :loading="loading"
                :data="tableData"
                selectable hover
                style="height: 100%"></paginate-table>
        </mu-flex>
    </mu-flex>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import _ from 'lodash';

    export default Vue.extend({
        name: 'phan-loai',
        components: {
            PaginateTable: ()=>import("@/components/PaginateTable/index.vue"),
        },
        data() {
            return {
                selects: [],
                columns: [
                    {title: this.$lang.CATEGORY.NAME, name: 'name'},
                    {title: this.$lang.QUANTITY, name: 'medicines_count'},
                ],
            };
        },
        computed: {
            tableData() {
                const list = this.$store.getters['category/list'];
                return _.cloneDeep(list);
            },
            loading() {
                return this.$store.getters['category/loading'];
            }
        },
        methods: {
            reload() {
                this.$store.dispatch('category/load');
            }
        },
        beforeMount(): void {
            if (this.$store.getters['category/loading']) {
                this.$store.dispatch('category/load', {count: true});
            }
        },
    });
</script>

<style lang='scss'>
    #phan-loai-page {
        table tr.is-selected {
            background-color: lightskyblue;
        }
    }
</style>
