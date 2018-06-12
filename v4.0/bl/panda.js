import Animal from './animal.js';
import FOOD_META from "./food-meta.js";

/**
 * Represents the vegan Panda animal.
 */
class Panda extends Animal {
    constructor(context, id, name) {
        super(
            context, id, name,
			[
				{name: FOOD_META.bambus.name, amount: 1, timeToNextFood: 10}
			]);

        this.isEatable = true;
    }
}

/**
 * Exposed API facilities.
 */
export default Panda;
