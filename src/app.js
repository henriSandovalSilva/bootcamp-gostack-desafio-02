import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    // inicia o express
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // seta que o express irá trabalhar com json no body
    this.server.use(express.json());
  }

  routes() {
    // inicia as rotas
    this.server.use(routes);
  }
}

export default new App().server;
