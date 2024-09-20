import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { rootResolvers } from '../resolvers.js';
import { makeExecutableSchema } from '@graphql-tools/schema';

/**
 * Represents the GraphQL schema for the application.
 */
// export const schema = buildSchema(

const types = loadFilesSync(`.`, { extensions: ['graphql'] });

const typeDefs = mergeTypeDefs(types);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: rootResolvers,
});
