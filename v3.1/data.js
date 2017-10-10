/**
 * Food Storage
 */
let foodStorage = (function() {
    "use strict";

    const food = [];

    const storage = JSON.parse(localStorage.getItem("foodStorage") || "[ ]");

    persist();

    if (storage.length === 0) {
        storage.push({name: "bambus", amount : 3, amountPerDelivery : 3 });
        storage.push({name: "grass", amount : 10, amountPerDelivery : 10 });
        storage.push({name: "straw", amount : 10, amountPerDelivery : 10 });
        storage.push({name: "beef", amount : 10, amountPerDelivery : 10, isMeet : true });
        storage.push({name: "chicken", amount : 10, amountPerDelivery : 10, isMeet : true });
    }

    function findByName(name) {
        return storage.findByName(name);
    }

    function getAll() {
        return storage;
    }

    function orderFood(food, callback) {
        setTimeout(
            function () {
                food.amount += food.amountPerDelivery;
                persist();
                
                if (typeof(callback) === 'function') {
                    callback();
                }
            }, 2000)
    }

    function persist() {
        localStorage.setItem("foodStorage", JSON.stringify(storage));
    }

    return {
        findByName : findByName,
        getAll : getAll,
        orderFood : orderFood
    };
}());