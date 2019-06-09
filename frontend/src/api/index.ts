import {User} from "@/types/User";
import Axios from '../axios';
import ReceiptAPI from './Receipt';
import APIBase, {IBasicResponse, ILoginData, IPaginateResponse} from "@/api/base";
import ProviderApi from "@/api/ProviderApi";

export default class API extends APIBase {

    static async fetchMe(): Promise<User> {
        const res = await Axios.get("/me");
        if (this.isOk(res.status)) {
            return res.data.data;
        } else {
            throw new Error(res.statusText);
        }
    }

    static async login(loginData: ILoginData): Promise<IBasicResponse> {
        const res = await Axios.post("/login", loginData);
        if (this.isOk(res.status)) {
            return res.data;
        } else {
            throw new Error(res.statusText);
        }
    }

    static async resetPass(email: string): Promise<IBasicResponse> {
        const res = await Axios.get('/reset-password');
        if (this.isOk(res.status)) {
            return res.data;
        } else {
            throw new Error(res.statusText);
        }
    }

    /**
     *
     * @param page
     * @param sort - sort field
     * @param sortd - sort direction
     */
    static async getListThuoc(page: number = 1, sort: string = 'id', sortd: string = 'asc', search: string = ''): Promise<IPaginateResponse> {
        const res = await Axios.get(this.GET('medicine', {
            page,
            sort,
            direction: sortd,
            q: search,
        }));
        return res.data;
    }

    static async findThuocByID(id: number): Promise<IBasicResponse> {
        const res = await Axios.get(this.GET(`medicine/${id}`));
        return res.data;
    }

    static async findThuocByName(name: string, limit: number = 10, page: number = 1): Promise<IPaginateResponse> {
        const res = await Axios.get(this.GET('medicine/findName', {
            name,
            limit,
            page,
        }));
        return res.data;
    }

    static async getListProvider(limit: number = 20, page: number = 1) : Promise<IPaginateResponse>
    {
        const res = await Axios.get(this.GET('provider', {
            limit,
            page,
        }));
        return res.data;
    }

    static async getListPrescription(limit: number = 15, page: number = 1) : Promise<IPaginateResponse>
    {
        const res = await Axios.get(this.GET('prescription', {
            limit,
            page,
        }));
        return res.data;
    }

    static Receipt = ReceiptAPI;
    static Provider = ProviderApi;
}
