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
                <mu-button color="success" @click="modalAdd.open = true">
                    {{$lang.ADD}}
                    <mu-icon right value="add"></mu-icon>
                </mu-button>
            </mu-flex>
            <thuoc-table :search="searchInput_submit"
                         style="flex-grow: 1; overflow: auto"></thuoc-table>
        </mu-flex>
        <mu-dialog id="add-thuoc"
                   :overlay-close="false"
                   :title="$lang.THUOC.ADD" :open.sync="modalAdd.open">
            <mu-form class="add-form">
                <mu-text-field :label="$lang.THUOC.NAME" v-model="modalAdd.form.name"></mu-text-field>
                <mu-select filterable
                           :label="$lang.THUOC.PROVIDER"
                           v-model="modalAdd.form.provider">
                    <mu-option v-for="provider in providers" :key="provider.id"
                               :value="provider"
                               :label="provider.name"></mu-option>
                </mu-select>
            </mu-form>
            <mu-button slot="actions" color="primary">{{$lang.ADD}}</mu-button>
            <mu-button slot="actions" color="grey" @click="modalAdd.open = false">Cancel</mu-button>
        </mu-dialog>
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

    export default Vue.extend({
        name: "danh-sach-thuoc",
        components: {
            ThuocTable,
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
        }
    });
</script>
