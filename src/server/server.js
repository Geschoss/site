let https = require('https');
let fs = require('fs');
let { requestListener } = require('./listener.js');
let { makeRoute } = require('./route.js');

const server = {
    start({ port, logger, env }) {
        const route = makeRoute({ logger, env });
        const httpsOptions = {
            key: fs.readFileSync(`${env.paths.security}/key.pem`),
            cert: fs.readFileSync(`${env.paths.security}/cert.pem`),
        };

        https
            .createServer(httpsOptions, requestListener({ logger, env, route }))
            .listen(port, () => {
                console.log(`Server start on port: ${port}`);
            });
    },
};

module.exports = server;
