/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/12/19 11:07 AM
 *
 */

import {Module} from 'vuex';
import {Provider} from "@/types/Provider";
import API from "@/api";

export interface IThuocAddState {
    form: {
        name: string,
        cost: number | null,
        provider: Provider | null,
    },

    provider_list: Provider[],

    loading: boolean,
    open: boolean,
}

const defaultState: IThuocAddState = {
    form: {
        name: "",
        cost: null,
        provider: null,
    },

    provider_list: [],

    loading: true,
    open: false,
};

const store: Module<IThuocAddState, any> = {
    namespaced: true,
    state: Object.assign({}, defaultState),

    getters: {
        form: state => state.form,

        provider_list: state => state.provider_list,
        loading: state => state.loading,
        open: state => state.open,
    },

    mutations: {
        loading(state, val: boolean = true)
        {
            state.loading = val;
        },
        open(state, val: boolean = true)
        {
            state.open = val;
        },

        provider_list(state, list: Provider[])
        {
            state.provider_list = list;
        },

        resetForm(state: IThuocAddState) {
            state.form.name = '';
            state.form.cost = null;
            state.form.provider = null;
        },
    },

    actions: {
        async loadProvider({commit, dispatch, rootState}) {
            commit('loading');
            const res = await dispatch('provider/load', {all: true}, {root: true});
            commit('loading', false);

            commit('provider_list', rootState.provider.list);
        },

        async submit({state, commit}) {
            commit('loading');
            const res = await API.Medicine.insert({
                name: state.form.name,
                cost: state.form.cost || 0,
                provider_id: state.form.provider ? state.form.provider.id : undefined,
            });

            console.debug(res.data);
            commit('resetForm');
            commit('loading', false);
        }
    },
};

export default store;
