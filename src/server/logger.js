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

    let context = {};

    async function prepare_msg(v) {
        const msg = { ts: new Date().toISOString(), ...context, ...v };
        return stringify(msg);
    }

    async function error(v) {
        try {
            let msg = await prepare_msg({ ...context, error: v });
            error_log_file.write(msg + '\n');
        } catch (err) {
            process.stderr.write(`${err}`);
        }
    }

    async function log(v) {
        try {
            let msg = await prepare_msg(v);
            access_log_file.write(msg + '\n');
        } catch (err) {
            error(err);
        }
    }

    function addContext(c) {
        context = c;
    }
    function dropContext() {
        context = {};
    }
    return {
        log,
        error,

        addContext,
        dropContext,
    };
}

module.exports = create_logger;
