/**
 * Specifies a food entry within the storage with a relation to the underlying META.
 */
class Food {
    constructor(id, meta, stock) {
        this.id = id;
        this.meta = meta;
        this.stock = stock || 0;
    }
    toJSON() {
        return {
            name: this.meta.name,
            stock: this.stock,
        };
    }
    static fromJSON(id, meta, obj) {
        return new Food(id, meta, obj.stock);
    }
}



/**
 * Exposed API facilities.
 */
export default Food;
