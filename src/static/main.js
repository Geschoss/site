const wasmLoader = 'wasm';
var canvas = document.querySelector('#unity-canvas');
canvas.style.width = '960px';
canvas.style.height = '600px';

fetchGameLoader(wasmLoader);
function fetchGameLoader(loaderName) {
    const path = `/games/${loaderName}/loader.js`;
    const script = document.createElement('script');
    script.src = path;
    script.onload = () => {
        var buildUrl = `/games/${loaderName}/cherry_guy_4000`;
        var config = {
            dataUrl: buildUrl + '/WebGL.data',
            frameworkUrl: buildUrl + '/WebGL.framework.js',
            codeUrl: buildUrl + '/WebGL.wasm',
            streamingAssetsUrl: 'StreamingAssets',
            companyName: 'DefaultCompany',
            productName: '2D',
            productVersion: '1.0',
            showBanner: unityShowBanner,
        };
        createUnityInstance(canvas, config)
            .then((unityInstance) => {
                console.log('succes');
            })
            .catch((message) => {
                alert(message);
            });
    };
    script.onerror = () => {
        console.log('error');
    };
    document.body.appendChild(script);
}

function unityShowBanner(msg, type) {
    if (type == 'error') {
        console.error(msg);
    } else if (type == 'warning') {
        console.warn(msg);
    } else {
        console.log(msg);
    }
}
