class Animal {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.isDead = false;
        this.isEatable = false;
        this.compatibleFood = [];
    }

    get foodRequired() {
        return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
    }

    toString() {
        return `${(this.isDead ? 'RIP ' : '')}${this.name}${(this.foodRequired ? ' [hungry]' : '')}`;
    }

    eaten() {
        this.isDead = true;
    }

    feed(eatable, callback){
        for (const foodForAnimal of this.compatibleFood) {
            let foodFound = eatable.food.findByName(foodForAnimal.name);

            if (foodFound && foodFound.amount >= foodForAnimal.amount) {
                this.setNextFeedAt(foodForAnimal.timeToNextFood, callback);
                foodFound.amount -= foodForAnimal.amount;
                return true;
            }
        }
        return false;
    }

    setNextFeedAt(timeToNextFood, callback) {
        const fulledUpTime = Convert.toMilliSeconds(timeToNextFood);
        this.nextFeedAt = +new Date() + fulledUpTime;
        
        delay(fulledUpTime + 100, callback);
    }
}

