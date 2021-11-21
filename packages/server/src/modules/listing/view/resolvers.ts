import { Listing } from '../../../entities/Listing';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    viewListing: async (_, { id }) => {
      return await Listing.findOne({ where: { id } });
    }
  }
};
