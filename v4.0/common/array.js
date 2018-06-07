/**
 * Array Utilities
 */
Array.prototype.findBy = function(prop, value) {
    return this.find(i => i[prop] === value);
};

Array.prototype.indexBy = function(callback) {
    if (typeof(callback) === 'function') {
        this.forEach((item) => {
            this[callback(item)] = item;
        });
    }
    return this;
};

Array.prototype.isEmpty = function() {
    return isNaN(this.length) || !this.length;
};

Array.prototype.first = function(defaultValue=null) {
    return !this.isEmpty() ? this[0] : defaultValue;
};