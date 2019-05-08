import Model from "./base";
import firebase, {auth} from '@/firebase';
import StoreChild from './StoreChild';

// sua lai cho nay
export type USER_ROLE_TYPE= "admin" | "sale" | "store_manager" | "tag_manager";

class User extends StoreChild {

    // sua lai cho nay
    static Role = {
        ADMIN: "admin" as USER_ROLE_TYPE,
        SALE: "sale" as USER_ROLE_TYPE,
        STORE_MANAGER: "store_manager" as USER_ROLE_TYPE,
        TAG_MANAGER: "tag_manager" as USER_ROLE_TYPE,
    }

    private auth: firebase.auth.Auth = auth;

    private photoURL: string = '';
    
    public displayName: string = '';
    public username: string = '';
    public role: USER_ROLE_TYPE | undefined;

    constructor() {
        super("users");
    }

    static get instance(): User {
        return new User();
    }

    // override
    public async insert(): Promise<User>
    {
        if (this.id) throw new TypeError("id must be null here");
        throw new Error("Define it clearly here");
    }

    public static getMe(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.instance.auth.onAuthStateChanged(async user=>{
                if (user) {
                    const model = await this.find(user.uid) as User;
                    resolve(model);
                } else {
                    resolve(null);
                }
            }, error => {
                reject(error);
            });
        });
    }

    public static async getAllUser(): Promise<User[]>
    {
        const docs = await this.instance.collection.get();
        const result: User[] = [];

        docs.forEach(doc=>{
            const user = User.from(doc.data()) as User;
            user.id = doc.id;
            result.push(user);
        });

        return result;
    }
}


export default User;
