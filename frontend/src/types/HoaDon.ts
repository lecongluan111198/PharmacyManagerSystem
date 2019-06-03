import {ICTHoaDon} from "@/types/ICTHoaDon";
import {User} from "@/types/User";

export interface HoaDon {
    id: number;
    // store_id: number;

    cthd: ICTHoaDon[];
    total: number;
    created_by: User;

    created_at: number,
    updated_at: number,
}
