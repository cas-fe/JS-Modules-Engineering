/**
 * Array Utilities
 */


/**
 * Searches for an array entry according the given key/value pair.
 *
 * @param key Specifies the key to search for.
 * @param value Specifies the value to be compared against.
 * @returns {*} Returns the found element and undefined otherwise.
 */
Array.prototype.findBy = function(key, value) {
    return this.find(i => i[key] === value);
};

/**
 * Indexes the current array according the given hash-function.
 *
 * @param hashFunction To be used to determine the hash index.
 * @returns {Array} Returns the current array with the indexed items.
 */
Array.prototype.indexBy = function(hashFunction) {
    if (typeof(hashFunction) === 'function') {
        this.forEach((item) => {
            this[hashFunction(item)] = item;
        });
    }
    return this;
};

/**
 * Returns true if the current array instance is empty.
 *
 * @returns {boolean} True if there's no length property or the length property contains 0.
 */
Array.prototype.isEmpty = function() {
    return isNaN(this.length) || !this.length;
};

/**
 * Returns the first found element or the given default value.
 *
 * @param defaultValue Default value to be returned if the current array is empty.
 * @returns {*} Returns the first element or the default value (null if none is given).
 */
Array.prototype.first = function(defaultValue=null) {
    return !this.isEmpty() ? this[0] : defaultValue;
};