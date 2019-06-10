import Vuex, {ActionContext, Module} from 'vuex';
import {Thuoc} from "@/types/Thuoc";
import API from "@/api";

export const LIMIT = 20;

export interface IThuocState {
    list: Array<Thuoc>;
    map: Map<any, Thuoc>;
    total: number;
}

const store: Module<IThuocState, any> = {
    namespaced: true,
    state: {
        list: [],
        map: new Map<any, Thuoc>(),
        total: 0,
    },
    getters: {
        total(state): number {
            return state.total;
        },

        thuoc(state): any {
            return (id: number) => {
                return state.map.get(id);
            };
        },
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
    },
    actions: {
        async fetchListThuoc({commit, state}, payload: any = {}): Promise<Thuoc[]> {
            const {
                page = 1,
                search = undefined,
                sort: {
                    name = 'id',
                    order = 'asc'
                } = {},
            } = payload;

            const res = await API.Medicine.getListThuoc(page, name, order, search);
            const list = res.data as Thuoc[];
            commit('updateTotal', res.total);

            for (const thuoc of list) {
                commit('update', thuoc);
            }

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
