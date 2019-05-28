// TODO: Step 1
//  - Create class Food; use 'new Food()' or 'Food.fromDto' instead of 'createFood()'
//  - Intention: Place toDto / static fromDto into this class
function createFood(id, name, amount, amountPerDelivery, isMeet) {
    return {
        id,
        name: name || 'unknwon',
        amount: amount || 0,
        amountPerDelivery: amountPerDelivery || 1,
        isMeet: Boolean(isMeet),
        isOrderPending: false
    };
}

// TODO: Step 1
//  - Create class FoodService
const foodService = {
    food: [ ],

    async loadData() {
        this.food = await getAll();

        if (this.food.length === 0) { // initial data seed
            this.food.push(createFood(0, 'bambus', 3, 3));
            this.food.push(createFood(1, 'grass', 10, 10));
            this.food.push(createFood(2, 'straw', 10, 10));
            this.food.push(createFood(3, 'beef', 10, 10, true));
            this.food.push(createFood(4, 'chicken', 10, 10, true));
            this.save();
        }
    },

    save() {
        persist(this.food);
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
        const lion = createLion(this.animals.length, name);
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
//  - Create class Animal; use 'new Animal()' instead of 'createAnimal()'
//  - Intention: Represents the base class for Lion's and Panda's
function createAnimal(id, name) {
    return { // base 'object'
        id,
        isDead: false,
        isEatable: false,
        name,
        compatibleFood: [],

        get foodRequired() {
            return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
        },

        toString() {
            return `${(this.isDead ? 'RIP ' : '')}${this.name}${(this.foodRequired ? ' [hungry]' : '')}`;
        },

        eaten() {
            this.isDead = true;
        },

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
        },

        setNextFeedAt(timeToNextFood, callback) {
            const fulledUpTime = Convert.toMilliSeconds(timeToNextFood);
            this.nextFeedAt = +new Date() + fulledUpTime;
            
            delay(fulledUpTime + 100, callback);
        }
    };
}


// TODO: Step 1
//  - Extract class Panda, derive from Animal
//  - Intention: Provide animal specialzation with Panda behaviour
function createPanda(id, name) {
    const animal = createAnimal(id, `Panda: '${name}'`); // TODO: Step 1 - call base constructor: super(id, name)

    // override behavoir of generic animal (place as members inside Panda class)
    animal.isEatable = true;

    animal.compatibleFood = [
        {name: 'bambus', amount: 1, timeToNextFood: 1}
    ];

    return animal;
}

// TODO: Step 1
//  - Extract class Lion, derive from Animal
//  - Intention: Provide animal specialzation with Lion behaviour
function createLion(id, name) {
    const animal = createAnimal(id, `Lion: '${name}'`); // TODO: Step 1 - call base constructor: super(id, name)
    animal.baseFeed = animal.feed;

    // override behavoir of generic animal (place as members inside Lion class)
    animal.compatibleFood = [
        {name: 'beef', amount: 5, timeToNextFood: 5},
        {name: 'chicken', amount: 10, timeToNextFood: 1}
    ];

    animal.feed = function(eatable, callback) {
        if (!animal.baseFeed(eatable, callback)) { // TODO: Step 1 - call super.feed(eatable, callback) instead
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
    };

    return animal;
}
