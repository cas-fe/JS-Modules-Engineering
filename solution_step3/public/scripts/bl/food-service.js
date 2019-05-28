import {Food} from './food.js';
import {delay} from '../common/utils.js';

export class FoodService {
    constructor(foodStorage) {
        this.food = [ ];
        this.foodStorage = foodStorage;
    }
    
    async loadData() {
        this.food = (await this.foodStorage.getAll()).map(Food.fromDto);

        if (this.food.length === 0) { // initial data seed
            this.food.push(new Food(0, 'bambus', 3, 3));
            this.food.push(new Food(1, 'grass', 10, 10));
            this.food.push(new Food(2, 'straw', 10, 10));
            this.food.push(new Food(3, 'beef', 10, 10, true));
            this.food.push(new Food(4, 'chicken', 10, 10, true));
            this.save();
        }
    }

    findByName(name) {
        return this.food.findByName(name);
    }

    save() {
        this.foodStorage.persist(this.food.map(f => f.toDto()));
    }

    async orderFoodById(foodId) {
        const toOrder = this.food[foodId];
        if (toOrder) {
            toOrder.isOrderPending = true;
            await delay(2000);
            toOrder.amount += toOrder.amountPerDelivery;
            toOrder.isOrderPending = false;
            this.save();
        }
    }
}
