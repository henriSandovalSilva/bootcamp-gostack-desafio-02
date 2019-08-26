import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.store);

// middleware de autenticação
routes.use(auth);

routes.put('/users', UserController.update);

export default routes;
