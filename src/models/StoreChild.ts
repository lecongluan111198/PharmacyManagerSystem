import Model from "./base";
import firebase from '@/firebase';
import Store from '@/models/Store';

class StoreChild extends Model {
    protected storeRef: firebase.firestore.DocumentReference | undefined;

    public async getStore(): Promise<Store>
    {
        if (!this.storeRef) 
            throw new Error("Store not found");
        else {
            const storeRef = await this.storeRef.get();
            if (storeRef.exists) {
                const store = Store.from(storeRef.data() || {}) as Store;
                store.id = storeRef.id;
                return store;
            } else {
                throw new Error("Store not found");
            }
        }
    }
}

export default StoreChild;
