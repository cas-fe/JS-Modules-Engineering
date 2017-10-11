/**
 * Food Storage
 */
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


/**
 * Exposed API facilities.
 */
export default { getAll, persist };