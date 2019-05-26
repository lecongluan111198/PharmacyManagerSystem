import {BaseInterface} from "@/types/base";
import {Provider} from "@/types/Provider";

export interface Thuoc extends BaseInterface{
    id: number;
    name: string;
    cost: number;
    provider?: Provider;
    category?: any
    in_store_count?: number;
    in_inventory_count?: number;
}
