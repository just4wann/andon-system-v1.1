import { Server } from './server/index.js';

const server = new Server();

server.setCorsConfig();
server.setSSRWebConfig();
server.serviceOpen();
server.serverStart();
