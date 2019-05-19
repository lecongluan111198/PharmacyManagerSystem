import {User} from "../types";
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

export default class API {
    static GET(action: string, params: any = {}): string {
        let paramsStr: string = Object.keys(params).map((key: string)=>{
            return key + "=" + params[key];
        }).join("&");
        if (paramsStr)
            paramsStr = "?" + paramsStr;
        return `/api/${action}${paramsStr}`;
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
}
