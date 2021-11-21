import { getConnection } from 'typeorm';
import { LISTING_CACHE_KEY } from '../../../constants';
import { Listing } from '../../../entities/Listing';
import { ResolverMap } from '../../../types/graphql-utils';
import { processUpload } from '../../shared/processUpload';

export const resolvers: ResolverMap = {
  Mutation: {
    updateListing: async (_, { listingId, input: { picture, ...data } }, { redis }) => {
      if (picture) {
        // eslint-disable-next-line no-param-reassign
        data.pictureUrl = await processUpload(picture);
      }
      const {
        raw: [newListing]
      } = await getConnection()
        .createQueryBuilder()
        .update(Listing)
        .set(data)
        .where('id = :id', { id: listingId })
        .returning('*')
        .execute();

      const listings = await redis.lrange(LISTING_CACHE_KEY, 0, -1);
      const idx = listings.findIndex((x: string) => JSON.parse(x).id === listingId);
      await redis.lset(LISTING_CACHE_KEY, idx, JSON.stringify(newListing));

      return true;
    }
  }
};
