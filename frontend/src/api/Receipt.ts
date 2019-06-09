/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/9/19 8:51 AM
 *
 */

import APIBase, {IPaginateResponse} from "@/api/base";
import Axios from "@/axios";

class Receipt extends APIBase {
    static async getList(page: number = 1, limit: number = 15, opts: any): Promise<IPaginateResponse>
    {
        const res = await Axios.get(Receipt.GET('receipt', Object.assign({}, {
            page, limit,
        },opts)));

        return res.data;
    }
}

export default Receipt;
