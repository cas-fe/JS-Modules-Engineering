import Animal from './animal.js';
import FOOD_META from './food-meta.js';

const ANIMAL_TIME_TO_NEXT_FOOD = 240; // s

class Lion extends Animal {
    constructor(context, id, name) {
        super(
            context, id, name,
			[
				{name: FOOD_META.beef.name, amount: 5, timeToNextFood: 50},
				{name: FOOD_META.chicken.name, amount: 10, timeToNextFood: 10}
			]);
    }

    feed() {
        const feedHandle = super.feed();

        if (!feedHandle.enoughFood) {
            let victim = this.context.animalService.getNextEatableAnimal();

            if (victim) {
                victim.eaten();
                return {
                    awaiter: this.setNextFeedAt(ANIMAL_TIME_TO_NEXT_FOOD),
                    enoughFood: true
                };
            }
        }
        return feedHandle;
    };
}


/**
 * Exposed API facilities.
 */
export default Lion;
