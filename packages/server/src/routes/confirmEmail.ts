import { Request, Response } from 'express';
import Redis from 'ioredis';
import path from 'path';
import { User } from '../entities/User';

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: !Number.isNaN(process.env.REDIS_PORT as any) ? Number(process.env.REDIS_PORT) : 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    tls: {
      rejectUnauthorized: false
    }
  });
  const userId = await redis.get(id);
  console.log(userId, '------------------userId------------------');
  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(id);
    res.sendFile(path.join(__dirname, '/success.html'));
  } else {
    res.sendFile(path.join(__dirname, '/invalid.html'));
  }
};
