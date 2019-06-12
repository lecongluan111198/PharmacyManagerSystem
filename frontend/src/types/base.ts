export interface Store {
    id: string;
    name: string;
}

export interface BaseInterface {
    id: number;
    store_id?: number;
    created_at?: string;
    updated_at?: string;
}
