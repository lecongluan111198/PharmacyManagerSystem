import {ICTHoaDon} from "@/types/ICTHoaDon";
import {User} from "@/types/User";
import {Thuoc} from "@/types/Thuoc";

export interface HoaDon {
    id: number;
    // store_id: number;

    medicines: Thuoc[];
    cost: number;
    created_by: User;

    invoiceDate: Date,
    created_at: number,
    updated_at: number,
}
