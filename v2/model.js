"use strict";

// animals list
const animals = [ ];
const foodStorage = JSON.parse(localStorage.getItem("foodStorage") || "[ ]");

localStorage.setItem("foodStorage", JSON.stringify(foodStorage));

if (foodStorage.length === 0) {
    foodStorage.push({name: "bambus", amount : 3, amountPerDelivery : 3 });
    foodStorage.push({name: "grass", amount : 10, amountPerDelivery : 10 });
    foodStorage.push({name: "straw", amount : 10, amountPerDelivery : 10 });
    foodStorage.push({name: "beef", amount : 10, amountPerDelivery : 10, isMeet : true });
    foodStorage.push({name: "chicken", amount : 10, amountPerDelivery : 10, isMeet : true });
}

Array.prototype.findByName = function(name) {
    for (let i = 0; i< this.length; ++i) {
        if (this[i].name === name)
        {
            return this[i];
        }
    }
};


class Animal {
    constructor(name) {
        this.isDead = false;
        this.name = name;
        this.compatibleFood = [];
    }

    foodRequired() {
        return !this.isDead && this.isFoodRequired(this);
    }
    toString() {
        return (this.isDead ? "RIP " : '') + this.name + "[" + this.constructor.name + "]" + (this.foodRequired() ? " -hungrig" : "");
    }
    eaten() {
        this.isDead = true;
    }
    feed() {
        return this.feedAnimal();
    }
    isFoodRequired() {
        return !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date());
    }
    feedAnimal(){
        for (let i = 0 ; i<this.compatibleFood.length; ++i) {
            let foodForAnimal = this.compatibleFood[i];
            let foodFound = foodStorage.findByName(foodForAnimal.name);

            if (foodFound && foodFound.amount >= foodForAnimal.amount) {
                this.nextFeedAt = addTime(foodForAnimal.timeToNextFood);
                foodFound.amount -= foodForAnimal.amount;
                return true;
            }
        }
        return false;
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
        if (!super.feedAnimal()) {
            let panda = animals.filter(function (x) {
                return (x instanceof Panda && !x.isDead);
            });
            if (panda[0]) {
                this.nextFeedAt = addTime(24);
                panda[0].eaten();
                return true;
            }
            return false;
        }
        return true;
    };
}


function createLion(name) {
    return new Lion(name);
}

function createPanda(name) {
    return new Panda(name);
}


function addTime(hours) {
    return +new Date() + hours * 10000; // new Date().setTime(new Date().getTime() + (hours*60*60*1000));
}
