import * as Redis from 'ioredis';

export const RedisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
};

export const redisClient = new Redis({});
