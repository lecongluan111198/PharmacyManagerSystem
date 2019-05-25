import {User} from "@/types/User";
import Axios from '../axios';

export interface ILoginData {
    email: string;
    password: string;
}
export interface IBasicResponse {
    error: boolean,
    message?: string,
    data?: any,
}
export interface IPaginateResponse {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export default class API {
    static GET(action: string, params: any = {}): string {
        let paramsStr: string = Object.keys(params)
            .filter(key=>!!params[key])
            .map((key: string)=>{
                return key + "=" + params[key];
            }).join("&");
        if (paramsStr)
            paramsStr = "?" + paramsStr;
        return `/${action}${paramsStr}`;
    }

    static isOk(status: number): boolean {
        return (status < 300) && (status >= 200);
    }

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
}
