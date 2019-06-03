import {Module} from 'vuex';
import Vue from 'vue';
import {Thuoc} from "@/types/Thuoc";
import {HoaDon} from "@/types/HoaDon";
import {ICTHoaDon} from "@/types/ICTHoaDon";
import {RootState} from "@/store";

export interface IHoaDonState {
    list: ICTHoaDon[],
    current: Map<number, number>;
    history: any;
}

const store: Module<IHoaDonState, RootState> = {
    namespaced: true,
    state: {
        list: [],
        current: new Map<number, number>(),
        history: {},
    },

    getters: {
        current(state: IHoaDonState) {
            return [...state.list];
        },

        history(state: IHoaDonState): HoaDon[] {
            return Object.values(state.history);
        },
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

        addHoaDon(state, hoadon: HoaDon) {
            Vue.set(state.history, hoadon.id, hoadon);
            // state.history.set(hoadon.id, hoadon);
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
                cthd: state.list,
                created_at: now,
                updated_at: now,
                created_by: rootState.me,
                total: state.list.reduce((sum: number, val: ICTHoaDon)=>{
                    return sum + (val.medicine.cost * val.quantity);
                }, 0),
            };

            commit('addHoaDon', hoadon);

            state.list = [];
            state.current.clear();

            console.debug(state.history);
        },

        getHoaDon({state}, payload): HoaDon | null {
            const {id} = payload;
            if (!id) {
                throw new Error('id not found');
            }

            if (state.history.hasOwnProperty(id)) {
                return state.history[id];
            } else {
                // server handle
                return null;
            }
        }
    },
};

export default store;
