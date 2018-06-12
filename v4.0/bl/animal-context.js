import TimerEngine from '../common/timer-engine.js';
import FoodService from './food-service.js';
import AnimalService from './animal-service.js';

/**
 * Holds all business logic instances needed by the Zoo.
 */
class AnimalContext {
    constructor(persistance) {
        this.persistance = persistance;

        this.timerEngine = new TimerEngine();
        this.foodService = new FoodService(this);
        this.animalService = new AnimalService(this);
    }
}


/**
 * Exposed API facilities.
 */
export default AnimalContext;
