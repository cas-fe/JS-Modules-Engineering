import {FoodStorage} from './dl/food-storage.js';
import {FoodService} from './bl/food-service.js';
import {AnimalService} from './bl/animal-service.js';
import {ZooController} from './ui/zoo-controller.js';

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
