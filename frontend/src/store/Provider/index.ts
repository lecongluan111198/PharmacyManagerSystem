import {Module, MutationTree} from "vuex";
import {Provider} from "@/types/Provider";
import API from "@/api";
import {IListOption} from "@/api/ProviderApi";

export interface IProviderState {
    list: Provider[];
    page: number;
    total: number;
}


const store: Module<IProviderState, any> = {
    namespaced: true,

    state: {
        list: [],
        page: 1,
        total: 1,
    },

    getters: {
        list(state: IProviderState): Provider[] {
            return state.list.map(val=>({...val}));
        },
        page: state => state.page,
        total: state => state.total,
    },

    mutations: {
        list(state, list: Provider[]) {
            state.list = list;
        },
        page(state, page: number) {
            state.page = page;
        },
        total(state, total: number) {
            state.total = total;
        }
    },

    actions: {
        async load({commit, state}, opts: IListOption) {
            const res = await API.Provider.getList(opts);
            commit('list', res.data);
            commit('page', res.current_page);
            commit('total', res.total);
        }
    },
};

export default store;
