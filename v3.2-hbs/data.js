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
    return JSON.parse(localStorage.getItem("foodStorage_v32hbs") || "[ ]");
}

function writeToLocalStorage(toPersist) {
    localStorage.setItem("foodStorage_v32hbs", JSON.stringify(toPersist));
}


/**
 * Exposed API facilities.
 */
export default { getAll, persist };