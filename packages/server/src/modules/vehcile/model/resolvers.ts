import { ResolverMap } from "../../../types/graphql-utils";
import { Vehicle } from "../../../entities/Vehicle";
import { getConnection } from "typeorm";

export const resolvers: ResolverMap = {
    //SELECT DISTINCT model from vehicle WHERE vehicle.make='make';
    Query: {
        searchModel: async (
            _,
            { make }
        ) => {
            let listingQB = getConnection()
                .getRepository(Vehicle)
                .createQueryBuilder("vehicle")
                .select(`model`)
                .where(`vehicle.make='${make}'`)
                .distinct(true)

            return listingQB
                .getMany();
        }
    }
};
