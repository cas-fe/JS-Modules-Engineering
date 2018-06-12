/**
 * Handles the meta data for the available food.
 */
class FoodMeta {
    constructor(name, amountPerDelivery, isMeet) {
        this.name = name || "unknwon";
        this.amountPerDelivery = amountPerDelivery || 1;
        this.isMeet = Boolean(isMeet);
    }
}

const FOOD_META = [
    new FoodMeta("bambus", 3),
    new FoodMeta("grass", 10),
    new FoodMeta("straw", 10),
    new FoodMeta("beef", 10, true),
    new FoodMeta("chicken", 10, true)
].indexBy(meta => meta.name);

/**
 * Exposed API facilities.
 */
export default FOOD_META;
