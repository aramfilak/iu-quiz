import open from 'open';

const SERVER_LOCALHOST = 'http://localhost:4000';
const CLIENT_LOCALHOST = 'http://localhost:3000';

(async function openLocalhostInBrowser() {
  await open(SERVER_LOCALHOST);
  await open(CLIENT_LOCALHOST);
})();
