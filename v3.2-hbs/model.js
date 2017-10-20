import {default as foodStorage} from './data.js';

/**
 * Created by sgehrig on 03.06.2015.
 */

class Food {
    constructor(id, name, amount, amountPerDelivery, isMeet) {
        this.id = id;
        this.name = name || "unknwon";
        this.amount = amount || 0;
        this.amountPerDelivery = amountPerDelivery || 1;
        this.isMeet = Boolean(isMeet);
    }
    toJSON() {
        return {
            name: this.name,
            amount: this.amount,
            amountPerDelivery: this.amountPerDelivery,
            isMeet:this.isMeet
        };
    }
    static fromJSON(id, obj) {
        return new Food(id, obj.name, obj.amount, obj.amountPerDelivery, obj.isMeet);
    }
}


class FoodService {
    constructor() {
        let foodFromStorage = foodStorage.getAll();

        if (foodFromStorage.length === 0) {
            this.food = [ ];
            this.food.push(new Food(0, "bambus", 3, 3));
            this.food.push(new Food(1, "grass", 10, 10));
            this.food.push(new Food(2, "straw", 10, 10));
            this.food.push(new Food(3, "beef", 10, 10, true));
            this.food.push(new Food(4, "chicken", 10, 10, true));
            this.save();
        }
        else {
            this.food = foodFromStorage.map((f, idx) => Food.fromJSON(idx, f));
        }
    }

    findByName(name) {
        return this.food.findByName(name);
    }

    save() {
        foodStorage.persist(this.food.map(f => f.toJSON()));
    }

    orderFoodById(foodId, callback) {
        let toOrder = this.food[foodId];
        if (toOrder) {
            setTimeout(
                () => {
                    toOrder.amount += toOrder.amountPerDelivery;
                    this.save();

                    if (typeof(callback) === 'function') {
                        callback();
                    }
                }, 2000);
        }
    }
}


class AnimalService {
    constructor(foodService) {
        this.foodService = foodService;
        this.animals = [ ];
    }

    addLion(name) {
        let lion = new Lion(this, this.animals.length, name);
        this.animals.push(lion);
        return lion;
    }

    addPanda(name) {
        let panda = new Panda(this, this.animals.length, name);
        this.animals.push(panda);
        return panda;
    }
}

class Animal {
    constructor(manager, id, name) {
        this.manager = manager;
        this.id = id;
        this.isDead = false;
        this.name = name;
        this.compatibleFood = [];
    }

    get foodRequired() {
        return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
    }
    toString() {
        return (this.isDead ? "RIP " : '') + this.name + "[" + this.constructor.name + "]" + (this.foodRequired ? " -hungrig" : "");
    }
    eaten() {
        this.isDead = true;
    }
    feed(callback){
        for (let i = 0 ; i<this.compatibleFood.length; ++i) {
            let foodForAnimal = this.compatibleFood[i];
            let foodFound = this.manager.foodService.findByName(foodForAnimal.name);

            if (foodFound && foodFound.amount >= foodForAnimal.amount) {
                this.setNextFeedAt(foodForAnimal.timeToNextFood, callback);
                foodFound.amount -= foodForAnimal.amount;
                return true;
            }
        }
        return false;
    }
    setNextFeedAt(timeToNextFood, callback) {
        let fulledUpTime = Animal.toMilliSeconds(timeToNextFood);
        this.nextFeedAt = +new Date() + fulledUpTime;

        if (typeof(callback) === 'function') {
            setTimeout(callback, fulledUpTime + 100);
        }
    }
    static toMilliSeconds(tenSecondsTimeUnit) {
        return (tenSecondsTimeUnit * 10000);
    }
}


class Panda extends Animal {
    constructor(manager, id, name) {
        super(manager, id, name);
        this.compatibleFood = [
            {name: "bambus", amount: 1, timeToNextFood: 1}
        ];
    }
}

class Lion extends Animal{
    constructor(manager, id, name) {
        super(manager, id, name);
        this.compatibleFood = [
            {name: "beef", amount: 5, timeToNextFood: 5},
            {name: "chicken",amount: 10,timeToNextFood: 1}
        ];
    }

    feed(callback) {
        if (!super.feed(callback)) {
            let panda = this.manager.animals.filter(p => {
                return (p instanceof Panda && !p.isDead);
            });
            if (panda[0]) {
                this.setNextFeedAt(24, callback);
                panda[0].eaten();
                return true;
            }
            return false;
        }
        return true;
    };
}


/**
 * Exposed API facilities.
 */
export default { AnimalService, FoodService };
