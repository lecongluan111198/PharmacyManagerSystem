/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/10/19 9:48 AM
 *
 */


import APIBase, {IBasicResponse, IInsertReturn, IPaginateResponse} from "@/api/base";
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

    static async insert(cthd: {id: number, amount: number}[]): Promise<IInsertReturn<HoaDon>>
    {
        const res = await Axios.post('/prescription', {
            cthd,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }

    static async getById(id: number) : Promise<IBasicResponse<HoaDon>>
    {
        const res = await Axios.get(APIBase.GET('prescription/' + id));
        return res.data;
    }
}

export default PrescriptionApi;
