/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/22/19 12:22 AM
 *
 */

import {Module} from "vuex";
import {User} from "@/types/User";
import _ from 'lodash';
import API from "@/api";
import NhanvienAddModule from "@/store/Nhanvien/add";

interface INhanvienState {
    list: User[];
    map: Map<number, User>;
    isLoaded: boolean;
}

const NhanvienModule: Module<INhanvienState, any> = {
    namespaced: true,
    modules: {
        add: NhanvienAddModule,
    },

    state: {
        list: [],
        map: new Map<number, User>(),

        isLoaded: false,
    },

    getters: {
        list: state => _.cloneDeep(state.list),
        isLoaded: state => state.isLoaded,
    },

    mutations: {
        setList(state, list: User[]) {
            state.list = list;
        },

        addUser(state, user: User) {
            state.list.push(user);
        },

        loading(state, val = true) {
            state.isLoaded = !val;
        },
    },

    actions: {
        async reload({commit}) {
            commit('loading');
            const res = await API.Nhanvien.list();
            commit('setList', res.data);
            commit('loading', false);
        },
    },
};

export default NhanvienModule;
