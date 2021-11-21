import express from 'express';
import * as ExpressSession from 'express-session';
import { PubSub } from 'graphql-subscriptions';
import { Redis } from 'ioredis';
import { userLoader } from '../loaders/UserLoader';

export interface Session extends ExpressSession.Session {
  userId?: string;
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  req: express.Request;
  res: express.Response;
  userLoader: ReturnType<typeof userLoader>;
  pubsub: PubSub;
}

export type Resolver = (parent: any, args: any, context: Context, info: any) => any;

export type GraphQLMiddlewareFunc = (resolver: Resolver, parent: any, args: any, context: Context, info: any) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
