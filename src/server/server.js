let { requestListener } = require('./listener.js');
let { makeRoute } = require('./route.js');

const server = {
    start({ port, logger, env, http }) {
        const route = makeRoute({ logger, env });
        http.createServer(requestListener({ logger, env, route })).listen(port, () => {
            console.log(`Server start!`);
            console.log(`http://localhost:${port}`);
        });
    },
};

module.exports = server;
