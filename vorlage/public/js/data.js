/**
 * Food storage facilities which persists and loads DTOs/POJOs (data transfer objects).
 * This logic represents the data layer/driver for the Zoo application.
 */

// TODO: Step 1
//  - Place createStorage() into a new file ('js/services/data/food-storage.js'). Reference 'js/services/data/food-storage.js' in zoo.html.
//  - Analyze code: Is there any duplicated code? How could you refactor that line of code?
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class FoodStorage; use 'new FoodStorage()' instead of 'createStorage()'.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class FoodStorage.
function createStorage() {
    const food = JSON.parse(localStorage.getItem('foodStorage_v1') || "[ ]");
    localStorage.setItem('foodStorage_v1', JSON.stringify(food));

    return {
        food,
        getAll() {
            return food;
        },
        update(food) {
            localStorage.setItem('foodStorage_v1', JSON.stringify(food));
            return food;
        }
    };
}
