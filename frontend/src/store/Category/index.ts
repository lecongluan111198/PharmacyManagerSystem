/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/12/19 3:39 PM
 *
 */

import {Module} from 'vuex';
import {Category} from "@/types/Category";
import _ from 'lodash';
import API from "@/api";

export interface ICategoryState {
    list: Category[];
    map: Map<number, number>;
    loading: boolean;
}

const store: Module<ICategoryState, any> = {
    namespaced: true,
    state: {
        list: [],
        map: new Map<number, number>(),
        loading: true,
    },
    getters: {
        list: state => _.cloneDeep(state.list),
        loading: state => state.loading,
    },
    mutations: {
        update(state: ICategoryState, cates: Category[]) {
            for (const cate of cates) {
                const idx = state.map.get(cate.id);
                if (idx === undefined) {
                    const newIdx = state.list.push(cate) - 1;
                    state.map.set(cate.id, newIdx);
                } else {
                    state.list[idx] = cate;
                }
            }
        },

        loading(state, val: boolean = true) {
            state.loading = val;
        }
    },
    actions: {
        async load({commit}, payload: any = {}) {
            const {
                count = false
            } = payload;

            commit('loading');
            const res = await API.Category.list({count});
            commit('update', res.data);
            commit('loading', false);
            return res.data;
        }
    },
};

export default store;
