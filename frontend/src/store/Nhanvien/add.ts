/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/22/19 12:49 AM
 *
 */

import {Module} from "vuex";
import API from "@/api";
import {UserRole} from "@/types/User";
import {ICreateUserRequest} from "@/api/Nhanvien";

export interface INhanvienAddState {
    form: ICreateUserRequest;
    showModal: boolean;
    isSubmitting: boolean;
}

const NhanvienAddModule: Module<INhanvienAddState, any> = {
    namespaced: true,
    state: {
        form: {
            email: "",
            name: "",
            password: '',
            role: UserRole.SALE,
        },
        showModal: false,
        isSubmitting: false,
    },
    getters: {
        form: state => state.form,
        showModal: state => state.showModal,
        isSubmitting: state => state.isSubmitting,
    },
    mutations: {
        showModal(state, val=true) {
            state.showModal = val;
        },

        submitting(state, val = true) {
            state.isSubmitting = val;
        },
    },
    actions: {
        async submit({state, commit}) {
            try {
                commit('submitting');
                const res = await API.Nhanvien.add(state.form);
                const user = res.data;
                commit('nhan_vien/addUser', {root: true});
            } catch (e) {
                throw e;
            } finally {
                commit('submitting', false);
            }
        }
    },
};

export default NhanvienAddModule;
