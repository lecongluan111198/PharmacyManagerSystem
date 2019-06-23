<template>
    <page-wrapper>
        <template slot="header">
            <mu-flex justify-content="between" align-items="center">
                <div>
                    <h1>Nhan vien</h1>
                </div>
                <div>
                    <mu-button icon @click="reload">
                        <mu-icon value="refresh"></mu-icon>
                    </mu-button>
                    <mu-button small @click="addNhanvien">
                        <mu-icon left value="add"></mu-icon>
                        Thêm nhân viên
                    </mu-button>
                </div>
            </mu-flex>
        </template>

        <mu-paper :z-depth="1">
            <mu-data-table :columns="columns"
                           border hover fit
                           :loading="!isLoaded"
                           :no-data-text="$lang.EMPTY_DATA"
                           :data="list">

            </mu-data-table>
        </mu-paper>

        <mu-dialog width="300" :open.sync="isShowAddModal" :title="'Thêm nhân viên'">
            <mu-form :model="form" @submit="submit">
                <div>
                    <mu-text-field v-model="form.name"
                                   name="new name"
                                   :label="$lang.USER.NAME"></mu-text-field>
                </div>
                <div>
                    <mu-text-field v-model="form.email"
                                   name="new email"
                                   v-validate="'email|required'"
                                   :label="$lang.USER.EMAIL"></mu-text-field>
                </div>
                <div>
                    <mu-text-field v-model="form.password"
                                   name="new pass"
                                   password type="password"
                                   action-icon="visibility"
                                   v-validate="'string|required|minlength:8'"
                                   :label="$lang.USER.NEW_PASS"></mu-text-field>
                </div>
                <div>
                    <mu-select v-model="form.role" :label="'Role'">
                        <mu-option :value="UserRole.SALE" label="SALES"></mu-option>
                        <mu-option :value="UserRole.STORAGE_MANAGER" label="STORAGE MANAGER"></mu-option>
                        <mu-option :value="UserRole.TAG_MANAGER" label="TAG MANAGER"></mu-option>
                    </mu-select>
                </div>
                <div>
                    <mu-button :disabled="isSubmitting" type="submit">{{$lang.ADD}}</mu-button>
                    <div v-if="isSubmitting">
                        <mu-circular-progress :size="32"></mu-circular-progress>
                    </div>
                </div>
            </mu-form>
        </mu-dialog>
    </page-wrapper>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import PageWrapper from '@/components/PageWrapper.vue';
    import {mapGetters} from 'vuex';
    import {UserRole} from "@/types/User";

    export default Vue.extend({
        name: 'nhan-vien',
        components: {
            PageWrapper,
        },
        data() {
            return {
                UserRole,
                columns: [
                    {title: "ID", name: 'id'},
                    {title: this.$lang.USER.NAME, name: 'name'},
                    {title: this.$lang.USER.EMAIL, name: 'email'},
                    {title: 'Role', name: 'role',
                        formatter(val: number) : string {
                            switch (val) {
                                case UserRole.ADMIN: return "Admin";
                                case UserRole.SALE: return "Sale";
                                case UserRole.STORAGE_MANAGER: return "Storage Manager";
                                case UserRole.TAG_MANAGER: return "Tag Manager";
                            }
                            return "<unknown>";
                        },
                    },
                ],
                isAddNhanvien: false,
            };
        },
        computed: {
            ...mapGetters('nhan_vien', [
                'isLoaded',
                'list',
            ]),
            ...mapGetters('nhan_vien/add', [
                'form',
                'isSubmitting',
            ]),

            isShowAddModal: {
                get(): boolean {
                    return this.$store.getters['nhan_vien/add/showModal'];
                },
                set(val: boolean) {
                    this.$store.commit('nhan_vien/add/showModal', val);
                },
            },
        },
        methods: {
            addNhanvien() {
                this.$store.commit('nhan_vien/add/showModal');
            },

            submit(e: Event) {
                e.preventDefault();
                this.$store.dispatch('nhan_vien/add/submit');
            },

            reload() {
                this.$store.dispatch('nhan_vien/reload');
            }
        },
        created(): void {
            if (!(this as any).isLoaded) {
                this.$store.dispatch('nhan_vien/reload');
            }
        }
    });
</script>

<style lang='scss'>
</style>
