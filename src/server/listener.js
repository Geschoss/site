let crypto = require('crypto');

module.exports = {
    requestListener,
};

function requestListener({ logger, route }) {
    return async (req, res) => {
        let { url } = req;
        let rid = makeRiD();
        logger.addContext({ url, rid });
        let type = route.whatType(url);
        let handler = route.routes[type];
        try {
            logger.log({ method: req.method });
            let response = await handler({ url });
            if (response.headers) {
                Object.keys(response.headers).forEach((key) => {
                    res.setHeader(key, response.headers[key]);
                });
            }
            res.statusCode = 200;
            res.end(response.data);
            logger.log({ method: 'RESPONSE', code: 200 });
        } catch (err) {
            res.statusCode = 500;
            res.end('error');
            logger.log({ method: 'ERROR', code: 200 });
            logger.error({ url, err, message: err.message });
        } finally {
            logger.dropContext();
        }
    };
}

function makeRiD() {
    return crypto
        .createHash('md5')
        .update(`${new Date().getMilliseconds()}`)
        .digest('hex');
}
