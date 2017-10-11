/**
 * Created by sgehrig on 03.06.2015.
 */

const foodRepo = (function() {
    "use strict";

    const storage = foodStorage.getAll();

    if (storage.length === 0) {
        storage.push({name: "bambus", amount : 3, amountPerDelivery : 3 });
        storage.push({name: "grass", amount : 10, amountPerDelivery : 10 });
        storage.push({name: "straw", amount : 10, amountPerDelivery : 10 });
        storage.push({name: "beef", amount : 10, amountPerDelivery : 10, isMeet : true });
        storage.push({name: "chicken", amount : 10, amountPerDelivery : 10, isMeet : true });

        foodStorage.persist(storage);
    }

    function findFoodByName(name) {
        return storage.findByName(name);
    }

    function orderFood(food, callback) {
        setTimeout(
            function () {
                food.amount += food.amountPerDelivery;
                foodStorage.persist(storage);

                if (typeof(callback) === 'function') {
                    callback();
                }
            }, 2000)
    }

    function getStorage() {
        return storage;
    }

    return { orderFood, findFoodByName, getStorage };
})();


const animalRepo = (function() {
    "use strict";

    const animals = [];


    class Animal {
        constructor(name) {
            this.isDead = false;
            this.name = name;
            this.compatibleFood = [];
        }

        toString() {
            return (this.isDead ? "RIP " : '') + this.name + "[" + this.constructor.name + "]" + (this.isFoodRequired() ? " -hungrig" : "");
        }
        eaten() {
            this.isDead = true;
        }
        isFoodRequired() {
            return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
        }
        feed(){
            for (let i = 0 ; i<this.compatibleFood.length; ++i) {
                let foodForAnimal = this.compatibleFood[i];
                let foodFound = foodRepo.findFoodByName(foodForAnimal.name);

                if (foodFound && foodFound.amount >= foodForAnimal.amount) {
                    this.nextFeedAt = Animal.addTime(foodForAnimal.timeToNextFood);
                    foodFound.amount -= foodForAnimal.amount;
                    return true;
                }
            }
            return false;
        }
        static addTime(hours) {
            return +new Date() + hours * 10000; // new Date().setTime(new Date().getTime() + (hours*60*60*1000));
        }
    }


    class Panda extends Animal {
        constructor(name) {
            super(name);
            this.compatibleFood = [{name: "bambus", amount: 1, timeToNextFood: 1}];
        }
    }

    class Lion extends Animal{
        constructor(name) {
            super(name);
            this.compatibleFood = [{name: "beef", amount: 5, timeToNextFood: 5}, {name: "chicken",amount: 10,timeToNextFood: 1}];
        }

        feed() {
            if (!super.feed()) {
                let panda = animals.filter(function (x) {
                    return (x instanceof Panda && !x.isDead);
                });
                if (panda[0]) {
                    this.nextFeedAt = Animal.addTime(24);
                    panda[0].eaten();
                    return true;
                }
                return false;
            }
            return true;
        };
    }


    function addLion(name) {
        let lion = new Lion(name);
        animals.push(lion);
        return lion;
    }

    function addPanda(name) {
        let panda = new Panda(name);
        animals.push(panda);
        return panda;
    }

    function getAnimals() {
        return animals;
    }

    return { addLion, addPanda, getAnimals };
})();