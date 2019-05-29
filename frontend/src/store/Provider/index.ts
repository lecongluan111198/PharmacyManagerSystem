import {Module, MutationTree} from "vuex";
import {Provider} from "@/types/Provider";
import API from "@/api";

export interface IProviderState {
    map: Map<number, Provider>;
    pages: Map<number, Provider[]>;
}


const store: Module<IProviderState, any> = {
    namespaced: true,

    state: {
        map: new Map<number, Provider>(),
        pages: new Map<number, Provider[]>(),
    },

    getters: {
        list(state: IProviderState): Provider[] {
            const result = [];
            for (const provider of state.map.values()) {
                result.push(provider);
            }
            return result;
        },

        pages(state: IProviderState): Map<number, Provider[]> {
            return new Map(state.pages);
        }
    },

    mutations: {
        add(state: IProviderState, payload) {
            const {provider} = payload;

            if (provider)
                state.map.set(provider.id, provider);
        },

        updatePage(state: IProviderState, payload: any) {
            const {
                page = 1,
                list = [] as Provider[],
            } = payload;

            for (const provider of list) {
                state.map.set(provider.id, provider);
            }
            state.pages.set(page, list);
        },

        remove(state: IProviderState, payload: any) {
            const {id} = payload;

            if (id && state.map.has(id)) {
                state.map.delete(id);
            } else {
                console.warn(id + ' not found in vuex store');
            }
        }
    },

    actions: {
        async getList({state, commit}, payload) {
            const {
                limit = 20,
                page = 1,
            } = payload;

            if (state.pages.has(page)) {
                const result = [] as any[];
                const pageList = state.pages.get(page) || [];
                for (const provider of pageList) {
                    result.push(result);
                }
                return result;
            }

            const res = await API.getListProvider(limit, page);
            commit('updatePage', {
                page,
                list: res.data
            });

            return res.data;
        },


    },
};

export default store;
