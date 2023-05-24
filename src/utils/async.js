'use strict';
module.exports = {
    promisify,
    stringify,
};

function promisify(fn) {
    return new Promise((res, rej) => {
        try {
            res(fn());
        } catch (err) {
            rej(err);
        }
    });
}

function stringify(msg) {
    return promisify(() => JSON.stringify(msg));
}
