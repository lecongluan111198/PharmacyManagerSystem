/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/10/19 9:48 AM
 *
 */


import APIBase, {IBasicResponse, IInsertReturn, IPaginateResponse} from "@/api/base";
import Axios from "@/axios";
import {HoaDon} from "@/types/HoaDon";
import {ICTHoaDon} from "@/types/ICTHoaDon";

export interface IPresciptionListRequest {
    page?: number;
    limit?: number;
    start?: Date;
    end?: Date;
}

class PrescriptionApi extends APIBase
{
    static async list(options: IPresciptionListRequest) : Promise<IPaginateResponse>
    {
        const res = await Axios.get(APIBase.GET('prescription', options));
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

    static async update(id: number, cthd: {id: number, amount: number}[]) : Promise<IBasicResponse<any>>
    {
        const res = await Axios.put(`/prescription/${id}`, {
            cthd: cthd.map(val=>{
                return {
                    idMedicine: val.id,
                    amount: val.amount,
                };
            }),
        });
        return res.data;
    }
}

export default PrescriptionApi;
