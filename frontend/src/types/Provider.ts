import {BaseInterface} from "@/types/base";

export interface Provider extends BaseInterface{
    name: string;
    address?: string;
    phone?: string;
}
