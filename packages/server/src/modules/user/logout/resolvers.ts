import { ResolverMap } from '../../../types/graphql-utils';
import { removeAllUsersSessions } from '../../../utils/removeAllUsersSessions';

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis, res }) => {
      const userId = session.userId;
      if (userId) {
        void removeAllUsersSessions(userId, redis);
        session.destroy(err => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
          }
        });
        res.clearCookie('qid');
        return true;
      }

      return false;
    }
  }
};
