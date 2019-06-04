/**
 * Food storage facilities which persists and loads DTOs/POJOs (data transfer objects).
 * This logic represents the data layer/driver for the Zoo application.
 */

// TODO: Step 3
//  - Use ES2015 module syntax: Export class FoodStorage
class FoodStorage {
    constructor() {
        const food = JSON.parse(localStorage.getItem('foodStorage_v1') || "[ ]");
        this.food = food;
        localStorage.setItem('foodStorage_v1', JSON.stringify(food));
    }

    getAll() {
        return this.food;
    }

    update(food) {
        localStorage.setItem('foodStorage_v1', JSON.stringify(food));
        return food;
    }
}
