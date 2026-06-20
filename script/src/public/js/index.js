import { Utils } from './utils.js';

const utils = new Utils();

const port = 8001;
const ip = 'localhost';

utils.onMounted(() => {
  utils.websocketListenerStart(ip, port);
});
