/**
 * Array Helper Function:
 * - Extend Array prototype with a filter method.
 */
Array.prototype.findByName = function(name) {
    name = String(name);
    return this.find(i => i.name === name);
};

/**
 * Public/static Helpers for conversion purposes.
 */
class Convert {
    static toMilliSeconds(tenSecondsTimeUnit) {
        return (tenSecondsTimeUnit * 10000);
    }
}

/**
 * Provides a simple and safe mechanism to execute code later.
 */
function delay(timeoutInMs, delayedFunction, errFunction) {
    if (typeof(delayedFunction) === 'function') {
        return window.setTimeout(function() {
            try {
                delayedFunction();
            } catch (err) {
                if (typeof(errFunction) === 'function') {
                    errFunction(err);
                }
                else {
                    throw err;
                }
            }
        }, timeoutInMs);
    }
}
