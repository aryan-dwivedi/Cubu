import { Message } from '../../../entities/Message';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Message: {
    user: async ({ userId }, _, { userLoader }) => await userLoader.load(userId)
  },
  Query: {
    messages: async (_, { listingId }, { session }) => {
      return await Message.find({
        where: {
          listingId,
          userId: session.userId
        }
      });
    }
  }
};
