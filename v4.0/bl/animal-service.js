import Lion from './lion.js';
import Panda from './panda.js';

/**
 * Stores and manages the available animals.
 */
class AnimalService {
    constructor(context) {
        this.context = context;
        this.animals = [ ];
    }

    getNextEatableAnimal() {
        for (let animal of this.animals) {
            if (animal.isEatable && !animal.isDead) {
                return animal;
            }
        }
        return null;
    }

    addLion(name) {
        let lion = new Lion(this.context, this.animals.length, name);
        this.animals.push(lion);
        return lion;
    }

    addPanda(name) {
        let panda = new Panda(this.context, this.animals.length, name);
        this.animals.push(panda);
        return panda;
    }
}


/**
 * Exposed API facilities.
 */
export default AnimalService;
