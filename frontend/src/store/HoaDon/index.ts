import {Module} from 'vuex';
import {HoaDon} from "@/types/HoaDon";
import {RootState} from "@/store";
import API from "@/api";
import HoaDonAddModule from "@/store/HoaDon/add";
import HoaDonDetailModule from "@/store/HoaDon/details";
import moment from "moment";

export interface IListPage<T> {
    [page: number]: T[];
}


export interface IHoaDonState {
    list: HoaDon[],
    page: number;
    total: number;
    loading: boolean;
    daterange: Date[],
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
        daterange: [],
        loading: false,
    },

    getters: {
        list(state) {
            return state.list.map(val=>({...val}));
        },
        page: state => state.page,
        total: state => state.total,
        loading: state => state.loading,
        daterange: state => state.daterange,
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
        daterange(state, daterange: Date[]) {
            state.daterange = daterange;
        },
    },

    actions: {
        async fetchList({commit, state}, payload: any = {})
        {
            let {
                limit = 15,
                page = state.page,
                start = state.daterange[0],
                end = state.daterange[1],
            } = payload;
            start = moment(start).format("YYYY-MM-DD");
            end = moment(end).format("YYYY-MM-DD");

            commit('loading', true);
            const res = await API.Prescription.list({limit, page, start, end});
            commit('loading', false);

            commit('list', res.data);
            commit('page', res.current_page);
            commit('total', res.total);
        }
    },
};

export default store;
