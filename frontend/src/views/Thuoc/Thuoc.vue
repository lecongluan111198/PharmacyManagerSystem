<template>
    <div>
        <mu-flex direction="column" style="height: 100%" align-items="stretch">
            <mu-flex justify-content="between" align-items="center">
                <mu-flex fill align-items="center">
                    <mu-text-field action-icon="search"
                                   @keydown.enter="searchInput_submit = searchInput"
                                   v-model="searchInput" typeof="search"
                                   :label="$lang.THUOC.SEARCH" label-float></mu-text-field>
                    <div class="select-controls-group">
                        <mu-checkbox :label="$lang.THUOC.IN_STORE" v-model="whereInput" value="store"></mu-checkbox>
                        <mu-checkbox :label="$lang.THUOC.IN_INVENTORY" v-model="whereInput" value="inventory"></mu-checkbox>
                    </div>
                </mu-flex>
                <mu-button color="success" @click="openAddModal">
                    {{$lang.ADD}}
                    <mu-icon right value="add"></mu-icon>
                </mu-button>
            </mu-flex>
            <thuoc-table :search="searchInput_submit"
                         style="flex-grow: 1; overflow: auto"></thuoc-table>
        </mu-flex>
        <thuoc-add-dialog></thuoc-add-dialog>
    </div>
</template>

<style lang="scss">
    .select-controls-group {
        display: flex;
        .mu-checkbox {
            margin: 0 1em;
        }
    }

    .add-form {
        .mu-input {
            display: block;
        }
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import ThuocTable from "@/components/Thuoc/ThuocTable.vue";
    import {Provider} from "@/types/Provider";
    import {Thuoc} from "@/types/Thuoc";
    import {mapGetters} from 'vuex';
    import ThuocAddDialog from "@/components/modal_views/ThuocAdd.vue";

    export default Vue.extend({
        name: "danh-sach-thuoc",
        components: {
            ThuocTable,
            ThuocAddDialog,
        },
        data() {
            return {
                searchInput: '',
                searchInput_submit: '',
                currentPage: 1,
                whereInput: [],
                modalAdd: {
                    open: false,
                    form: {
                        name: '',
                        provider_id: null,
                    }
                },
            };
        },
        computed: {
            whereType(): string {
                if (this.whereInput.length === 0 || this.whereInput.length === 2) {
                    return "all";
                } else {
                    return this.whereInput[0];
                }
            },
        },

        methods: {
            openAddModal() {
                this.$store.commit('thuoc/add/open');
            },
        }
    });
</script>
