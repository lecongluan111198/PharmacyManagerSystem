import {Module} from "vuex";
import {Provider} from "@/types/Provider";

export interface IProviderState {
    list: Provider[],
    map: Map<number, number>,
}


const store: Module<IProviderState, any> = {
    state: {
        list: [],
        map: new Map<number, number>(),
    },

    getters: {
        list(state): Provider[] {
            return [...state.list];
        },
    },

    mutations: {
        add(state: IProviderState, provider: Provider) {
            if (state.map.has(provider.id)) {
                const idx = state.map.get(provider.id);
                if (idx) {
                    Object.assign(state.list[idx], provider);
                }
            } else {
                const newIdx = state.list.push(provider) - 1;
                state.map.set(provider.id, newIdx);
            }
        },

        remove(state: IProviderState, id: number) {
            if (state.map.has(id)) {
                const idx = state.map.get(id);
                if (idx) {
                    state.list.splice(idx, 1);
                }
            } else {
                console.warn(id + ' not found in vuex store');
            }
        }
    },

    actions: {
        async getList({state, commit}, payload) {

        }
    },
};

export default store;
