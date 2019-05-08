import User, { USER_ROLE_TYPE } from "./User";

class Admin extends User {
    static get instance(): Admin {
        return new Admin();
    }
}

export default Admin;
