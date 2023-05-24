const wasmLoader = 'wasm';
var canvas = document.querySelector('#unity-canvas');
var progressFull = document.querySelector('#unity-progress-bar-full');
var progressEmpty = document.querySelector('#unity-progress-bar-empty');

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
        progressFull.style.display = 'block';
        progressEmpty.style.display = 'block';
        createUnityInstance(canvas, config, (progress) => {
            progressFull.style.width = 200 * progress + 'px';
        })
            .then((unityInstance) => {
                progressFull.style.display = 'none';
                progressEmpty.style.display = 'none';
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
