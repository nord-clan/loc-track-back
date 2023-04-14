import IORedis from 'ioredis';

export interface IRedisOptions {
  port: number;
  host: string;
  username: string;
  password: string;
  db: number;
}

export class RedisGateway {
  private _redis: IORedis;

  constructor(options: IRedisOptions) {
    this._redis = new IORedis(options);
    console.log('\x1b[33m%s\x1b[0m', '💿 Redis connected \n');
    // this.clear();
  }

  get redis() {
    return this._redis;
  }

  async clear() {
    this.redis.flushall();
    console.log(' >< Redis cleared ');
  }
}
