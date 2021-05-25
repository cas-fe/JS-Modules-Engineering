// TODO: Step 2
//  - Create class FoodService; use 'new FoodService(storage)' in Bootstrapper.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class FoodService and import dependencies (e.g. Food)
const foodService = {
    storage: createStorage(),
    food: [ ],

    loadData() {
        this.foodOrderTime = 2000; // ms
        this.food = this.storage.getAll().map(f => createFood(f.id, f.name, f.amount, f.amountPerDelivery, f.isMeet));

        if (this.food.length === 0) { // initial data seed
            this.food.push(createFood(0, 'bamboo', 3, 3));
            this.food.push(createFood(1, 'grass', 10, 10));
            this.food.push(createFood(2, 'straw', 10, 10));
            this.food.push(createFood(3, 'beef', 10, 10, true));
            this.food.push(createFood(4, 'chicken', 10, 10, true));
            this.save();
        }
    },

    save() {
        this.storage.update(this.food.map(f => f.toJSON()));
    },

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
};
