import { makeExecutableSchema } from '@graphql-tools/schema';
import * as fs from 'fs';
import * as glob from 'glob';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';

export const genSchema = () => {
  const pathToModules = path.join(__dirname, '../modules');
  const graphqlTypes = glob.sync(`${pathToModules}/**/*.graphql`).map(x => fs.readFileSync(x, { encoding: 'utf8' }));

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const resolvers = glob.sync(`${pathToModules}/**/resolvers.?s`).map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};
