import {User} from "@/types/User";
import Axios from '../axios';
import ReceiptAPI from './Receipt';
import APIBase, {IBasicResponse, ILoginData, IPaginateResponse} from "@/api/base";
import ProviderApi from "@/api/ProviderApi";
import PrescriptionApi from "@/api/PrescriptionApi";
import MedicineApi from "@/api/MedicineApi";

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

    static Medicine = MedicineApi;
    static Receipt = ReceiptAPI;
    static Provider = ProviderApi;
    static Prescription = PrescriptionApi;
}
