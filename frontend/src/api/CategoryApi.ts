/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/12/19 3:50 PM
 *
 */

import APIBase, {IBasicResponse} from "@/api/base";
import Axios from "@/axios";

class CategoryApi extends APIBase {

    static async list(params: any = {}) : Promise<IBasicResponse>
    {
        const res = await Axios.get(APIBase.GET('category', params));
        return res.data;
    }

}

export default CategoryApi;
