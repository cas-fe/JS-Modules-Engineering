/**
 * Represents the base class for all Animals. It manages state and
 * specifies the favorite food of the animal.
 */
class Animal {
    /**
     * Base constructor for an Animal; do not directly invoke.
     *
     * @param context {AnimalContext} Context which holds the required instances.
     * @param id {number] Id of the animal.
     * @param name {string} Name of the animal to be set.
     * @param compatibleFood {*} The favorite food of the Animal.
     */
    constructor(context, id, name, compatibleFood) {
        this.context = context;
        this.id = id;
        this.isDead = false;
        this.isEatable = false;
        this.name = name;
        this.compatibleFood = compatibleFood || [];
    }

    /**
     * @returns {boolean} Returns true if the current Animal is hungry.
     */
    get foodRequired() {
        return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
    }

    toString() {
        return (this.isDead ? 'RIP ' : '')
            + `${this.name} [${this.constructor.name}]`
            + (this.foodRequired ? ' -hungrig' : '');
    }

    /**
     * Specifies the Animal has been eaten by another Animal.
     */
    eaten() {
        this.isDead = true;
    }

    /**
     * Feeds the animal with the compatible food.
     *
     * @returns {*} Returns an awaiter which can be used as an event to determine when the animal is hungry again.
     */
    feed() {
        for (const foodForAnimal of this.compatibleFood) {
            const foodFound = this.context.foodService.findByName(foodForAnimal.name);

            if (foodFound && foodFound.stock >= foodForAnimal.amount) {
                foodFound.stock -= foodForAnimal.amount;
                this.context.foodService.save();

                return {
                    awaiter: this.setNextFeedAt(foodForAnimal.timeToNextFood),
                    enoughFood: true
                };
            }
        }
        return {
            awaiter: null,
            enoughFood: false
        };
    }

    setNextFeedAt(timeToNextFood) {
        const waitHandle = this.context.timerEngine.waitUntilHungry(timeToNextFood);
        this.nextFeedAt = waitHandle.deliveryTime;
        return waitHandle.awaiter;
    }
}

/**
 * Exposed API facilities.
 */
export default Animal;
