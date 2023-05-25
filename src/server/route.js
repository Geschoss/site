let fs = require('fs');
let { last } = require('../utils/array.js');
let { makeStatic } = require('./routes/static.js');
let { makeGame } = require('./routes/game.js');

module.exports = {
    makeRoute,
};

function makeRoute({ logger, env }) {
    return {
        routes: {
            game: makeGame({ env, logger }),
            static: makeStatic({ env }),
            api: async () => {
                return {};
            },
            unknown: () => {
                return {};
            },
        },
        whatType,
    };
}

function whatType(url) {
    const [type] = url.substring(1).split('/');
    if (type === '' || type === 'static') {
        return 'static';
    }
    if (type === 'games') {
        return 'game';
    }
    if (type === 'api') {
        return 'api';
    }
    return 'unknown';
}

function makeFile(url) {
    const [type, ...rest] = url.substring(1).split('/');
    if (type === '' || type === 'static') {
        const [name] = rest;
        return {
            type: 'static',
            name: name ? name : 'index.html',
        };
    }
    if (type === 'games') {
        const [gameType, gameName] = rest;
        if (gameName.includes('loader')) {
            return {
                type: 'game',
                gameType,
                isLoader: true,
            };
        }
        return {
            type: 'game',
            gameName,
            fileName: last(rest),
            gameType,
            isLoader: false,
        };
    }
    if (type === 'api') {
        return { type: 'api' };
    }
    return { type: 'unknown' };
}
