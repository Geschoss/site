let fs = require('fs');
let { last } = require('../../utils/array.js');

module.exports = {
    makeGame,
};

function makeGame({ env }) {
    return async ({ url }) => {
        const { gameType, gameName, isLoader, fileName } = makeFile(url);
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
    };
}

function makeFile(url) {
    const [type, ...rest] = url.substring(1).split('/');
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
