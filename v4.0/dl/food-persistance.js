/**
 * This class stores and retrieves food from the localStorage.
 */
class FoodPersistance {
	constructor() {
	}

    /**
	 * Reads values from the localStorage and returns the parsed from JSON.
	 *
     * @returns {any} Returns the deserialized javascript object.
     */
	readFromLocalStorage() {
		return JSON.parse(localStorage.getItem("foodStorage_v40") || "[ ]");
	}

    /**
     * Stores the given object into the localStorage as JSON.
	 *
     * @param toPersist Specifies the object to be serailized into the JSON format.
     */
	writeToLocalStorage(toPersist) {
		localStorage.setItem("foodStorage_v40", JSON.stringify(toPersist));
	}
}

/**
 * Exposed API facilities.
 */
export default FoodPersistance;