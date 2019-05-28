class Food {
    constructor(id, name, amount, amountPerDelivery, isMeet) {
        this.id = id;
        this.name = name || 'unknwon';
        this.amount = amount || 0;
        this.amountPerDelivery = amountPerDelivery || 1;
        this.isMeet = Boolean(isMeet);
        this.isOrderPending = false;
    }

    static fromDto({id, name, amount, amountPerDelivery, isMeet}) {
        return new Food(id, name, amount, amountPerDelivery, isMeet);
    }

    toDto() {
        return {
            id: this.id,
            name: this.name,
            amount: this.amount,
            amountPerDelivery: this.amountPerDelivery,
            isMeet: this.isMeet
        }
    }
}


// TODO: Step 1
//  - Create class FoodService
const foodService = {
    food: [ ],
    storage: new FoodStorage(),

    async loadData() {
        this.food = (await this.storage.getAll()).map(Food.fromDto);

        if (this.food.length === 0) { // initial data seed
            this.food.push(new Food(0, 'bambus', 3, 3));
            this.food.push(new Food(1, 'grass', 10, 10));
            this.food.push(new Food(2, 'straw', 10, 10));
            this.food.push(new Food(3, 'beef', 10, 10, true));
            this.food.push(new Food(4, 'chicken', 10, 10, true));
            this.save();
        }
    },

    save() {
        this.storage.persist(this.food.map(f => f.toDto()));
    },

    async orderFoodById(foodId) {
        const toOrder = this.food[foodId];
        if (toOrder) {
            toOrder.isOrderPending = true;
            await delay(2000);
            toOrder.amount += toOrder.amountPerDelivery;
            toOrder.isOrderPending = false;
            this.save();
        }
    }
}


// TODO: Step 1
//  - Create class AnimalService
const animalService = {
    animals: [ ],

    addLion(name) {
        const lion = new Lion(this.animals.length, name);
        this.animals.push(lion);
        return lion;
    },

    addPanda(name) {
        const panda = createPanda(this.animals.length, name);
        this.animals.push(panda);
        return panda;
    }
}

// TODO: Step 1
//  - Intention: Represents the base class for Lion's and Panda's
class Animal {
    constructor(id, name) {
        this.id = id;
        this.isDead = false;
        this.isEatable = false;
        this.name = name;
        this.compatibleFood = [ ];
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

// TODO: Step 1
//  - Extract class Panda, derive from Animal (see class Lion). Call new Panda's constructor in animalService.
//  - Intention: Provide animal specialzation with Panda behaviour
function createPanda(id, name) {
    const animal = new Animal(id, `Panda: '${name}'`); // TODO: Step 1 - call base constructor: super(id, name)

    // override behavoir of generic animal (place as members inside Panda constructor)
    animal.isEatable = true;

    animal.compatibleFood = [
        {name: 'bambus', amount: 1, timeToNextFood: 1}
    ];

    return animal;
}

// TODO: Step 1
//  - Extract class Lion, derive from Animal
//  - Intention: Provide animal specialzation with Lion behaviour
class Lion extends Animal {
    constructor(id, name) {
        super(id, `Lion: '${name}'`);
        
        this.compatibleFood = [
            {name: 'beef', amount: 5, timeToNextFood: 5},
            {name: 'chicken', amount: 10, timeToNextFood: 1}
        ];
    }

    // override behavoir of generic animal
    feed(eatable, callback) {
        if (!super.feed(eatable, callback)) {
            const panda = eatable.animals.filter(p => {
                return (p.isEatable && !p.isDead);
            });
            if (panda[0]) {
                this.setNextFeedAt(24, callback);
                panda[0].eaten();
                return true;
            }
            return false;
        }
        return true;
    }
}
