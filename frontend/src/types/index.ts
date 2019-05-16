export type UserRoleType = 0 | 1 | 2 | 4;
export enum UserRole {
    ADMIN = 0,
    SALE = 1,
    STORAGE_MANAGER = 2,
    TAG_MANAGER = 3,
}

export interface Store {
    id: string;
    name: string;
}

export interface BaseInterface {
    id: string;
    store_id: string;
}

export interface User extends BaseInterface {
    name: string;
    email: string;
    role: UserRoleType;
}


