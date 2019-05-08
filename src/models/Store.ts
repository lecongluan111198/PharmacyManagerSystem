import Model from "./base";

class Store extends Model {

    constructor() {
        super("stores");
    }

    static get instance(): Store {
        return new Store();
    }
}

export default Store;
