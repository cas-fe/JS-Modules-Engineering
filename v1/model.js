"use strict";

// animals list
const animals = [ ];
const foodStorage = JSON.parse(localStorage.getItem("foodStorage_v10") || "[ ]");

localStorage.setItem("foodStorage_v10", JSON.stringify(foodStorage));

if (foodStorage.length === 0) {
    foodStorage.push({name: "bambus", amount : 3, amountPerDelivery : 3 });
    foodStorage.push({name: "grass", amount : 10, amountPerDelivery : 10 });
    foodStorage.push({name: "straw", amount : 10, amountPerDelivery : 10 });
    foodStorage.push({name: "beef", amount : 10, amountPerDelivery : 10, isMeet : true });
    foodStorage.push({name: "chicken", amount : 10, amountPerDelivery : 10, isMeet : true });
}

function addTime(hours) {
    return +new Date() + hours * 10000; // new Date().setTime(new Date().getTime() + (hours*60*60*1000));
}

function findFood(name){
    for (let i = 0; i< foodStorage.length; ++i) {
        if (foodStorage[i].name === name)
        {
            return foodStorage[i];
        }
    }
}

function printAnimal(animal) {
    return animal.name + "[" + animal.type + "]" + (animal.foodRequired() ? " -hungrig" : "");
}

function isFoodRequired(animal) {
    return animal.nextFeedAt == null || animal.nextFeedAt < +new Date();
}

function feedAnimal(animal){
    for (let i = 0 ; i < animal.compatibleFood.length; ++i) {
        let food = animal.compatibleFood[i];
        let foodFound = findFood(food.name);

        if (foodFound && foodFound.amount >= food.amount) {
            animal.nextFeedAt = addTime(food.timeToNextFood);
            foodFound.amount -= food.amount;
            return true;
        }
    }
    return false;
}

function createLion(name) {
    return {
        type: "lion",
        name: name,
        compatibleFood : [{name:"beef", amount: 5, timeToNextFood : 5}, {name:"chicken", amount: 10, timeToNextFood : 1}],
        foodRequired: function () {
            return isFoodRequired(this);
        },
        toString: function () {
            return printAnimal(this);
        },
        feed: function () {
            if(!feedAnimal(this)) {
                let panda = animals.filter(function (x) { return x.type === "panda" && !x.isDead });
                if (panda[0]) {
                    this.nextFeedAt = addTime(24);
                    panda[0].eaten();
                    return true;
                }
                return false;
            }
            return true;
        }
    };
}

function createPanda(name) {
    return {
        type: "panda",
        name: name,
        compatibleFood : [{name:"bambus", amount: 1, timeToNextFood : 1}],
        foodRequired: function () {
            return !this.isDead && isFoodRequired(this);
        },
        toString: function () {
            return (this.isDead ? "RIP " : '') + printAnimal(this);
        },
        eaten: function () {
            this.isDead = true;
        },
        feed: function () {
            return feedAnimal(this);
        }
    };
}