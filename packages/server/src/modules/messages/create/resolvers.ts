import { Message } from '../../../entities/Message';
import { ResolverMap } from '../../../types/graphql-utils';
import { NEW_MESSAGE } from '../../shared/constants';

export const resolvers: ResolverMap = {
  Mutation: {
    createMessage: async (_, { message }, { session, pubsub }) => {
      const dbMessage: any = Message.create({
        ...message,
        userId: session.userId
      });

      dbMessage.save();

      void pubsub.publish(NEW_MESSAGE, {
        newMessage: dbMessage
      });

      return true;
    }
  }
};
