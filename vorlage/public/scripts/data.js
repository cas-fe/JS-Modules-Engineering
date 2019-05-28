class FoodStorage {
    constructor() {
        this.storage = FoodStorage.readFromLocalStorage();
        FoodStorage.writeToLocalStorage(this.storage);
    }

    async getAll() {
        return Promise.resolve(this.storage);
    }
    
    async persist(toPersist) {
        return new Promise((resolve, reject) => {
            this.storage = toPersist;
            FoodStorage.writeToLocalStorage(this.storage);
            resolve(toPersist);
        });
    }
    
    static readFromLocalStorage() {
        return JSON.parse(localStorage.getItem('foodStorage_v1') || "[ ]");
    }

    static writeToLocalStorage(toPersist) {
        localStorage.setItem('foodStorage_v1', JSON.stringify(toPersist));
    }
}


