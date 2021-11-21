import { getConnection } from 'typeorm';
import { Vehicle } from '../../../entities/Vehicle';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  // SELECT DISTINCT model from vehicle WHERE vehicle.make='make';
  Query: {
    searchModel: async (_, { make }) => {
      const model = await getConnection()
        .getRepository(Vehicle)
        .createQueryBuilder('vehicle')
        .select('model')
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .where(`vehicle.make='${make}'`)
        .distinct(true)
        .getRawMany();

      return model.map(m => m.model);
    }
  }
};
