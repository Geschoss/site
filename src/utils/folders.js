const fs = require('fs');
const path = require('path');

function getChildrenFrom(src) {
    return new Promise(function (resovle) {
        fs.readdir(src, (err, files) => {
            let arr = [];
            let count = 0;
            files.forEach((file, i) => {
                count++;
                arr[i] = file;
                if (count === files.length) {
                    resovle(arr);
                }
            });
        });
    });
}

getChildrenFrom(gameResolvedPath).then((arr) => {
    return arr;
});
