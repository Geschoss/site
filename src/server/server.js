let http = require('http');
let fs = require('fs');

function handler({ logger }) {
    return async (req, res) => {
        logger.log({ method: req.method, url: req.url });
        console.log(JSON.stringify(req.headers));
        let data;
        let filePath = req.url === '/' ? 'static/index.html' : req.url.substring(1);
        try {
            data = await fs.promises.readFile(filePath);
        } catch (err) {
            logger.error({ error: 'File is not found', filePath });
            data = await fs.promises.readFile('static/404.html');
        } finally {
            logger.log({ statusCode: 200, filePath });
            res.statusCode = 200;
            res.end(data);
        }
    };
}
const server = {
    start({ port, logger }) {
        http.createServer(handler({ logger })).listen(port);
    },
};

module.exports = server;
