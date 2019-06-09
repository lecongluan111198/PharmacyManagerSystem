/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/9/19 9:01 AM
 *
 */

import {Module} from "vuex";
import {Receipt} from "@/types/Receipt";
import API from "@/api";

export interface IReceiptState {
    list: Receipt[];
    page: number;
    type: null | number;
    total: number;
    limit: number;
}

const store: Module<IReceiptState, any> = {
    namespaced: true,
    state: {
        list: [],
        page: 1,
        type: null,
        limit: 15,
        total: 1,
    },
    mutations: {
        setList(state, payload = {}) {
            const {list = []} = payload;
            state.list = list;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotal(state, total) {
            state.total = total;
        },
        setType(state, type) {
            if ([null, 0, 1].includes(type))
                state.type = type;
        }
    },
    getters: {
        list: state => state.list.map(val=>({...val})),
        page: state => state.page,
        total: state => state.total,
        type: state => state.type,
    },
    actions: {
        async getList({commit, state}, payload = {}) {
            const {
                page = state.page,
                limit = state.limit,
                type = state.type,
            } = payload;
            const res = await API.Receipt.getList(page, limit, {
                type,
            });
            commit('setList', {
                list: res.data,
            });
            commit('setPage', res.current_page);
            commit('setTotal', res.total);
        }
    },
};

export default store;
