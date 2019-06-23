/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/12/19 7:05 PM
 *
 */


import {Module} from "vuex";
import {HoaDon} from "@/types/HoaDon";
import _ from 'lodash';
import API from "@/api";

export interface IHoaDonDetail {
    loadedData: Map<number, HoaDon>;
    current: HoaDon | null;
    loading: boolean;
}

const HoaDonDetailModule: Module<IHoaDonDetail, any> = {
    namespaced: true,
    state: {
        loadedData: new Map<number, HoaDon>(),
        current: null,
        loading: true,
    },

    getters: {
        current: state => _.cloneDeep(state.current),
        loading: state => state.loading,
    },

    mutations: {
        loading: (state, val: boolean = true) => {
            state.loading = val;
        },

        update(state, data: HoaDon) {
            if (!state.loadedData.has(data.id))
                state.loadedData.set(data.id, data);
            state.current = data;
        },
    },

    actions: {
        async load({state, commit}, id: number) {
            commit('loading');
            if (state.loadedData.has(id)) {
                commit('update', state.loadedData.get(id));
            } else {
                const data = await API.Prescription.getById(id);
                commit('update', data.data);
            }
            commit('loading', false);
        },

        async saveChange({state, commit, dispatch}, hoadonChanged: HoaDon) {
            commit('loading');
            try {
                await API.Prescription.update(hoadonChanged.id, [
                    ...hoadonChanged.medicines.map((cthd: any)=>{
                        return {
                            id: cthd.id,
                            amount: cthd.amount.amount,
                        };
                    }),
                ]);

                state.loadedData.delete(hoadonChanged.id);
                await dispatch('load', hoadonChanged.id);
            } catch (e) {
                throw e;
            } finally {
                commit('loading', false);
            }
        }
    }
};

export default HoaDonDetailModule;
