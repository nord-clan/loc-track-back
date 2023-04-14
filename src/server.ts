/* eslint-disable no-underscore-dangle */
import 'reflect-metadata';
import type { Request, Response } from 'express';
import type { IRedisOptions, RedisGateway } from './redis/redis.gateway';
import type { SocketGateway } from './socket/socket.gateway';
import config from './config';
import { print } from './utils/print-route';
import { allowCrossDomain } from './utils/allow-cross-domain';
import { context } from './graphql/context';
import { schema } from './graphql/schema';
import UserController from './restapi/controllers/user.controller';
import NodeController from './restapi/controllers/node.controller';
import LayerController from './restapi/controllers/layer.controller';
import errorMiddleware from './restapi/middleware/error.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createYoga } from 'graphql-yoga';
import os from 'os';
import http from 'http';

export interface IServerOptions {
  host: string;
  port: number;
  redis: IRedisOptions;
}

class Server {
  private webServer: http.Server;
  private server: express.Application;
  private options!: IServerOptions;
  private socketGateway!: SocketGateway;
  private redisGateway!: RedisGateway;

  constructor() {
    const server = express();
    const webServer = http.createServer(server);

    this.webServer = webServer;
    this.server = server;
  }

  public async import(options: IServerOptions) {
    this.options = options;
    // TODO this.redisGateway = new RedisGateway(this.options.redis);
    // TODO this.socketGateway = new SocketGateway(this.webServer);

    this.initializeMiddlewares();
    this.initializeErrorHandling();
    this.initializeControllers();
    this.initializeGraphQl();
    this.initializeStaticFileRoutes();
    this.setUpNodeExceptions();
  }

  public async listen() {
    try {
      const { port } = this.options;
      await this.webServer.listen(port);

      console.log('\x1B[34m%s', '---------------------------------------');
      console.log(`✨ server listening on the port ${config.port}`);
      console.log(`✨ ${os.hostname()}`);
      console.log('\x1B[34m%s', `GraphQL playground /graphql \n`);
      this.server._router.stack.forEach(print.bind(null, []));
      console.log('---------------------------------------');
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  public getWebServer() {
    return this.webServer;
  }

  public getServer() {
    return this.server;
  }

  private initializeMiddlewares() {
    try {
      this.server.use(express.json());
      this.server.use(express.urlencoded({ extended: true }));
      this.server.use(allowCrossDomain);
      this.server.use(cookieParser());
      this.server.use(cors());

      console.log('\x1B[32m%s\x1B[0m', '✅ Middlewares');
    } catch (e) {
      console.log('\x1b[31m%s\x1B[0m', '❌ Middlewares');
    }
  }

  private initializeErrorHandling() {
    try {
      this.server.use(errorMiddleware);

      console.log('\x1B[32m%s\x1B[0m', '✅ ErrorHandling');
    } catch (e) {
      console.log('\x1b[31m%s\x1B[0m', '❌ ErrorHandling');
    }
  }

  private initializeControllers() {
    const controllers = [new UserController(), new NodeController(), new LayerController()];
    try {
      this.server.get('/health', (_: Request, res: Response) => res.send('200'));
      controllers.forEach((controller) => {
        this.server.use('/api/', controller.router);
      });

      console.log('\x1B[32m%s\x1B[0m', '✅ Controllers');
    } catch (e) {
      console.log('\x1b[31m%s\x1B[0m', '❌ Controllers');
    }
  }

  private initializeGraphQl() {
    try {
      const yoga = createYoga({
        context,
        schema
      });
      this.server.use('/graphql', yoga);

      console.log('\x1B[32m%s\x1B[0m', '✅ GraphQl');
    } catch (e) {
      console.log('\x1b[31m%s\x1B[0m', '❌ GraphQl');
    }
  }

  private initializeStaticFileRoutes() {
    try {
      this.server.use(express.static('public'));

      console.log('\x1B[32m%s\x1B[0m', '✅ StaticFileRoutes');
    } catch (e) {
      console.log('\x1b[31m%s\x1B[0m', '❌ StaticFileRoutes');
    }
  }

  private setUpNodeExceptions(): void {
    try {
      //* set up server exceptions
      process.on('uncaughtException', (error: Error) => {
        console.error('uncaughtException', error.stack);
        process.exit(1);
      });

      process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
      });

      console.log('\x1B[32m%s\x1B[0m', '✅ NodeExceptions');
    } catch (e) {
      console.log('\x1b[31m%s\x1B[0m', '❌ NodeExceptions');
    }
  }

  get socket() {
    return this.socketGateway;
  }

  get redis() {
    return this.redisGateway;
  }
}

const server = new Server();

export default server;
