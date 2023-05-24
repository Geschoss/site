let fs = require('fs');

module.exports = {
    requestListener,
};

function requestListener({ logger, env, route }) {
    return async (req, res) => {
        let file = route.makeFile(req.url);
        let handler = route.routes[file.type];
        try {
            logger.log({ type: 'req', url: req.url, file });
            let response = await handler({ file });
            if (response.headers) {
                Object.keys(response.headers).forEach((key) => {
                    res.setHeader(key, response.headers[key]);
                });
            }
            res.statusCode = 200;
            res.end(response.data);
            logger.log({ type: 'req', code: 200 });
        } catch (err) {
            res.statusCode = 500;
            res.end('errro');
            logger.error({ err });
        }
    };
}
