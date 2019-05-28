/**
 * Array Helper Function:
 * Extend Array prototype with a filter method.
 */
Array.prototype.findByName = function(name) {
    name = String(name);
    return this.find(i => i.name === name);
};

/**
 * Public/static Helpers for conversion purposes.
 */
const Convert = {
    toMilliSeconds(tenSecondsTimeUnit) {
        return (tenSecondsTimeUnit * 10000);
    }
};

function delay(timeoutInMs, delayedFunction) {
    return new Promise((resolve, reject) => {
        window.setTimeout(function() {
            try {
                if (typeof(delayedFunction) === 'function') {
                    resolve(delayedFunction());
                } else {
                    resolve();
                }
            } catch (err) {
                reject(err);
            }
        }, timeoutInMs);
    });
}