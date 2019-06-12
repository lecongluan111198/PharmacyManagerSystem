/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/12/19 4:48 PM
 *
 */

import {Module} from "vuex";
import {ICTHoaDon} from "@/types/ICTHoaDon";
import _ from 'lodash';
import {Thuoc} from "@/types/Thuoc";
import API from "@/api";

export interface IHoaDonAddState {
    map: Map<number, number>; // <id, amount>
    array: ICTHoaDon[];
    submitting: boolean;
}

const HoaDonAddModule: Module<IHoaDonAddState, any> = {
    namespaced: true,
    state: {
        map: new Map<number, number>(),
        array: [],
        submitting: false,
    },
    getters: {
        map: state => new Map(state.map),
        list: state => _.cloneDeep(state.array),
        submitting: state => state.submitting,
    },
    mutations: {
        update(state, payload: any = {}) {
            const {
                medicine = null as (Thuoc | null),
                amount = 1,
            } = payload;

            if (!medicine) {
                console.debug("no medicine in payload");
                return;
            }

            if (state.map.has(medicine.id)) {
                const newAmount = amount + state.map.get(medicine.id);
                state.map.set(medicine.id, newAmount);

                const existElement = state.array.find(cthd=>cthd.medicine.id === medicine.id);
                if (existElement) existElement.amount = newAmount;
                else throw new Error("Sorry, something went wrong");
            } else {
                state.map.set(medicine.id, amount);
                state.array.push({
                    medicine,
                    amount,
                });
            }
        },

        remove(state, id: number) {
            if (state.map.has(id)) {
                state.map.delete(id);

                const existElementIdx = state.array.findIndex(cthd=>cthd.medicine.id === id);
                state.array.splice(existElementIdx, 1);
            }
        },

        reset(state) {
            state.map.clear();
            state.array.splice(0, state.array.length);
        },

        submitting(state, val : boolean = true) {
            state.submitting = val;
        },
    },
    actions: {
        async submit({state, commit}) {
            commit('submitting');

            const cthdList = state.array.map((item: ICTHoaDon)=>{
                return {
                    id: item.medicine.id,
                    amount: item.amount,
                };
            });
            await API.Prescription.insert(cthdList);

            commit('reset');
            commit('submitting', false);
        }
    },
};

export default HoaDonAddModule;
