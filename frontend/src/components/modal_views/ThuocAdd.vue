
<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/12/19 11:06 AM
  -
  -->

<template>
    <mu-dialog id="add-thuoc"
               v-bind="$attrs"
               :overlay-close="false"
               :title="$lang.THUOC.ADD"
               :open="open">
        <div>
            <mu-flex justify-content="center" v-if="loading">
                <mu-circular-progress></mu-circular-progress>
            </mu-flex>
            <mu-form class="add-form" v-if="!loading" :model="form">
                <mu-text-field :label="$lang.THUOC.NAME" v-model="form.name"></mu-text-field>
                <mu-text-field :label="$lang.THUOC.PRICE"
                               style="text-align: right"
                               v-model="computedCost"></mu-text-field>
                <mu-select filterable
                           :label="$lang.THUOC.PROVIDER"
                           v-model="form.provider">
                    <mu-option v-for="provider in provider_list" :key="provider.id"
                               :value="provider"
                               :label="provider ? provider.name : ''"></mu-option>
                </mu-select>
            </mu-form>
        </div>
        <mu-button slot="actions"
                   color="primary"
                   :disabled="loading"
                   @click="submit()">{{$lang.ADD}}</mu-button>
        <mu-button slot="actions" color="grey"
                   :disabled="loading"
                   @click="openModal(false)">Cancel</mu-button>
    </mu-dialog>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex';

    export default Vue.extend({
        name: 'thuoc-add-dialog',
        data() {
            return {};
        },
        computed: {
            ...mapGetters('thuoc/add', [
                'form',
                'provider_list',
                'open',
                'loading',
            ]),

            computedCost: {
                get(): string {
                    const form = (this as any).form;
                    if (form && form.cost)
                        return form.cost.toLocaleString('vi');
                    else
                        return "";
                },
                set(cost: string) {
                    const _this = this as any;
                    _this.form.cost = +(cost.replace(/[\D]+/g, ''));
                }
            }
        },
        methods: {
            openModal(val: boolean = true) {
                this.$store.commit('thuoc/add/open', val);
            },
            async submit() {
                await this.$store.dispatch('thuoc/add/submit');
                this.openModal(false);
            },
        },
        mounted(): void {
            this.$store.dispatch('thuoc/add/loadProvider');
        },
        destroyed(): void {
            this.$store.commit('thuoc/add/resetForm');
        }
    });
</script>

<style lang='scss'>
</style>
