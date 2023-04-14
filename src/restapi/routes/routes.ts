import { Router } from 'express';
import UserController from '#/restapi/controllers/user.controller';
import NodeController from '#/restapi/controllers/node.controller';
import LayerController from '#/restapi/controllers/layer.controller';

const { path: userPath, router: userRouter } = new UserController();
const { path: nodePath, router: nodeRouter } = new NodeController();
const { path: layerPath, router: layerRouter } = new LayerController();

const api = Router()
  .use(userPath, userRouter)
  .use(nodePath, nodeRouter)
  .use(layerPath, layerRouter);

export default Router().use('/api', api);
