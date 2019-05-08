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
    public role: string;

    constructor() {
        super("users");
        this.role = this.getRole();
    }

    static get instance(): User {
        return new User();
    }

    private getRole(): USER_ROLE_TYPE 
    {
        throw new Error("Override this");
    }

    // override
    public async insert(): Promise<User>
    {
        if (this.id) throw new TypeError("id must be null here");
        throw new Error("Define it clearly here");
    }
}


export default User;
