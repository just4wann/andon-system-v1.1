import net from 'net';
import logger from '../../utils/logger.js';

export class TCPGateway {
  constructor(ws) {
    this.server = net.createServer();
    this.ws = ws;
  }

  listen(port, host) {
    this.server.listen(port, host, () => {
      logger.info(`TCP Server Listen on ${host}:${port}`);
    });

    this.server.on('connection', (socket) => {
      logger.info('Client Connected');
      socket.on('data', this.onData.bind(this));
      socket.on('error', this.onError.bind(this));
      socket.on('close', this.onClose.bind(this));
    });
  }

  onClose() {
    this.ws.sendPayload('closed');
    logger.info('Client Disconnected');
  }

  onError(err) {
    logger.error('Socket Error : ', err);
    this.ws.sendPayload('error');
  }

  onData(buffer) {
    logger.debug(`Data Incoming : ${buffer.toString()}`);
    this.ws.sendPayload(buffer.toString());
  }
}
