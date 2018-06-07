class Animal {
    constructor(context, id, name, compatibleFood) {
        this.context = context;
        this.id = id;
        this.isDead = false;
        this.isEatable = false;
        this.name = name;
        this.compatibleFood = compatibleFood || [];
    }

    get foodRequired() {
        return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
    }

    toString() {
        return (this.isDead ? 'RIP ' : '')
            + `${this.name} [${this.constructor.name}]`
            + (this.foodRequired ? ' -hungrig' : '');
    }

    eaten() {
        this.isDead = true;
    }

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
