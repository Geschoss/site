function promisify(fn) {
 return new Promise((res, rej) => {
  try {
   res(fn());
  } catch (err) {
   rej(err);
  }
 });
}

function stringify(msg) {
 return promisify(() => JSON.stringify(msg));
}
module.exports = {
 promisify,
 stringify,
};
