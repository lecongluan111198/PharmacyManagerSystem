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
    list: ICTHoaDon[],
    current: Map<number, number>;
    map: {
        [id: number]: HoaDon;
    };
    history: IListPage<HoaDon>;
    page: number;
    limit: number;
    total: number;
}

const store: Module<IHoaDonState, RootState> = {
    namespaced: true,
    state: {
        list: [],
        current: new Map<number, number>(),
        map: {},
        history: {},
        page: 1,
        limit: 15,
        total: 1,
    },

    getters: {
        current(state: IHoaDonState) {
            return [...state.list];
        },

        history(state: IHoaDonState): HoaDon[] {
            if (!state.history.hasOwnProperty(state.page))
                return [];
            return [...state.history[state.page]];
        },

        history_page_cur(state): number {
            return state.page;
        },

        history_page_total(state): number {
            return state.total;
        }
    },

    mutations: {
        add(state: IHoaDonState, {thuoc, quantity = 1}) {
            if (state.current.has(thuoc.id)) {
                const thuocIdx = state.current.get(thuoc.id);
                if (thuocIdx !== undefined) {
                    const thuocInThere = state.list[thuocIdx];
                    thuocInThere.quantity += +quantity;
                } else {
                    console.debug('map return null');
                }
            } else {
                // debugger;
                const newThuoc: ICTHoaDon = {
                    medicine: thuoc,
                    quantity,
                };
                const len = state.list.push(newThuoc);
                state.current.set(thuoc.id, len - 1);
            }
        },

        /**
         *
         * @param state
         * @param thuoc_id
         * @param quantityRemove so luong can remove, -1 la remove het
         */
        remove(state: IHoaDonState, {thuoc_id, quantityRemove = -1}) {
            if (state.current.has(thuoc_id)) {
                const thuocIdx = state.current.get(thuoc_id);
                if (thuocIdx !== undefined) {
                    const thuocInThere = state.list[thuocIdx];
                    if (thuocInThere.quantity <= quantityRemove || quantityRemove < 0) {
                        state.current.delete(thuoc_id);
                        state.list.splice(thuocIdx, 1);
                    } else {
                        thuocInThere.quantity -= +quantityRemove;
                    }
                } else {
                    console.debug('map return null');
                }
            }
        },

        addHoaDon(state, payload: any = {}) {
            const {
                hoadon = {},
                page = 1,
            } = payload;
            Vue.set(state.map, hoadon.id, hoadon);

            if (!state.history.hasOwnProperty(page))
                state.history[page] = [hoadon];
            else
                state.history[page].push(hoadon);
        },

        setPage(state, page: number = 1) {
            state.page = page;
        },

        setTotal(state, total: number = 1) {
            if (total > state.page) {
                state.total = total;
            }
        },
    },

    actions: {
        async add({commit, dispatch}, payload: any) {
            const thuoc = await dispatch('thuoc/getThuocById', {
                id: payload.thuoc_id
            }, {root: true}) as Thuoc;
            if (!thuoc) {
                console.error("cannot get thuoc " + payload.thuoc_id);
                return;
            }
            commit('add', {thuoc, quantity: payload.quantity});
        },

        async remove({commit}, payload) {
            commit('remove', payload);
        },

        async addHoaDon({state, commit, rootState}) {
            if (state.list.length === 0) {
                throw new Error("no medicine in prescription");
            }
            if (!rootState.me) {
                throw new Error("User undefined");
            }

            const now = Date.now();
            const hoadon: HoaDon = {
                id: now,
                medicines: state.list as any,

                invoiceDate: new Date(now),
                created_at: now,
                updated_at: now,
                created_by: rootState.me,
                cost: state.list.reduce((sum: number, val: ICTHoaDon)=>{
                    return sum + (val.medicine.cost * val.quantity);
                }, 0),
            };

            commit('addHoaDon', {hoadon});

            state.list = [];
            state.current.clear();

            console.debug(state.history);
        },

        getHoaDon({state}, payload): HoaDon | null {
            const {id} = payload;
            if (!id) {
                throw new Error('id not found');
            }

            if (state.map.hasOwnProperty(id)) {
                return state.map[id];
            } else {
                // server handle
                return null;
            }
        },

        async getHistory({state, commit}, payload: any = {}) {
            const {
                limit = 15,
                page = 1,
            } = payload;

            if (page in state.history) {
                commit('setPage', page);
                return;
            }

            const res = await API.getListPrescription(limit, page);
            const listHoaDon = res.data as HoaDon[];
            commit('setTotal', res.total);
            commit('setPage', res.current_page);
            for (const hoadon of listHoaDon) {
                commit('addHoaDon', {
                    hoadon,
                    page: res.current_page,
                });
            }
        },
    },
};

export default store;
