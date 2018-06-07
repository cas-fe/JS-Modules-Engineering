/**
 * Food Persistance (Storage)
 */
class FoodPersistance {
	constructor() {
	}
	
	readFromLocalStorage() {
		return JSON.parse(localStorage.getItem("foodStorage") || "[ ]");
	}
	
	writeToLocalStorage(toPersist) {
		localStorage.setItem("foodStorage", JSON.stringify(toPersist));
	}
}

/**
 * Exposed API facilities.
 */
export default FoodPersistance;