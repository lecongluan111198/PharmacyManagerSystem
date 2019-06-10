import {Thuoc} from "@/types/Thuoc";

export interface ICTHoaDon {
    amount: {
        idMedicine: number;
        idPrescription: number;
        amount: number;
    }
}
