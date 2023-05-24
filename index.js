'use strict';

let { create_logger, server } = require('./src/server/index.js');

const logs_path = `${__dirname}/logs/`;

let logger = create_logger({
    path: logs_path,
});

server.start({
    port: 3000,
    logger,
});