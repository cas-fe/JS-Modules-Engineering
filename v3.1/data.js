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
        return JSON.parse(localStorage.getItem("foodStorage_v31") || "[ ]");
    }

    function writeToLocalStorage(toPersist) {
        localStorage.setItem("foodStorage_v31", JSON.stringify(toPersist));
    }

    return { persist, getAll };
}());