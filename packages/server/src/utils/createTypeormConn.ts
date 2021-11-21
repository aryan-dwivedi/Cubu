/* eslint-disable @typescript-eslint/indent */
import path from 'path';
import { createConnection, getConnectionOptions } from 'typeorm';
import { User } from '../entities/User';
export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? await createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User],
        migrations: [path.join(__dirname, './migrations/*')],
        name: 'default'
      } as any)
    : await createConnection({ ...connectionOptions, name: 'default' });
};
