const open = require('open');

const CLIENT_LOCALHOST = 'http://localhost:3000';

setTimeout(() => {
  (async function openLocalhostInBrowser() {
    await open(CLIENT_LOCALHOST);
  })();
}, 3500);
