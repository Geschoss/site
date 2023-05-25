'use strict';
let http = require('http');
let { create_logger, server } = require('./server/index.js');

let paths = {
    logs: `${process.env.PWD}/logs/`,
    games: `${process.env.PWD}/src/games`,
    static: `${process.env.PWD}/src/static`,
    security: `${process.env.PWD}/src/security`,
};

let PORT = 3000;
let logger = create_logger({
    path: paths.logs,
});

server.start({
    http,
    port: PORT,
    logger,
    env: {
        paths,
    },
});
