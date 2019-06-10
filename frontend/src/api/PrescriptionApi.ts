/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/10/19 9:48 AM
 *
 */


import APIBase, {IInsertReturn, IPaginateResponse} from "@/api/base";
import Axios from "@/axios";
import {HoaDon} from "@/types/HoaDon";
import {ICTHoaDon} from "@/types/ICTHoaDon";

class PrescriptionApi extends APIBase
{
    static async list(limit: number = 15, page: number = 1) : Promise<IPaginateResponse>
    {
        const res = await Axios.get(APIBase.GET('prescription', {
            limit,
            page,
        }));
        return res.data;
    }

    static async insert(cthd: ICTHoaDon[]): Promise<IInsertReturn<HoaDon>>
    {
        const res = await Axios.post('/prescription', {
            list: cthd,
        });
        return res.data;
    }
}

export default PrescriptionApi;
