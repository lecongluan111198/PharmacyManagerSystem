import {Module} from 'vuex';
import Vue from 'vue';
import {Thuoc} from "@/types/Thuoc";
import {HoaDon} from "@/types/HoaDon";
import {ICTHoaDon} from "@/types/ICTHoaDon";
import {RootState} from "@/store";
import API from "@/api";

export interface IListPage<T> {
    [page: number]: T[];
}

export interface IHoaDonState {
    list: HoaDon[],
    page: number;
    total: number;
    current_insert: Map<number, number>;
    loading: boolean;
}

const store: Module<IHoaDonState, RootState> = {
    namespaced: true,
    state: {
        list: [],
        current_insert: new Map<number, number>(),
        page: 1,
        total: 1,
        loading: false,
    },

    getters: {
        list(state) {
            return state.list.map(val=>({...val}));
        },
        page: state => state.page,
        total: state => state.total,
        current_insert(state) {
            return new Map(state.current_insert);
        },
        loading: state => state.loading,
    },

    mutations: {
        list(state, list: HoaDon[]) {
            state.list = list;
        },
        page(state, page: number) {
            state.page = page;
        },
        total(state, total: number) {
            state.total = total;
        },
        loading(state, bool: boolean) {
            state.loading = bool;
        },
        themVaoHoaDon(state, payload: any = {}) {
            const {
                id = null,
                amount = 1,
            } = payload;

            if (!id && id !== 0) throw new Error('id is null');
            state.current_insert.set(id, amount);
        },
        xoaKhoiHoaDon(state, id: number) {
            if (!id && id !== 0) throw new Error('id is null');
            if (!state.current_insert.has(id)) {
                console.warn("No " + id + " in current_insert");
            } else {
                state.current_insert.delete(id);
            }
        },
    },

    actions: {
        async submit({state, dispatch}) {
            const cthd = [] as ICTHoaDon[];
            state.current_insert.forEach((val, key) => {
                cthd.push({
                    amount: {
                        idMedicine: key,
                        idPrescription: -1,
                        amount: val,
                    }
                })
            });

            const res = await API.Prescription.insert(cthd);
            if (res.error) {
                throw new Error(res.message);
            }
            dispatch('fetchList');
        },

        async fetchList({commit, state}, payload: any = {})
        {
            const {
                limit = 15,
                page = state.page,
            } = payload;

            commit('loading', true);
            const res = await API.Prescription.list(limit, page);
            commit('loading', false);

            commit('list', res.data);
            commit('page', res.current_page);
            commit('total', res.total);
        }
    },
};

export default store;
