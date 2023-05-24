let http = require('http');
let { requestListener } = require('./listener.js');
let { makeRoute } = require('./route.js');

const server = {
    start({ port, logger, env }) {
        const route = makeRoute({ logger, env });
        http
            .createServer(requestListener({ logger, env, route }))
            .listen(port, () => {
                console.log(`Server start on port: ${port}`);
            });
    },
};

module.exports = server;
