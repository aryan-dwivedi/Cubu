import { LISTING_CACHE_KEY } from '../../../constants';
import { Listing } from '../../../entities/Listing';
import { ResolverMap } from '../../../types/graphql-utils';
import { processUpload } from '../../shared/processUpload';

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input: { picture, ...data } }, { session, redis }) => {
      const pictureUrl = picture ? await processUpload(picture) : null;

      const listing: any = Listing.create({
        ...data,
        pictureUrl,
        userId: session.userId
      });

      await listing.save();

      void redis.lpush(LISTING_CACHE_KEY, JSON.stringify(listing));

      return true;
    }
  }
};
