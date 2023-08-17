/* eslint-disable @typescript-eslint/indent */
import path from 'path';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Listing } from '../entities/Listing';
import { Message } from '../entities/Message';
import { Reviews } from '../entities/Reviews';
import { User } from '../entities/User';
import { Vehicle } from '../entities/Vehicle';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? await createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User, Listing, Message, Reviews, Vehicle],
        migrations: [path.join(__dirname, './migrations/*')],
        name: 'default',
      } as any)
    : await createConnection({ ...connectionOptions, name: 'default' });
};
