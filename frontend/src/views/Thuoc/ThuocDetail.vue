<template>
    <mu-form :model="form || {}"
             :title="$lang.THUOC.TITLE"
             label-position="top">
        <template v-if="loading">
            <mu-flex justify-content="center">
                <loader></loader>
            </mu-flex>
        </template>
        <template v-else-if="!!form">
            <mu-form-item :label="$lang.THUOC.NAME">
                <mu-text-field v-model="form.name"
                               :disabled="!isEdit"></mu-text-field>
            </mu-form-item>

            <mu-form-item :label="$lang.THUOC.PRICE">
                <mu-text-field v-model="computedCost"
                               :disabled="!isEdit"></mu-text-field>
            </mu-form-item>

            <mu-form-item :label="$lang.CATEGORY.TITLE">
                <mu-select v-model="form.idCate" :disabled="!isEdit">
                    <mu-option v-for="cate in category_list"
                               :value="cate.id"
                               :label="cate.name"
                               :key="cate.id"></mu-option>
                </mu-select>
            </mu-form-item>


            <mu-form-item :label="$lang.THUOC.PROVIDER">
                <mu-select v-model="form.idProvider" :disabled="!isEdit">
                    <mu-option v-for="provider in provider_list"
                               :value="provider.id"
                               :label="provider.name"
                               :key="provider.id"></mu-option>
                </mu-select>
            </mu-form-item>

            <mu-form-item>
                <mu-button v-if="isEdit" @click="isEdit = false">Cancel</mu-button>
                <mu-button v-if="isEdit" color="green" @click="save">Save</mu-button>
                <mu-button v-if="!isEdit" @click="isEdit = true">
                    <mu-icon left value="edit"></mu-icon>
                    Edit
                </mu-button>
            </mu-form-item>
        </template>
    </mu-form>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Thuoc} from "@/types/Thuoc";
    import _ from 'lodash';

    // @ts-ignore
    import Loader from 'vue-spinner/src/GridLoader.vue';
    import API from "@/api";

    export default Vue.extend({
        name: 'thuoc-detail',
        components: {
            Loader,
        },
        data() {
            return {
                loading: true,
                isEdit: false,
                form: null as Thuoc | null,
                thuoc: null as Thuoc | null,

                provider_list: [],
                category_list: [],
            };
        },
        watch: {
            isEdit(val: boolean) {
                if (!val) {
                    const _this = this as any;
                    _this.form = _.cloneDeep(_this.thuoc);
                }
            },
        },
        computed: {
            medicine_id() {
                return this.$route.params.id;
            },
            computedCost: {
                get() {
                    return (this as any).form.cost.toLocaleString();
                },
                set(val: string) {
                    (this as any).form.cost = +(val.replace(/[,.]/g, ''));
                },
            },
        },
        async beforeMount() {
            const _this = this as any;
            _this.loading = true;
            const thuoc = await _this.$store.dispatch('thuoc/getThuocById', {
                id: _this.medicine_id,
            });
            _this.thuoc = thuoc;
            _this.form = _.cloneDeep(_this.thuoc);

            if (_this.provider_list.length === 0) {
                await _this.$store.dispatch('provider/load');
                _this.provider_list = _this.$store.getters['provider/list'];
            }
            if (_this.$store.getters['category/loading']) {
                _this.category_list = await _this.$store.dispatch('category/load');
            } else {
                _this.category_list = _this.$store.getters['category/list'];
            }

            _this.loading = false;
        },

        methods: {
            async save() {
                const _this = this as any;
                _this.loading = true;
                const form = _this.form;
                const res = await API.Medicine.update(form.id, {
                    name: form.name,
                    cost: form.cost,
                    category_id: form.idCate,
                    provider_id: form.idProvider,
                });

                _this.$store.commit('thuoc/update', res.data);
                _this.loading = false;
            },
        },
    });
</script>

<style lang='scss'>
</style>
