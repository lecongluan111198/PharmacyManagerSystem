import {Module} from 'vuex';
import {Thuoc} from "@/types/Thuoc";

export interface ICTHoaDon {
    medicine: Thuoc;
    quantity: number;
}

export interface IHoaDonState {
    list: ICTHoaDon[],
    current: Map<number, number>;
}

const store: Module<IHoaDonState, any> = {
    namespaced: true,
    state: {
        list: [],
        current: new Map<number, number>(),
    },

    getters: {
        current(state: IHoaDonState) {
            return [...state.list];
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
    },
};

export default store;
