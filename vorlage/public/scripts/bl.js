// TODO: Step 1
//  - Place createFood() into a new file in 'scripts/bl/food.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class Food; use 'new Food(id, name ...)' instead of 'createFood(id, name ...)'
//  - Intention: Create a typed model object (which may contain logic) instead of a generic JSON structure.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Food
function createFood(id, name, amount, amountPerDelivery, isMeet) {
    return {
        id,
        name: name || 'unknown',
        amount: amount || 0,
        amountPerDelivery: amountPerDelivery || 1,
        isMeet: Boolean(isMeet),
        isOrderPending: false,

        toJSON() {
            return {
                id: this.id,
                name: this.name,
                amount: this.amount,
                amountPerDelivery: this.amountPerDelivery,
                isMeet: this.isMeet
            };
        }
    };
}


// TODO: Step 1
//  - Place foodService constant into a new file in 'scripts/bl/food-service.js'. Reference 'scripts/bl/food-service.js' in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class FoodService; use 'new FoodService(storage)' in Bootstrapper.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class FoodService and import dependencies (e.g. Food)
const foodService = {
    storage: createStorage(),
    food: [ ],

    loadData() {
        this.foodOrderTime = 2000; // ms
        this.food = this.storage.getAll().map(f => createFood(f.id, f.name, f.amount, f.amountPerDelivery, f.isMeet));

        if (this.food.length === 0) { // initial data seed
            this.food.push(createFood(0, 'bamboo', 3, 3));
            this.food.push(createFood(1, 'grass', 10, 10));
            this.food.push(createFood(2, 'straw', 10, 10));
            this.food.push(createFood(3, 'beef', 10, 10, true));
            this.food.push(createFood(4, 'chicken', 10, 10, true));
            this.save();
        }
    },

    save() {
        this.storage.update(this.food.map(f => f.toJSON()));
    },

    orderFoodById(foodId) {
        const toOrder = this.food[foodId];
        if (toOrder) {
            toOrder.isOrderPending = true;

            delay(this.foodOrderTime, () => {
                toOrder.amount += toOrder.amountPerDelivery;
                toOrder.isOrderPending = false;
                this.save();
            });
        }
    }
};


// TODO: Step 1
//  - Place animalService constant into a new file in 'scripts/bl/animal-service.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class AnimalService; use 'new AnimalService()' in Bootstrapper.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class AnimalService and import dependencies (e.g. Lion / Panda)
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
};


// TODO: Step 1
//  - Place createAnimal() into a new file in 'scripts/bl/animal.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class Animal; use 'new Animal(id, name)' instead of 'createAnimal(id, name)'
//  - Intention: Create a typed model object which represents the base class for Lion's and Panda's.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Animal
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

        feedInternal(eatable, callback) {
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

        feed(eatable, callback) {
            return this.feedInternal(eatable, callback);
        },

        setNextFeedAt(timeToNextFood, callback) {
            const fulledUpTime = Convert.toMilliSeconds(timeToNextFood);
            this.nextFeedAt = +new Date() + fulledUpTime;
            
            delay(fulledUpTime + 100, callback);
        }
    };
}


// TODO: Step 1
//  - Place createPanda() into a new file in 'scripts/bl/panda.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Extract class Panda, derive from Animal (class Panda extends Animal)
//  - Intention: Provide animal specialization with Panda behaviour
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Panda and import dependencies
function createPanda(id, name) {
    const animal = createAnimal(id, `Panda: '${name}'`); // TODO: Step 2 - call base constructor: super(id, name)

    // override behavoir of generic animal (place as members inside Panda class)
    animal.isEatable = true;

    animal.compatibleFood = [
        {name: 'bamboo', amount: 1, timeToNextFood: 1}
    ];

    return animal;
}

// TODO: Step 1
//  - Place createLion() into a new file in 'scripts/bl/lion.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Extract class Lion, derive from Animal (class Lion extends Animal)
//  - Intention: Provide animal specialization with Lion behaviour
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Lion and import dependencies
function createLion(id, name) {
    const animal = createAnimal(id, `Lion: '${name}'`); // TODO: Step 2 - call base constructor: super(id, name)

    // override behavoir of generic animal (place as members inside Lion class)
    animal.compatibleFood = [
        {name: 'beef', amount: 5, timeToNextFood: 5},
        {name: 'chicken', amount: 10, timeToNextFood: 1}
    ];

    animal.feed = function(eatable, callback) {
        if (!this.feedInternal(eatable, callback)) {
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
