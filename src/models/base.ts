import firebase, {auth, firestore} from '@/firebase';
import { FirebaseError } from 'firebase';

export type OnChangesCallback = (error: Error | null | undefined, data: Object | null | undefined) => {}

class Model {
    private _collection: string = '';
    
    protected db: firebase.firestore.Firestore = firestore;
    public id: string | undefined;
    protected updatedAt: firebase.firestore.Timestamp | undefined;
    protected createdAt: firebase.firestore.Timestamp | undefined;

    get COLLECTION_NAME(): string {
        if (!this._collection)
            throw new TypeError("No collection name");
        return this._collection;
    }
    set COLLECTION_NAME(name: string) {
        this._collection = name;
    }

    get collection(): firebase.firestore.CollectionReference {
        return this.db.collection(this.COLLECTION_NAME);
    }

    constructor(collection: string) {
        this.COLLECTION_NAME = collection;
    }

    public static get instance(): Model {
        throw new TypeError("Override this");
    }

    public serialize(): Object {
        const object = {...this};
        delete object._collection;
        delete object.id;
        return JSON.parse(JSON.stringify(object));
    }

    public static from(raw: Object): Model {
        const model = this.instance;
        Object.assign(model, raw);
        return model;
    }

    public async insert(): Promise<Model> {
        if (this.id) throw new TypeError("id must be null");
        this.createdAt = firebase.firestore.Timestamp.now();
        this.updatedAt = this.createdAt;

        const dataRef = await this.collection.add(this.serialize());
        const data = await dataRef.get();
        
        Object.assign(this, data.data());
        this.id = dataRef.id;

        return this;
    }

    public async update(): Promise<void> {
        if (!this.id) throw new TypeError("id not found");
        this.updatedAt = firebase.firestore.Timestamp.now();

        await this.collection.doc(this.id).update(this.serialize());
    }

    public async delete(): Promise<void> {
        if (!this.id) throw new TypeError("ID not found");
        await this.collection.doc(this.id).delete();
    }

    public static async find(id: string): Promise<Model>
    {
        const docData = await this.instance
                                    .collection
                                    .doc(id)
                                    .get();
        const model = this.from(docData);
        model.id = docData.id;
        return model;
    }

    public static async query(
        field: firebase.firestore.FieldPath, 
        compareStr: firebase.firestore.WhereFilterOp, 
        value: any,
        limit: number = 15,
        offset: number = 0,
    ): Promise<Model[]>
    {
        const docs = await this.instance.collection
                        .where(field, compareStr, value)
                        .limit(limit)
                        .startAt(offset)
                        .get();
        const result: Model[] = [];
        docs.forEach((doc)=>{
            const model = this.from(doc);
            model.id = doc.id;
            result.push(model);
        });

        return result;
    }

    public onChanges(callback: OnChangesCallback) {
        if (this.id && typeof callback === "function") {
            this.collection.doc(this.id)
            .onSnapshot((snapshot)=>{
                callback(null, snapshot.data());
            }, (error) => {
                callback(error, null);
            });
        }
    }
}

export default Model;
