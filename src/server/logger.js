let fs = require('fs');
let util = require('util');
let { stringify } = require('../utils/async.js');

let access_name = 'node.access.log';
let error_name = 'node.error.log';

function create_logger({ path }) {
    let access_log_file = fs.createWriteStream(path + access_name, { flags: 'a' });
    let error_log_file = fs.createWriteStream(path + error_name, { flags: 'a' });
    process.stdout.pipe(access_log_file);
    process.stderr.pipe(error_log_file);

    async function prepare_msg(...a) {
        const msg = { ts: new Date().toISOString(), msg: util.format(...a) };
        return stringify(msg);
    }

    async function error(...a) {
        try {
            let msg = await prepare_msg(...a);
            error_log_file.write(msg + '\n');
        } catch (err) {
            process.stderr.write(`${err}`);
        }
    }

    async function log(...a) {
        try {
            let msg = await prepare_msg(...a);
            access_log_file.write(msg + '\n');
        } catch (err) {
            error(err);
        }
    }

    return {
        log,
        error,
    };
}

module.exports = create_logger;
