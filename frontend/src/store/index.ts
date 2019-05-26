import Vue from "vue";
import Vuex from "vuex";
import {User} from "../types/User";
import API from "../api";

Vue.use(Vuex);

import ThuocModule from './Thuoc/';
import HoaDonModule from './HoaDon/';

export interface RootState {
    me: User | null;
    parentModalPath: string;
}

export default new Vuex.Store<RootState>({
    modules: {
        thuoc: ThuocModule,
        hoa_don: HoaDonModule,
    },

    state: {
        me: null,
        parentModalPath: '/',
    },

    getters: {
        me({me}) {
            return {...me}; // create new copy, for im-mutations
        },
    },

    mutations: {
        setMe(state, me: User | null = null): void {
            state.me = me;
        }
    },

    actions: {
        async fetchMe({commit}) {
            const user = await API.fetchMe();
            commit("setMe", user);
        },

        async resetPass({commit}) {

        }
    },
});
