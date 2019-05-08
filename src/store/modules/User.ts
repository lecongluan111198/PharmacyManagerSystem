import Vuex, { ModuleOptions, Module, ActionContext } from 'vuex';
import User from '@/models/User';
import Admin from '@/models/Admin';

export interface UserState {
    currentUser: User | Admin | undefined,
    users: User[],
}

const store: Module<UserState, any> = {
    namespaced: true,
    state: {
        currentUser: undefined,
        users: [],
    },
    getters: {
        currentUser(state: UserState) {
            return state.currentUser;
        },
        users(state: UserState) {
            return state.users;
        },
    },
    mutations: {
        setCurrentUser(state: UserState, user: User) {
            if (!(user instanceof User)) {
                throw new Error("param is not User");
            }
            state.currentUser = user;
        },
        setUsers(state: UserState, users: User[])
        {
            state.users = users;
        },
    },
    actions: {
        async fetchMe(context: ActionContext<UserState, any>) {
            const me = await User.getMe();
            if (me) {
                context.commit("setCurrentUser", me);
            } else {
                throw new Error("User didn't login");
            }
        },
        async fetchAllUser(context) {
            const users = await User.getAllUser();
            context.commit("setUsers", users);
        }
    }
}

export default store;
