/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/9/19 8:53 AM
 *
 */

import {BaseInterface} from "@/types/base";
import {Provider} from "@/types/Provider";
import {Thuoc} from "@/types/Thuoc";

export interface Receipt extends BaseInterface {
    cost: number;
    note: string;
    provider?: Provider;
    medicines: Thuoc[];
}
