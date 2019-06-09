/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/9/19 12:39 PM
 *
 */

import APIBase, {IPaginateResponse} from "@/api/base";
import Axios from "@/axios";

export interface IListOption {
    page?: number;
    limit?: number;
    [key: string]: string | number | undefined;
}

class ProviderApi extends APIBase {

    static async getList(opts: IListOption): Promise<IPaginateResponse>
    {
        const res = await Axios.get(ProviderApi.GET('provider', {
            ...opts,
        }));

        return res.data;
    }

}

export default ProviderApi;
