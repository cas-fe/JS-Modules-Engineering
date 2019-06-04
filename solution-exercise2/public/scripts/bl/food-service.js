// TODO: Step 3
//  - Use ES2015 module syntax: Export class FoodService and import dependencies (e.g. Food)
class FoodService {
    constructor(foodStorage) {
        this.storage = foodStorage;
        this.food = [ ];
    }

    loadData() {
        this.foodOrderTime = 2000; // ms
        this.food = this.storage.getAll().map(f => new Food(f.id, f.name, f.amount, f.amountPerDelivery, f.isMeet));

        if (this.food.length === 0) { // initial data seed
            this.food.push(new Food(0, 'bamboo', 3, 3));
            this.food.push(new Food(1, 'grass', 10, 10));
            this.food.push(new Food(2, 'straw', 10, 10));
            this.food.push(new Food(3, 'beef', 10, 10, true));
            this.food.push(new Food(4, 'chicken', 10, 10, true));
            this.save();
        }
    }

    save() {
        this.storage.update(this.food.map(f => f.toJSON()));
    }

    orderFoodById(foodId) {
        const toOrder = this.food[foodId];
        if (toOrder) {
            toOrder.isOrderPending = true;

            delay(this.foodOrderTime, () => {
                toOrder.amount += toOrder.amountPerDelivery;
                toOrder.isOrderPending = false;
                this.save();
            });
        }
    }
}
