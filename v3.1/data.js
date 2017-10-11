/**
 * Food Storage
 */
const foodStorage = (function() {
    "use strict";

    let storage = readFromLocalStorage();
    writeToLocalStorage(storage);

    function getAll() {
        return storage;
    }

    function persist(toPersist) {
        storage = toPersist;
        writeToLocalStorage(storage);
    }

    function readFromLocalStorage(toPersist) {
        return JSON.parse(localStorage.getItem("foodStorage") || "[ ]");
    }

    function writeToLocalStorage(toPersist) {
        localStorage.setItem("foodStorage", JSON.stringify(toPersist));
    }

    return { persist, getAll };
}());