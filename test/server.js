let { requestListener } = require('../src/server/listener.js');

let logger = {
    log() {},
    error() {},
    access() {},
};
let req = (url) => {
    return { url };
};
let res = () => {
    return {
        statusCode: 0,
        end(data) {
            data
        },
    };
};

let handler = requestListener({
    logger,
    env: {
        paths: {
            logs: `${process.env.PWD}/logs/`,
            games: `${process.env.PWD}/src/games`,
            static: `${process.env.PWD}/src/static`,
        },
    },
});

Promise.all([
    handler(req('/'), res()),
    handler(req('/static/styles.css'), res()),
    // handler(req('/static/main.js'), res()),
    // handler(req('/games/wasm.loader.js'), res()),
    // handler(req('/api/get'), res()),
    // handler(req('/gasdfsdf/wasm.loader.js'), res())
]).then((a) => console.log(a));
