/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/22/19 12:28 AM
 *
 */

import APIBase, {IBasicResponse} from "@/api/base";
import {User} from "@/types/User";
import Axios from "@/axios";

export interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: number;
}

class NhanvienApi extends APIBase {
    static async list() : Promise<IBasicResponse<User[]>>
    {
        const res = await Axios.get('/employees');
        return res.data;
    }

    static async add(request: ICreateUserRequest): Promise<IBasicResponse<User>>
    {
        const res = await Axios.post('/user/create', request);
        return res.data;
    }
}

export default NhanvienApi;
