import { Listing } from '../../../entities/Listing';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      const listing = await Listing.findOne({ where: { id } });

      if (!listing) {
        throw new Error('Does not exist');
      }

      if (session.userId !== listing.userId) {
        // log message
        // eslint-disable-next-line no-console
        console.log(`this user ${session.userId ?? ''} is trying to delete a listing they don't own`);
        throw new Error('Not authorized');
      }

      await Listing.remove(listing);

      return true;
    }
  }
};
