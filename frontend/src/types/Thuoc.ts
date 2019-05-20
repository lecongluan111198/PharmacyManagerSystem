import {BaseInterface} from "@/types/base";
import {Provider} from "@/types/Provider";

export interface Thuoc extends BaseInterface{
    id: string;
    name: string;
    price: number;
    provider: Provider;
    in_store_count?: number;
    in_inventory_count?: number;
}
