import Food from './food.js';
import FOOD_META from './food-meta.js';

/**
 * Created by sgehrig on 03.06.2015.
 */

class FoodService {
    constructor(context) {
        this.context = context;

        let loadedFood = this.context.persistance.readFromLocalStorage();

        if (!loadedFood || loadedFood.length === 0) {
            this.food = [ ];
            this.food.push(new Food(0, FOOD_META[0], 3));
            this.food.push(new Food(1, FOOD_META[1], 10));
            this.food.push(new Food(2, FOOD_META[2], 10));
            this.food.push(new Food(3, FOOD_META[3], 10));
            this.food.push(new Food(4, FOOD_META[4], 10));
            this.save();
        }
        else {
            this.food = loadedFood.map((f, idx) => Food.fromJSON(idx, FOOD_META[f.name], f));
        }
    }

    findByName(name) {
        return this.food.find(f => f.meta.name === name);
    }

    save() {
        this.context.persistance.writeToLocalStorage(this.food.map(f => f.toJSON()));
    }

    async orderFoodById(foodId, callback) {
        return new Promise(async (resolve, reject) => {
            const toOrder = this.food[foodId];
            if (toOrder) {
                await this.context.timerEngine.waitForDelivery();
                toOrder.stock += toOrder.meta.amountPerDelivery;
                this.save();

                resolve();
            } else {
                reject();
            }
        });
    }
}

/**
 * Exposed API facilities.
 */
export default FoodService;
