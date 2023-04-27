/* eslint-disable no-underscore-dangle */
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
import http from 'http';
import https from 'https';
import os from 'os';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface IServerOptions {
  host: string;
  port: number;
  redis: IRedisOptions;
  ssl?: boolean;
}

class Server {
  private webServer!: http.Server | https.Server;
  private server: express.Application;
  private options!: IServerOptions;
  private socketGateway!: SocketGateway;
  private redisGateway!: RedisGateway;

  constructor() {
    this.server = express();
  }

  public async import(options: IServerOptions) {
    this.options = options;
    this.webServer = this.createServer(this.server);
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
      const { port, ssl } = this.options;
      await this.webServer.listen(port);

      console.log('\x1B[34m%s', '---------------------------------------');
      console.log(`✨ Server listening port ${config.port} on ${ssl ? 'HTTPS' : 'HTTP'}`);
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

  private createServer(server: express.Application) {
    try {
      const httpsOptions = {
        key: readFileSync(join(__dirname, '../ssl/', 'localhost-key.pem')),
        cert: readFileSync(join(__dirname, '../ssl/', 'localhost.pem'))
      };

      this.options.ssl = true;
      console.log('\x1B[32m%s\x1B[0m', '✅ Create HTTPS server');
      return https.createServer(httpsOptions, server);
    } catch (e) {
      this.options.ssl = false;
      console.log('\x1b[31m%s\x1B[0m', '❌ Create HTTPS server');
      return http.createServer(server);
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
