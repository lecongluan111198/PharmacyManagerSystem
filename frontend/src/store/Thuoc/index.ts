import Vuex, {ActionContext, Module} from 'vuex';
import {Thuoc} from "@/types/Thuoc";
import AddModule from './add';
import API from "@/api";

export const LIMIT = 20;

export interface IThuocState {
    list: Array<Thuoc>;
    map: Map<any, Thuoc>;
    total: number;
    loading: boolean;
    page: number;
}

const store: Module<IThuocState, any> = {
    namespaced: true,
    modules: {
        add: AddModule,
    },
    state: {
        list: [],
        map: new Map<any, Thuoc>(),
        total: 0,
        page: 1,
        loading: false,
    },
    getters: {
        total(state): number {
            return state.total;
        },
        page: state => state.page,

        thuoc(state): any {
            return (id: number) => {
                return state.map.get(id);
            };
        },

        loading: state => state.loading,
    },
    mutations: {
        update: (state, thuoc: Thuoc) => {
            if (state.map.has(thuoc.id)) {
                Object.assign(state.map.get(thuoc.id), thuoc);
            } else {
                const last = state.list.push(thuoc) - 1;
                state.map.set(thuoc.id, state.list[last]);
            }
        },

        updateTotal(state, total: number) {
            state.total = total;
        },

        page(state, page: number) {
            state.page = page;
        },
        loading(state, val: boolean) {
            state.loading = val;
        },
    },
    actions: {
        async fetchListThuoc({commit, state}, payload: any = {}): Promise<Thuoc[]> {
            const {
                page = state.page,
                search = undefined,
                sort: {
                    name = 'id',
                    order = 'asc'
                } = {},
            } = payload;

            commit("loading", true);
            const res = await API.Medicine.getListThuoc(page, name, order, search);
            const list = res.data as Thuoc[];
            commit('updateTotal', res.total);
            commit('page', res.current_page);

            for (const thuoc of list) {
                commit('update', thuoc);
            }

            commit("loading", false);
            return list;
        },

        async getThuocById({state, commit}, {id}): Promise<Thuoc> {
            // debugger;
            if (state.map.has(id)) {
                return state.map.get(id) as Thuoc;
            }
            const res = await API.Medicine.findThuocByID(id);
            commit('update', res.data);
            return res.data;
        },

        async findThuocByName({state, commit}, name: string, limit: number = 10, page: number = 1): Promise<Thuoc[]> {
            const res = await API.Medicine.findThuocByName(name, limit, page);
            for (const thuoc of res.data) {
                commit('update', res.data);
            }

            return res.data;
        }
    },
};


export default store;
