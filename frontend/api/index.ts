import {User} from "../src/types";
import Axios from '../src/axios';

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
        const res = await Axios.get("/api/user");
        if (this.isOk(res.status)) {
            return res.data;
        } else {
            throw new Error(res.statusText);
        }
    }
}
