import {Module} from 'vuex';
import {HoaDon} from "@/types/HoaDon";
import {RootState} from "@/store";
import API from "@/api";
import HoaDonAddModule from "@/store/HoaDon/add";
import HoaDonDetailModule from "@/store/HoaDon/details";

export interface IListPage<T> {
    [page: number]: T[];
}


export interface IHoaDonState {
    list: HoaDon[],
    page: number;
    total: number;
    loading: boolean;
}

const store: Module<IHoaDonState, RootState> = {
    namespaced: true,

    modules: {
        add: HoaDonAddModule,
        detail: HoaDonDetailModule,
    },

    state: {
        list: [],
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
    },

    actions: {
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
