/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { getConnection } from 'typeorm';
import { Vehicle } from '../../../entities/Vehicle';
import { ResolverMap } from '../../../types/graphql-utils';

export const resolvers: ResolverMap = {
  // SELECT DISTINCT year from vehicle WHERE vehicle.make='make' AND vehicle.model='model';
  Query: {
    searchYear: async (_, { make, model }) => {
      const year = await getConnection()
        .getRepository(Vehicle)
        .createQueryBuilder('vehicle')
        .select('year')
        .where(`vehicle.make='${make}'`)
        .andWhere(`vehicle.model='${model}'`)
        .distinct(true)
        .getRawMany();

      return year.map(y => y.year);
    }
  }
};
