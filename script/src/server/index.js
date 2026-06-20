import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { Router } from '../routes/router.js';
import { TCPGateway } from '../services/TCPGateway/index.js';
import { WebsocketGateway } from '../services/WebsocketGateway/index.js';

export class Server {
  constructor() {
    this.app = express();
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);

    this.port = 80;
    this.ip = '127.0.0.1';
    this.router = new Router(this.app);
    this.websocket = new WebsocketGateway(8001, 'localhost');
    this.tcpServer = new TCPGateway(this.websocket);
  }

  serviceOpen() {
    this.websocket.createServer();
    this.tcpServer.listen(5000, '210.210.210.231');
    this.router.setupRouter();
  }

  setCorsConfig() {
    this.app.use(
      cors({
        origin: ['http://andon.local'],
        methods: ['GET'],
      })
    );
  }

  setSSRWebConfig() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(this.__dirname, '../views'));
    this.app.use(express.static(path.join(this.__dirname, '../public')));
  }

  serverStart() {
    this.app.listen(this.port, this.ip, () => {
      console.log(`server listen on ${this.ip}:${this.port}`);
    });
  }
}
