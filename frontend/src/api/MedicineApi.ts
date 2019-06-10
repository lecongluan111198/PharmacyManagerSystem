/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/10/19 12:08 PM
 *
 */


import APIBase, {IBasicResponse, IPaginateResponse} from "@/api/base";
import Axios from "@/axios";

class MedicineApi extends APIBase
{
    /**
     *
     * @param page
     * @param sort - sort field
     * @param sortd - sort direction
     */
    static async getListThuoc(page: number = 1, sort: string = 'id', sortd: string = 'asc', search: string = ''): Promise<IPaginateResponse> {
        const res = await Axios.get(APIBase.GET('medicine', {
            page,
            sort,
            direction: sortd,
            q: search,
        }));
        return res.data;
    }

    static async findThuocByID(id: number): Promise<IBasicResponse> {
        const res = await Axios.get(APIBase.GET(`medicine/${id}`));
        return res.data;
    }

    static async findThuocByName(name: string, limit: number = 10, page: number = 1): Promise<IPaginateResponse> {
        const res = await Axios.get(APIBase.GET('medicine/findName', {
            name,
            limit,
            page,
        }));
        return res.data;
    }

    static async getAmount(id: number): Promise<{total: number; import: number; export: number}>
    {
        const res = await Axios.get(APIBase.GET(`medicine/${id}/amount`));
        return res.data;
    }
}

export default MedicineApi;
