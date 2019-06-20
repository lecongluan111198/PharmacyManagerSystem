
/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/20/19 3:56 PM
 *
 *  References: https://github.com/stalniy/casl-vue-api-example/blob/master/src/store/ability.js
 */

import { Ability } from '@casl/ability';
import {rulesOf} from "@/permission/rules";

export const ability = new Ability();

export const abilityPlugin = (store: any) => {
    return store.subscribe((mutation: any) => {
        switch (mutation.type) {
            case 'login':
                ability.update(rulesOf(mutation.payload));
                break;
            case 'logout':
                ability.update([]);
                break;
        }
    });
};
