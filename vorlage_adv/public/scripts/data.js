/**
 * Food storage facilities which persists and loads DTOs/POJOs (data transfer objects).
 */

 // TODO: Step 1
//  - Refactor facilities into a FoodStorage class.
//  - Intention: Persists data in the localStorage (browser), or in a further release on a server.
let storage = readFromLocalStorage();
writeToLocalStorage(storage);

async function getAll() {
    return Promise.resolve(storage);
}

async function persist(toPersist) {
    return new Promise((resolve, reject) => {
        storage = toPersist;
        writeToLocalStorage(storage);
        resolve(toPersist);
    });
}

function readFromLocalStorage() {
    return JSON.parse(localStorage.getItem('foodStorage_v1') || "[ ]");
}

function writeToLocalStorage(toPersist) {
    localStorage.setItem('foodStorage_v1', JSON.stringify(toPersist));
}
