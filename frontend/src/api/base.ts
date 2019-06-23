/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/9/19 8:57 AM
 *
 */


export interface ILoginData {
    email: string;
    password: string;
}
export interface IBasicResponse<T = any> {
    error?: boolean,
    message?: string,
    data?: T,
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

export interface IInsertReturn<T> {
    error?: number;
    message?: string;
    data?: T;
}

class APIBase {
    static GET(action: string, params: any = {}): string {
        let paramsStr: string = Object.keys(params)
            .filter(key=>(!!params[key] || params[key] === 0))
            .map((key: string)=>{
                return key + "=" + params[key].toString();
            }).join("&");
        if (paramsStr)
            paramsStr = "?" + paramsStr;
        return `/${action}${paramsStr}`;
    }

    static isOk(status: number): boolean {
        return (status < 300) && (status >= 200);
    }
}

export default APIBase;
