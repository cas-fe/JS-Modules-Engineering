import {AnimalService} from '../bl/animal-service.js';
import {FoodService} from '../bl/food-service.js';
import {FoodStorage} from '../dl/food-storage.js';
import {ZooController} from './controllers/zoo-controller.js';


export class Bootstrapper {
    static start() {
        new Bootstrapper().renderZoo();
    }

    renderZoo() {
        const foodService = new FoodService(new FoodStorage());
        const animalService = new AnimalService();
        const zooController = new ZooController(animalService, foodService);

        zooController.zooAction();
    }
}
