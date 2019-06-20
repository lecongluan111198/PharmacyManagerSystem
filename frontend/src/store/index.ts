import Vue from "vue";
import Vuex from "vuex";
import {User} from "@/types/User";
import API from "@/api";

Vue.use(Vuex);

import ThuocModule from './Thuoc/';
import HoaDonModule from './HoaDon/';
import ReceiptModule from './Receipt';
import ProviderModule from './Provider';
import CategoryModule from './Category';
import {abilityPlugin} from "@/permission/ability";

export interface RootState {
    me: User | null;
    parentModalPath: string;
    showAllHotkey: boolean;
}

export default new Vuex.Store<RootState>({
    plugins: [
        abilityPlugin,
    ],

    modules: {
        thuoc: ThuocModule,
        hoa_don: HoaDonModule,
        receipt: ReceiptModule,
        provider: ProviderModule,
        category: CategoryModule,
    },

    state: {
        me: null,
        parentModalPath: '/',
        showAllHotkey: false,
    },

    getters: {
        me({me}) {
            return {...me}; // create new copy, for im-mutations
        },
        showAllHotkey: state => state.showAllHotkey,
    },

    mutations: {
        login(state, me: User) {
            state.me = me;
        },
        logout(state) {
            state.me = null;
        },
        showAllHotkey(state, val = true) {
            state.showAllHotkey = val;
        },
    },

    actions: {
        async fetchMe({commit}) {
            const user = await API.fetchMe();
            commit("login", user);
            return user;
        },

        async resetPass({commit}) {

        }
    },
});
