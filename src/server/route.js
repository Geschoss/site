let fs = require('fs');
let path = require('path');
let { last } = require('../utils/array.js');

module.exports = {
    makeRoute,
};

function makeRoute({ logger, env }) {
    return {
        routes: {
            api: async () => {
                return {};
            },
            game: async ({ file }) => {
                const { gameType, gameName, isLoader, fileName } = file;
                let file_path;
                if (isLoader) {
                    file_path = `${env.paths.games}/${gameType}/loader.js`;
                    const data = await fs.promises.readFile(file_path);
                    return {
                        code: 200,
                        data,
                        isLoader,
                    };
                }
                file_path = `${env.paths.games}/${gameType}/${gameName}/${fileName}`;
                const data = await fs.promises.readFile(file_path);
                return {
                    code: 200,
                    data,
                    isLoader,
                    headers: {
                        'Content-Type': 'application/wasm',
                    },
                };
            },
            static: async ({ file }) => {
                const path = `${env.paths.static}/${file.name}`;
                const data = await fs.promises.readFile(path);
                return {
                    code: 200,
                    data,
                };
            },
            unknown: () => {
                return {};
            },
        },
        makeFile,
    };
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
