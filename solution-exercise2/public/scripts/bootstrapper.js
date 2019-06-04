// TODO: Step 3
//  - Use ES2015 module syntax: Export class Bootstrapper and import required dependencies (ZooController / FoodStorage / ...)
class Bootstrapper {
    static start() {
        // - Put it all together: Wire data logic [dl], business logic [bl] and UI controller.
        const foodDataStorage = new FoodStorage();
        const foodService = new FoodService(foodDataStorage);
        const animalService = new AnimalService();
        new ZooController(foodService, animalService).zooAction();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);
