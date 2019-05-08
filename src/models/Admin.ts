import User, { USER_ROLE_TYPE } from "./User";

class Admin extends User {
    private getRole(): USER_ROLE_TYPE {
        return User.Role.ADMIN;
    }

    static get instance(): Admin {
        return new Admin();
    }
}

export default Admin;
