import Vue from "vue";
import Vuex from "vuex";
import {User} from "../types";
import API from "../api";


Vue.use(Vuex);

export interface RootState {
    me: User | null;
}

export default new Vuex.Store<RootState>({
    state: {
        me: null,
    },

    getters: {
        me({me}) {
            return {...me}; // create new copy, for im-mutations
        },
    },

    mutations: {
        setMe(state, me: User): void {
            state.me = me;
        }
    },

    actions: {
        async fetchMe({commit}) {
            const user = await API.fetchMe();
            commit("setMe", user);
        },
    },
});
