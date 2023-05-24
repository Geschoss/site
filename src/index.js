'use strict';

let { create_logger, server } = require('./server/index.js');

const paths = {
    logs: `${process.env.PWD}/logs/`,
    games: `${process.env.PWD}/src/games`,
    static: `${process.env.PWD}/src/static`,
};

let logger = create_logger({
    path: paths.logs,
});

server.start({
    port: 3000,
    logger,
    env: {
        paths,
    },
});
