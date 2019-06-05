/**
 * Food storage facilities which persists and loads DTOs/POJOs (data transfer objects).
 * This logic represents the data layer/driver for the Zoo application.
 */

// TODO: Step 1
//  - Place storage constant into a new file in 'scripts/dl/food-storage.js'. Reference 'scripts/bl/food-storage.js' in zoo.html.
//  - Analyze code: Is there any duplicated code? How could you refactor that line of code?
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class FoodStorage; use 'new FoodStorage()' in Bootstrapper.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class FoodStorage
function createStorage() {
    const food = JSON.parse(localStorage.getItem('foodStorage_v1') || "[ ]");
    this.food = food;
    localStorage.setItem('foodStorage_v1', JSON.stringify(food));

    return {
        food,
        getAll() {
            return this.food;
        },
        update(food) {
            localStorage.setItem('foodStorage_v1', JSON.stringify(food));
            return food;
        }
    };
}
