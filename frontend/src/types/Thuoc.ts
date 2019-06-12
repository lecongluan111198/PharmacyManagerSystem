import {BaseInterface} from "@/types/base";
import {Provider} from "@/types/Provider";

export interface Thuoc extends BaseInterface{
    id: number;
    name: string;
    cost: number;
    provider?: Provider;
    category?: any
    amount?: number;
}
