let fs = require('fs');

module.exports = {
    makeStatic,
};

function makeStatic({ env }) {
    return async ({ url }) => {
        let name = getName(url);
        const path = `${env.paths.static}/${name}`;
        const data = await fs.promises.readFile(path);

        return {
            code: 200,
            data,
        };
    };
}

function getName(url) {
    const [_, name] = url.substring(1).split('/');
    return name ? name : 'index.html';
}
