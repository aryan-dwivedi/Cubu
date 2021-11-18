import { ResolverMap } from "../../../types/graphql-utils";
import { Vehicle } from "../../../entities/Vehicle";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
    //SELECT DISTINCT make from vehicle;
    Query: {
        searchMake: async (
            _,
        ) => {
            const make = await getConnection()
                .getRepository(Vehicle)
                .createQueryBuilder("vehicle")
                .select("make")
                .distinct(true)
                .getRawMany();

            return make.map(m => m.make);
        }
    }
};
